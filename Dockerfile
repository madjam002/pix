FROM node:6.3.0-slim
MAINTAINER Jamie Greeff <jamie@greeff.me>

RUN apt-get update -y && \
    apt-get install -y libcairo2-dev libjpeg62-turbo-dev libpango1.0-dev libgif-dev build-essential g++

# Install dependencies
RUN mkdir -p /usr/src/app/pix-server; mkdir -p /usr/src/app/pix-web;
WORKDIR /usr/src/app/pix-server
ADD packages/pix-server/package.json /usr/src/app/pix-server/
RUN npm install --production

# Add codebase
ADD packages/pix-server/server.js /usr/src/app/pix-server/
ADD packages/pix-server/worker.js /usr/src/app/pix-server/
ADD packages/pix-server/promisify.js /usr/src/app/pix-server/
ADD packages/pix-server/lib /usr/src/app/pix-server/lib

# Add web assets
ADD packages/pix-web/bundle.js /usr/src/app/pix-web/
ADD packages/pix-web/index.html /usr/src/app/pix-web/

ENTRYPOINT ["node"]
CMD server
