FROM node:lts-alpine

EXPOSE 5150

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm install

CMD ["npm", "start"]