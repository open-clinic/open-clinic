FROM node:14-alpine

LABEL name=oc-gateway

WORKDIR /app

COPY package*.json ./

RUN yarn install

VOLUME [ "/app" ]

CMD ["yarn", "start:dev"]