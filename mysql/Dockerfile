FROM mysql/mysql-server:latest
ENV MYSQL_DATABASE csc468
COPY cattle.csv /
COPY ./table.sql /docker-entrypoint-initdb.d/
