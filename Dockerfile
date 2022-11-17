FROM node:14-alpine as build

RUN apk add yarn

WORKDIR /server/web
COPY ./web/package.json .
RUN yarn

WORKDIR /server/app
COPY ./app/package.json .
RUN yarn

WORKDIR /server
COPY . .

WORKDIR /server/web
RUN yarn run build

WORKDIR /server/app
RUN yarn run build

FROM debian:stable-slim

COPY --from=build /server/app/pkg /app/pkg

EXPOSE 8080

CMD /app/pkg/express-react-typescript-generator









