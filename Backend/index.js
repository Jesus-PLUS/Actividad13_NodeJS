const mongodb = require("mongodb");
const app = require('./app');

require("dotenv").config();
const connectionURL = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
const port = process.env.PORT || 3700;

// get MongoClient
const MongoClient = mongodb.MongoClient;

// NOTA: Se cambió el callback por .then() porque 
// el driver v7.1.1 ya no soporta callbacks en el método connect().
MongoClient.connect(connectionURL)
    .then(connectedClient => {
        console.log("Conexión exitosa a la base de datos");
        const db = connectedClient.db(dbName);
        
        app.listen(port, () => {
            console.log("servidor corriendo correctamente en la url: localhost:3700");
        });

        return db.collection("projects").find({}).toArray();
    })
    .then(resultado => {
        console.log("Datos de la colección projects:", resultado);
    })
    .catch(err => {
        console.error("ERROR DE CONEXIÓN:", err);
    });
