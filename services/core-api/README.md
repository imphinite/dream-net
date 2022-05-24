### Quick start

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
