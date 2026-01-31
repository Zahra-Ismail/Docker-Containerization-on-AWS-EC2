FROM node:18-alpine

WORKDIR /usr/src/app

COPY App/package*.json ./
RUN npm install --omit=dev

COPY App/ ./

EXPOSE 3000
CMD ["npm", "start"]
