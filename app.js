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

router.post('/', authMiddleware, async (req, res) => {
  const state = res.locals.state;
  res.render('list', {
    title: 'Provider list',
    Authorisation: state.getAuthorisation(),
    SharedState: state.toString(),
    ApiUrl: process.env.FLATPEAK_API_URL,
  });
});

router.post('/summary', authMiddleware, async (req, res) => {
  const state = res.locals.state;
  res.render('summary', {
    title: 'Summary',
    Authorisation: state.getAuthorisation(),
    SharedState: state.toString(),
  });
});

router.post('/confirm', authMiddleware, async (req, res) => {
  const state = res.locals.state;

  const flatpeak = new FlatpeakService(
      process.env.FLATPEAK_API_URL,
      state.getPublicKey(),
      (m) => console.log(m),
  );

  const data = state.getData();

  const {
    provider_id,
    tariff_id,
    postal_address,
    product_id,
    customer_id,
    timezone,
    devices,
  } = data;

  const tariffPlan = await flatpeak.tariffs.retrieve(tariff_id);

  const updatedChunk = await flatpeak.saveConnectedTariff({
    macAddress: devices?.length ? devices[0].mac : undefined,
    timezone: timezone,
    productId: product_id,
    customerId: customer_id,
    providerId: provider_id,
    tariffPlan: tariffPlan,
    postalAddress: postal_address,
  });

  state.extend(updatedChunk);

  res.render('success', {
    title: 'success',
    callbackUrl: state.getData().callback_url,
    Authorisation: state.getAuthorisation(),
    PublicState: state.toPublic().toString(),
  });
});
router.post('/cancel', authMiddleware, async (req, res) => {
  const state = res.locals.state;
  res.render('error', {
    title: 'Error',
    error: 'cancel',
    callbackUrl: state.getData().callback_url,
    Authorisation: state.getAuthorisation(),
    PublicState: state.toPublic().toString(),
  });
});

router.post('/receive', authMiddleware, async (req, res) => {
  const state = res.locals.state;
  res.render('success', {
    title: 'success',
    Authorisation: state.getAuthorisation(),
    PublicState: state.toPublic().toString(),
  });
});


router.get('/api/providers', async (req, res) => {
  const {key, ...query} = req.query;
  const flatpeak = new FlatpeakService(process.env.FLATPEAK_API_URL, key, (m) => console.log(m));

  flatpeak.providers
      .list(query)
      .then((result) => res.send(result));
});

router.get('/api/tariff', async (req, res) => {
  const {key, tariffId} = req.query;
  const flatpeak = new FlatpeakService(process.env.FLATPEAK_API_URL, key, (m) => console.log(m));

  flatpeak.tariffs
      .retrieve(tariffId)
      .then((result) => res.send(result));
});
router.get('/api/provider', async (req, res) => {
  const {key, providerId} = req.query;
  const flatpeak = new FlatpeakService(process.env.FLATPEAK_API_URL, key, (m) => console.log(m));

  flatpeak.providers
      .retrieve(providerId)
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
