# Actividad13_NodeJS — REST API with Node.js, Express & MongoDB

A minimal REST API built with Node.js and Express 5, connected to a MongoDB Atlas cluster. Coursework project focused on the fundamentals: Express routing, middleware, and connecting a Node backend to a document database.

## Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (CommonJS) |
| Framework | Express 5 |
| Database | MongoDB Atlas (driver v7) |
| Dev tooling | nodemon |

## Project structure

```
.
├── Backend/
│   ├── app.js          # Express app: middlewares and routes
│   ├── index.js        # Entry point: DB connection + server bootstrap
│   └── package.json
└── README.md
```

`app.js` builds and exports the Express application. `index.js` opens the MongoDB connection and, once it succeeds, starts the HTTP listener — so the server only comes up if the database is reachable.

## Requirements

- Node.js 18 or later
- A MongoDB Atlas cluster (or a local `mongod` instance)

## Setup

```bash
git clone https://github.com/Jesus-PLUS/Actividad13_NodeJS.git
cd Actividad13_NodeJS/Backend
npm install
```

Create a `.env` file in `Backend/`:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?appName=MiCluster
DB_NAME=portafolio
PORT=3700
```

Then run:

```bash
npm start
```

The server listens on `http://localhost:3700`. On a successful boot you should see the connection confirmation followed by the contents of the `projects` collection printed to the console.

## Endpoints

| Method | Path | Response |
|---|---|---|
| `GET` | `/` | `200` — HTML landing page |
| `GET` | `/test` | `200` — `{ "message": "Hola mundo desde mi API de NodeJS" }` |

Quick check:

```bash
curl http://localhost:3700/test
```

## Database

The app connects to the `portafolio` database and reads the `projects` collection at startup. The collection is expected to hold project documents; no schema is enforced at the application layer.

## Implementation notes

- The MongoDB Node driver v7 dropped callback support in `MongoClient.connect()`, so the connection uses promise chaining (`.then()`) instead of the callback style shown in older tutorials.
- Express 5 ships with `express.json()` and `express.urlencoded()` built in, making the separate `body-parser` dependency redundant.

## Roadmap

- [ ] Move the connection string out of source and into environment variables
- [ ] Add a `.gitignore` and remove `node_modules/` from version control
- [ ] Expose the `projects` collection through CRUD routes (`GET`, `POST`, `PUT`, `DELETE`)
- [ ] Pass the `db` handle into the route layer instead of keeping it in the bootstrap file
- [ ] Centralized error handling middleware and consistent error responses
- [ ] Input validation on write operations
- [ ] Dockerize the service with `docker compose` for local development

## Author

**Jesús Elías Ávila Sauza (Chus)** — [github.com/Jesus-PLUS](https://github.com/Jesus-PLUS)