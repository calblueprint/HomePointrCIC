FROM ethanlee/whales
WORKDIR /app
ENV GEM_PATH=/gems
ENV BUNDLE_PATH=/gems
ENV GEM_HOME=/gems
COPY . .
RUN bundle install
RUN yarn install
CMD ["bundle", "exec", "rails", "server"]