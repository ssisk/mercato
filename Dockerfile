FROM node:lts-alpine3.14@sha256:60ef0bed1dc2ec835cfe3c4226d074fdfaba571fd619c280474cc04e93f0ec5b 

# we use dumb-init so node will respond to SIGTERM
RUN apk add dumb-init
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY ./dist ./dist

CMD ["dumb-init", "node", "./dist/index.js"]