# NC News API

Welcome to the News API, a RESTful API that interacts with a news database containing articles, topics, users, and comments. Built with Express and PostgreSQL, the API offers endpoints for retrieving and modifying data from the database.

Link to live version: [Live Demo] (https://nc-news-7v3f.onrender.com/)

## Getting Started
Follow the instructions below to clone, install dependencies, seed the local database, and run tests.

### Prerequisites

Make sure you have following installed:
* Node.js(v19 or hiugher)
* PostgreSQL (v14 or higher)

1. Cone the repository:
    https://github.com/ishazimba/NC-News.git
2. Install dependencies:
    npm install
   
3. Create the two .env files:
   * Create a .env.development file and add the following:
   PGDATABASE=nc_news
   * Create a.env.development file and add the following:
   PGDATABASE=nc_news_test
   
4. Setup the local database:
  npm run setup-dbs
5. Seed the local database:
   npm run seed
6. Start the server:
   npm start

### Running Tests
Run the following command:
  npm test


## Available Endpoints

1. GET /api

2. GET /api/topics

3. GET /api/articles
