FROM node:14-alpine

LABEL name=oc-patient

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3001

CMD [ "yarn", "start:dev" ]