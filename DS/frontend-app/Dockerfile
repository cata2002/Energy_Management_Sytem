FROM node:alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

COPY package.json package-lock.json ./

#RUN #npm install -g @angular/cli

RUN npm install --force

CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
