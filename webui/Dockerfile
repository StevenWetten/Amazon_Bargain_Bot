FROM node:10-alpine
RUN npm install mysql
RUN npm install express
RUN npm install body-parser
COPY files/ /files/
COPY script.js /
CMD ["node", "/script.js"]
EXPOSE 80
