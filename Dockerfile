# Do the npm install or yarn install in the full image
FROM node:10.13-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn install --pure-lockfile --ignore-engines --network-timeout 100000
ENV NODE_ENV=production
RUN yarn build
RUN rm -rf node_modules/tachyons node_modules/webpack-dev-middleware node_modules/webpack-hot-middleware
RUN yarn pkg

# And then copy pkg binary from that stage to the smaller base image
FROM alpine:3.9
RUN apk update && \
  apk add --no-cache libstdc++ libgcc ca-certificates && \
  rm -rf /var/cache/apk/*
WORKDIR /app
COPY --from=builder /app/pkg .
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ./shrink-link
