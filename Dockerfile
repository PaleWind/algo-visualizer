FROM node:16.17.0-alpine    
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000

CMD ["npm", "start"]
# COPY . .
# RUN apt-get update && apt-get install -y \
#     software-properties-common \
#     npm
# RUN npm install npm@latest -g && \
#     npm install n -g && \
#     n latest
# RUN npm install
