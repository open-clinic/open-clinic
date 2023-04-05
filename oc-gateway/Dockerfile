FROM node:14-alpine

LABEL name=oc-gateway

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "start:dev" ]