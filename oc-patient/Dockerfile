FROM node:latest AS image
RUN npm install -g @nestjs/cli

FROM image AS base
WORKDIR /usr/src/app
COPY . .
RUN yarn install

FROM base AS development
CMD [ "yarn", "start:dev", "--preserveWatchOutput" ]