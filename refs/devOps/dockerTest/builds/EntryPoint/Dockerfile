# Dockerfile based on the latest CentOS 7 image - non-privileged user entry
FROM centos:latest
MAINTAINER ktruong@gmail.com

RUN useradd -ms /bin/bash user

ENTRYPOINT echo "This command will display this message on EVEVERY container that is run from it"

USER user
