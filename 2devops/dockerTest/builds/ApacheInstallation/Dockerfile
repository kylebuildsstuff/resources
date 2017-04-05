# This image is based on CentOS 7 and will start apache service in each container
FROM centos:latest
MAINTAINER ktruong@gmail.com

RUN yum update -y
RUN yum install -y httpd net-tools

RUN echo "This is a custom index file build during the image creation" > /var/www/html/index.html

EXPOSE 80

ENTRYPOINT apachectl "-DFOREGROUND"
