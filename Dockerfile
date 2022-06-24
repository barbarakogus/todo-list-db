FROM node:16.11.0-alpine as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
COPY ./package-lock.json /app/
RUN npm install

COPY . /app

RUN npm run build

# ---
FROM fholzer/nginx-brotli:v1.12.2
 
WORKDIR /etc/nginx
ADD docker/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]