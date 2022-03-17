FROM khromov/alpine-nginx-php8:latest

USER root
# for laravel lumen run smoothly
RUN apk --no-cache add \
php8 \
php8-fpm \
php8-pdo \
php8-mbstring \
php8-openssl

# # for our code run smoothly
# RUN apk --no-chace add \
# php8-json \
# php8-dom \
# curl \
# php8-curl

# # for swagger run smoothly
# RUN apk --no-cache add \
# php8-tokenizer

# # for composer & our project depency run smoothly
# RUN apk --no-cache add \
# php8-phar \
# php8-xml \
# php8-xmlwriter

COPY ./default.conf /etc/nginx/http.d

WORKDIR /var/www/core-api
