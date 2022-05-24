# DreamNet

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/imphinite/dream-net)

##### Find Your Soulmate. Uncover the veil. Sail your dream.

-   DreamNet matches you with your soulmate if they share the same dream life with you. It does not matter if the life in your dream is distant in the past or far in the future. You're destinied to be together, just because you're soulmates.
-   Track your dreams, and share them with others.
-   Regain the ability to control your dream. You control where you want to be in your dream.
-   Sleep on your problems and see how your dreams can solve them.

Do you want to collaborate on this project? Here's how.

### Technical Overview

##### Technologies

-   [Vue 3](https://vuejs.org/) - Progressive JavaScript Framework
-   [Webpack 5](https://webpack.js.org/) - JavaScript Bundler
-   [Storybook](https://storybook.js.org/) - UI Component Managager
-   [Laravel 9](https://laravel.com/docs/9.x/installation) - Progressive PHP Framework
-   [PostgreSQL](https://www.postgresql.org/) - Advanced Open Source Relational Database
-   [Docker](https://docs.docker.com/get-docker/) - VM Manager
-   [TensorFlow](https://www.tensorflow.org/) - End-to-end Open Source Machine Learning Platform
-   [Python 3](https://www.python.org/) - Powerful Programming Language

##### Directory Structure

There are a few subprojects under this repository. The main subproject is the user-facing mobile app written in JavaScript. Other subprojects are services including an API server written in PHP, a Machine Learning service in Python and a Data Curation service written in Python as well. The folder structure setup in this repository allows many more microservices and applications to be added as needed in the future. You can find the README file for each of the subprojects in their corresponding root directories.

-   [.circleci/](https://github.com/imphinite/dream-net/tree/main/.circleci) - contains Github workflow configurations
-   [.docker/](https://github.com/imphinite/dream-net/tree/main/.docker) - contains docker container configurations
-   [app/](https://github.com/imphinite/dream-net/tree/main/app) - DreamNet mobile App
-   [services/](https://github.com/imphinite/dream-net/tree/main/services) - contains API and other microservices

### How to Set Up Development Environment

##### Global Dev Dependencies

-   [Docker](https://docs.docker.com/get-docker/) - VM Manager
-   [Yarn](https://www.npmjs.com/package/yarn) - Dependency manager for JavaScript
-   [Composer](https://getcomposer.org/) - Dependency manager for PHP

1. Clone to your local

```sh
git clone git@github.com:imphinite/dream-net.git && cd dream-net/
```

2. Install dependencies for the monorepository

```sh
yarn install
```

##### Set Up Dev Environment for DreamNet App

The main DreamNet App is located under the `./app/` directory. It is based on the Vue 3 framework.
Technologies used include Webpack 5, PWA, Storybook, Tailwind, etc. For more information, please see [DreamNet App README](https://github.com/imphinite/dream-net/tree/main/app).

###### Quick start

1. Install dependencies

```sh
cd ./app/ && yarn install
```

2. Initialize environment variables

```sh
cp .env.example .env
```

Before you can use the OAuth Authentication services provided by [Laravel/Passport](https://laravel.com/docs/9.x/passport#installation) in this app, you must generate `client_id` and `client_secret` first by running `php artisan passport:install` in the core-api subproject. Once you have both `client_id` and `client_secret`, copy and paste them to the `OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET` fields respectively in your `app/.env` file.

3. Serve Storybook

```sh
yarn storybook
```

4. Serve local dev server

```sh
yarn dev
```

##### Set Up Dev Environment for Core API

Core API as the name suggests provides API endpoints for CRUD operations on the app's database.The source coded is located under `./services/core-api/` directory. It is written based on Laravel 9 framework. For more information, please see [Core API README](https://github.com/imphinite/dream-net/tree/main/services/core-api).

###### Quick start

1. Run docker containers if you haven't yet

```sh
yarn docker:up
```

2. Go to core-api/ directory

```sh
cd services/core-api/ && composer install
```

3. Initialize environment variables

```
cp .env.example .env
```

4. Install dependencies

```sh
composer install
```

5. Run database migrations - This will create all the required database tables seeded with sample data

```sh
php artisan migrate:fresh --seed
```

6. Generate passport client_id and secret for your local server. With the generated client_id and client_secret, copy and paste the values to the `OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET` fields respectively in your `<root>/app/.env` file.

```sh
php artisan passport:install
```

#### You're now all set! Make something amazing!
