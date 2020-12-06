FROM node:14-alpine as builder

WORKDIR /app

COPY ./package.json ./

RUN yarn --production --silent

COPY . .

COPY ./.env ./.env

RUN yarn build

FROM node:14-alpine
# set working directory
WORKDIR /app

# ENV PATH ./node_modules/.bin:$PATH
# install app dependencies
RUN yarn add express dotenv http-proxy-middleware compression faker http-status-codes --silent
RUN yarn global add pm2
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/mock ./mock
COPY --from=builder /app/server ./server
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/processes.json ./


EXPOSE 8000
CMD ["pm2", "start", "processes.json", "--silent", "--no-daemon"]
