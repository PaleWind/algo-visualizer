FROM node:16.17.0    
WORKDIR /algo-demos
COPY . .
RUN apt-get update && apt-get install -y \
    software-properties-common \
    npm
RUN npm install npm@latest -g && \
    npm install n -g && \
    n latest
RUN npm install
CMD ["node". "src/index.js"]