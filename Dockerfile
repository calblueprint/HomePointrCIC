FROM ethanlee/whales
WORKDIR /app
COPY . .
CMD ["bundle", "exec", "rails", "server"]
