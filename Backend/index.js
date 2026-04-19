const mongodb = require("mongodb");
const app = require('./app');
const port = 3700;

const connectionURL = "mongodb+srv://aangulo_db_user:M1clu5t3r-@micluster.zhahwyq.mongodb.net/?appName=MiCluster";
const dbName = "portafolio";

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
