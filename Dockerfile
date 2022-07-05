FROM node:16

ARG SETTINGS

ENV MICROSERVICE=/home/app/microservice/
ENV SETTINGS=${SETTINGS}

RUN mkdir -p $MICROSERVICE

WORKDIR $MICROSERVICE

EXPOSE 5000

COPY package*.json ./


RUN ls
RUN npm install


COPY . .
# RUN rm -rf node_modules/ dist/
RUN npx prisma generate
RUN npm run tsc

CMD [ "node", "/build/src/index.js" ]