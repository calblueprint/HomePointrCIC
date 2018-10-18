FROM ethanlee/whales
WORKDIR /app
ENV GEM_PATH=/gems
ENV BUNDLE_PATH=/gems
ENV GEM_HOME=/gems
RUN bundle install
COPY . .
CMD ["bundle", "exec", "rails", "server"]
