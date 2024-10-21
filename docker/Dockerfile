FROM node:19.7.0-alpine3.17

ARG BUILD_ENV
ENV BUILD_ENV=$BUILD_ENV

ARG CI_COMMIT_BRANCH
ENV CI_COMMIT_BRANCH=$CI_COMMIT_BRANCH

COPY ./ /app
RUN rm -rf /app/build

RUN sh /app/docker/build.sh

WORKDIR /app

CMD sh /app/docker/start.sh
