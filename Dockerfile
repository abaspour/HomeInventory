FROM node:20-alpine

ENV MONGO_INITDB_ROOT_USERNAME=admin \
    MONGO_INITDB_ROOT_PASSWORD=password

RUN mkdir -p /nodejs_pic
COPY ./backend/nodejs_pic/. /nodejs_pic
RUN mkdir -p /home/app
COPY ./backend/. /home/app
CMD ["node","/home/app/server.js"]