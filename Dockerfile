FROM mhart/alpine-node:8 as node
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

FROM ruby:2.5.1-alpine3.7
COPY --from=node /usr/bin/node /usr/bin/
COPY --from=node /usr/lib/libgcc* /usr/lib/libstdc* /usr/lib/
WORKDIR /app
COPY --from=node /app .

RUN bundle config --global frozen 1
COPY Gemfile Gemfile.lock ./
RUN apk add --no-cache \
  build-base \
  libxml2-dev \
  libxslt-dev \
  postgresql-dev \
  tzdata \
  busybox-extras \
  bash \
  postgresql-client \
  curl

RUN bundle install
COPY . .

CMD ["./bin/webpack-dev-server"]
