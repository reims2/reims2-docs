FROM node:20@sha256:844b41cf784f66d7920fd673f7af54ca7b81e289985edc6cd864e7d05e0d133c AS build

WORKDIR /usr/src/app
COPY .yarn/ .yarn/
COPY src/ src/
COPY .yarnrc.yml package.json yarn.lock ./
# For last modified time in vitepress
COPY .git/ .git/

RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install --immutable

RUN yarn build

# PROD IMAGE
FROM caddy:2.7.6-alpine@sha256:95ce04978787e23e35143d23b8af2fbb6d6de55213b54a2e9ed2dbf8ffe7313c

COPY LICENSE LICENSE
COPY ./Caddyfile /etc/caddy/Caddyfile
COPY --from=build /usr/src/app/src/.vitepress/dist /usr/share/caddy/docs

EXPOSE 5000

HEALTHCHECK --interval=5s --timeout=5s --retries=3 --start-period=15s CMD wget -nv -t1 --spider 'http://localhost:5000/docs/' || exit 1
