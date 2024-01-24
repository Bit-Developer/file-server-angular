#FROM nginx:1.19.8-alpine

#COPY ./nginx.conf /etc/nginx/conf.d/default.conf
#COPY ./dist/ /usr/share/nginx/html/

# Usage:
#
#    Build image:
#    docker build -t file-server-angular .
#
#    Run image (on localhost:32020):
#    docker run -d --name file-server-angular -p 32020:80 file-server-angular
#
#    Run image as virtual host (read more: https://github.com/nginx-proxy/nginx-proxy):
#    docker run -e VIRTUAL_HOST=file-server-angular --name file-server-angular file-server-angular
#
# Stage 1, based on Node.js, to build and compile Angular

FROM node:14.17.0-alpine as builder

WORKDIR /ng-app

COPY package*.json tsconfig*.json angular.json ./
COPY ./src ./src

RUN npm ci --quiet && npm run build-vdi --verbose

# Stage 2, based on Nginx, to have only the compiled app, ready for production with Nginx

FROM nginx:1.19.8-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html