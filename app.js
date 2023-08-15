const path = require('path');
require('dotenv').config({path: path.join(__dirname, '.env')});
const createError = require('http-errors');
const express = require('express');
const requestLogger = require('morgan');
const {create} = require('express-handlebars');
const bodyParser = require('body-parser');
const {errorHandler, respondWithError} = require('@flat-peak/express-integration-sdk');
const {Router} = require('express');
const {SharedState, decodeState} = require('@flat-peak/express-integration-sdk');
const {v4: uuidv4} = require('uuid');

const frontendEntryScript = require('./frontend/build/asset-manifest.json').files['main.js'];
const Handlebars = require('handlebars');
const {FlatpeakService} = require('@flat-peak/javascript-sdk');
Handlebars.registerHelper('frontendEntryScript', () => {
  return frontendEntryScript;
});

const app = express();

// view engine setup
const views = path.join(__dirname, 'views');
app.set('views', views);

const hbs = create({
  extname: '.hbs',
  partialsDir: [path.join(views, 'layouts'), path.join(views, 'partials')],
  defaultLayout: 'base',
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(requestLogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'frontend/build')));

const router = Router();
const authMiddleware = (req, res, next) => {
  const authorization = req.body.auth || req.query.auth;
  const inputState = req.body.state || req.query.state;
  if (!authorization) {
    res.status(403);
    return respondWithError(req, res, 'Missing authorization');
  }

  if (!inputState) {
    res.status(400);
    return respondWithError(req, res, 'Missing state');
  }

  let rawStateInput = {};
  try {
    rawStateInput = decodeState(inputState);
  } catch (e) {
    console.log(e instanceof Error ? e.message : 'Unknown error');
    res.status(400);
    return respondWithError(req, res, 'Failed to parse shared state');
  }
  const state = new SharedState(rawStateInput, authorization, uuidv4());
  res.locals.state = state;
  next();
};

router.get('/', (req, res) => {
  return respondWithError(
      req,
      res,
      'Missing state. Use a POST request with state and auth params.',
  );
});

router.post('/', authMiddleware, async (req, res) => {
  const state = res.locals.state;
  res.render('list', {
    title: 'Provider list',
    Authorisation: state.getAuthorisation(),
    SharedState: state.toString(),
    ApiUrl: process.env.FLATPEAK_API_URL,
  });
});


router.get('/api/providers', async (req, res) => {
  const {key, ...query} = req.query;
  const flatpeak = new FlatpeakService(process.env.FLATPEAK_API_URL, key, (m) => console.log(m));

  flatpeak.providers
      .list(query)
      .then((result) => res.send(result));
});

app.use(router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;
