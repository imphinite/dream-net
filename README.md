# DreamNet

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/imphinite/dream-net)

##### Find Your Soulmate. Uncover the veil. Sail your dream.

-   DreamNet matches you with your soulmate if someone else shares the same dream life with you. It does not matter if the life in your dream is distant in the past or far in the future. You're destinied to be together, just because you're soulmates.
-   Track your dreams, and share them with others.
-   Regain the ability to control your dream. You control where you want to be in your dream.

Do you want to collaborate on this project? Here's how!

### Technical Overview

##### Technologies

-   Vue 3
-   Wepack 5
-   Laravel 9
-   PostgresQL
-   Docker
-   Tensorflow
-   Python 3

##### Directory Structure

There are a few subprojects under this repository. The main subproject is the user-facing mobile app written in Javascript. Other subprojects are services including an API server written in PHP, a Machine Learning service in Python and a Data Curation service written in Python as well. The folder structure setup in this repository allows many more microservices and applications to be added as needed in the future. You can find the README file for each of the subprojects in their corresponding root directories.

-   .circleci/ - contains Github workflow configurations
-   .docker/ - contains docker container configurations
-   app/ - DreamNet mobile App
-   services/ - contains API and other microservices

### How to Setup Development Environment

##### Dev Dependencies

-   [Docker](https://docs.docker.com/get-docker/)

```sh
git clone git@github.com:imphinite/dream-net.git && cd dream-net/
```

```sh
yarn install
```

##### DreamNet App Setup

[DreamNet App README](https://github.com/imphinite/dream-net/tree/main/app)

##### Core API Setup

[Core API README](https://github.com/imphinite/dream-net/tree/main/services/core-api)

```sh
cd services/core-api/
```

```
cp .env.example .env
```

```sh
yarn docker:up
```
