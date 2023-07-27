FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install \ 
    && npm install -g nodemon \
    && npm install --platform=linuxmusl --arch=x64 sharp

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
