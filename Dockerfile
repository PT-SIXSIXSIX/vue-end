FROM daocloud.io/ubuntu:16.04

MAINTAINER Jiawen Guan <gjw.jesus@qq.com>

EXPOSE 80

WORKDIR /code

ADD . /code

RUN apt update && apt install nginx -y

RUN cp -r dist/* /usr/share/nginx/html/

CMD service nginx start && nginx -g "daemon off;"

