FROM daocloud.io/nginx

MAINTAINER Jiawen Guan <gjw.jesus@qq.com>

EXPOSE 80

WORKDIR /code

ADD . /code

RUN cp -r dist/* /usr/share/nginx/html/

CMD service nginx start && nginx -g "daemon off;"

