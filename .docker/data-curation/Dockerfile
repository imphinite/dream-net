# syntax=docker/dockerfile:1
FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /data-curation
COPY requirements.txt /data-curation/
RUN pip install -r requirements.txt
COPY . /data-curation/
