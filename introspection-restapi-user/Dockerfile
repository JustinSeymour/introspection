FROM node:12
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm ci 
# Bundle app source
COPY . .
# RUN npm start & sleep 10 && npm test

EXPOSE 8080
CMD [ "npm", "run", "start" ]