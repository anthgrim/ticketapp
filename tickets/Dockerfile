FROM node:lts-alpine

WORKDIR /app
COPY package.json /app/
RUN npm install --omit=dev
COPY . /app/

CMD ["npm", "start"]