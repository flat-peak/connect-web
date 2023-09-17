FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
ARG NPM_TOKEN
COPY --chown=node:node [".npmrc", "package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
COPY --chown=node:node ["frontend/package.json", "frontend/package-lock.json*", "./frontend/"]
RUN npm install --production --silent --legacy-peer-deps \
    && rm -f .npmrc  \
    && mv node_modules ../ \
    && mkdir -p /usr/src/app/frontend/node_modules/.cache  \
    && chmod -R 777 /usr/src/app/frontend/node_modules/.cache
COPY --chown=node:node . .
RUN cd frontend && npm i react-scripts  --production --silent --legacy-peer-deps  && npm run build && rm -rf node_modules && cd ..
EXPOSE 8080
USER node
CMD ["npm", "start"]
