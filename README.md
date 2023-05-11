# NORTHCODERS NEWS

## Env set up

To successfully connect to the databases locally, you need to create .env.test and .env.developer file .
In .env.test file add 'PGDATABASE=nc_news_test' and in .env.development file add 'PGDATABASE=nc_news'.

In your .gitignore file add ".env.development" and ".env.test".

## Available Endpoints

1. GET /api

2. GET /api/topics

3. GET /api/articles
