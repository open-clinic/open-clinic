FROM node:latest AS development

LABEL name=oc-gateway

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

CMD [ "yarn", "start:dev" ]