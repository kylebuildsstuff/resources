# Dockerfile based on the latest CentOS 7 image - non-privileged user entry
FROM centos:latest
MAINTAINER ktruong@gmail.com

RUN useradd -ms /bin/bash user

RUN echo "EXPORT 192.168.0.0/24" >> /etc/exports.list

RUN yum update -y
RUN yum install -y net-tools wget

RUN cd ~ && wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u60-b27/jre-8u60-linux-x64.rpm"

RUN yum localinstall -y ~/jre-8u60-linux-x64.rpm

USER user

RUN cd ~ && echo "export JAVA_HOME=/usr/java/jdk1.8.0/jre" >> /home/user/.bashrc

ENV JAVA_BIN /usr/java/jdk1.8.0/jre/bin
