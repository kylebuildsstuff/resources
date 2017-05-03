FROM python:3-onbuild
RUN mkdir /api
WORKDIR /api
ADD requirements.txt /api/
RUN pip install -r requirements.txt
ADD . /api/
