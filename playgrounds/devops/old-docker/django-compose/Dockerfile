FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/

# Confirmed Docker Compose Up works with Django and editing shared files real time
# with Docker for Mac
# no manual -v flag required.
