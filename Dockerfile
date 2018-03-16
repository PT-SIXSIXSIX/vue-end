FROM daocloud.io/nginx

MAINTAINER Jiawen Guan <gjw.jesus@qq.com>

EXPOSE 80

WORKDIR /code

ADD . /code

COPY dist/* /usr/share/nginx/html/

CMD service nginx start

