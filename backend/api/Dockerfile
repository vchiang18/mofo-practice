FROM node:18-slim

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 5000 for node, and 9229 and 9230 (tests) for debug
ARG PORT=5000
ENV PORT $PORT
EXPOSE $PORT 9229 9230

RUN npm i npm@8.19.4 -g
RUN npm i pnpm@8.6.12 -g

RUN mkdir /opt/node_app && chown node:node /opt/node_app
WORKDIR /opt/node_app

USER node
COPY --chown=node:node package.json package-lock.json* ./
RUN pnpm install --no-optional
ENV PATH /opt/node_app/node_modules/.bin:$PATH

HEALTHCHECK --interval=30s CMD node healthcheck.js

# copy in our source code last, as it changes the most
# copy in as node user, so permissions match what we need
WORKDIR /opt/node_app/app
COPY --chown=node:node dist .

## need to include package.json as well
COPY --chown=node:node package.json .

COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]


# if you want to use npm start instead, then use `docker run --init in production`
# so that signals are passed properly. Note the code in index.js is needed to catch Docker signals
# using node here is still more graceful stopping then npm with --init afaik
# I still can't come up with a good production way to run with npm and graceful shutdown
CMD [ "node", "main.js" ]
