## DreamNet App

### Quick start

1. Install dependencies

```sh
yarn install
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

### Build

```
yarn build && serve dist/ -p 4000
```

If you want to preview PWA,

```
yarn prod:preview
```
