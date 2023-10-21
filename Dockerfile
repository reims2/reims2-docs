FROM node:20@sha256:bd20621deff56cb66c6cd10772d26db1a0d480f2b08609eb96b799ba6260f3ed AS build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

ENV NODE_OPTIONS --openssl-legacy-provider

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install --immutable
RUN yarn build

# PROD IMAGE
FROM node:20.8.1-bullseye-slim@sha256:682c1557c5a8cd6f8a78db3bd315ed968b3a854de2a16c2b8ce713cc92152062
RUN apt-get update && apt-get upgrade -y && apt install curl -y && rm -rf /var/lib/apt/lists/*

# renovate: datasource=npm depName=http-server
ENV HTTP_SERVER_VERSION=14.1.1
RUN npm install -g http-server@${HTTP_SERVER_VERSION}

ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 5000

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/src/.vitepress/dist ./dist/docs

EXPOSE 5000

HEALTHCHECK --interval=5s --timeout=10s --retries=2 CMD curl --fail http://localhost:$PORT/docs/ || exit 1   

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["http-server", "dist"]
