FROM daocloud.io/ubuntu:16.10

MAINTAINER Jiawen Guan <gjw.jesus@qq.com>

EXPOSE 80

WORKDIR /code

ADD . /code

RUN apt-get update && apt-get install nginx -y

RUN cp conf/default.conf /etc/nginx/conf.d/

CMD service nginx start

