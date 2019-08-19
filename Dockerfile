FROM node:8.11.1

WORKDIR "/react-ssr"

COPY package.json .
RUN npm install
COPY . .

