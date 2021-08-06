FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --quiet

COPY . .

CMD echo "To start an oracle run:" \
  "URL_TO_QUERY=<url> ATTRIBUTE_TO_FETCH=<attribute> docker-compose up -d --build"