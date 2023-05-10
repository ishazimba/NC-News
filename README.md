# Northcoders News API

## Background

This project is about building an API for the purpose of accessing application data programmatically. The purpose of the project is to building of a real world backend service (such as reddit) which should provide this information to the front end architecture.
The /api endpoint acts as documentation, providing information about the available endpoints and how they should be interacted with.

The database will be PSQL, and we can interact with it using [node-postgres](https://node-postgres.com/).

## To get access

1. Clone this repository.
2. Install the dependencies: npm install
3. Set up the database connection. Setup PostgreSQL database and run it.
4. Seed the database

## Env set up

To successfully connect to the databases locally, you need to create .env.test and .env.developer file . In .env.test file add 'PGDATABASE=nc_news_test' and in .env.development file add PGDATABASE=nc_news.

In your .gitignore file add ".env.development" and ".env.test".

## Available Endpoints

GET /api

GET /api/topics

GET /api/articles
