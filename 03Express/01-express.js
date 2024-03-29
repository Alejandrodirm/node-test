const express = require('express')
const bodyParser  = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

require('dotenv').config();
const port =process.env.PORT ||3005;

//Conexión a base de datos
const mongoose = require('mongoose');
//Variables que tendremos siempre:
//Lo correcto será declararlas EN VARIABLES DE ENTORNO
//para que nadie vea directamente nuestras credenciales
// const user = 'cursonode';
// const password = 'OvkDW21ETe9zLkPt';
// const dbname = 'dbpokemon';

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p95hqay.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`; //URL de conexión, que completaremos luego
//const uri = `mongodb+srv://${user}:${password}@cluster0.p95hqay.mongodb.net/${db}?retryWrites=true&w=majority`; //URL de conexión, que completaremos luego
mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e));

// Motor de plantillas
app.set("views", __dirname + "/views") // Añadir la constante __dirname es una buena práctica para que funcione en todos los entornos globales
app.set("view engine", "ejs")

// Middleware
app.use(express.static(__dirname + "/public")) // Importante

// Llamadas a las rutas
app.use("/", require("./routes/rutas"));
app.use("/pokemon", require("./routes/pokemon"));

// Si no se encuentra el recurso (Error 404) con página personalizada
app.use((req, res) => {
    //res.status(404).sendFile(__dirname + "/public/404.html")
    res.status(404).render("404", {
        titulo: "Error 404",
        descripcion: "Page Not Found"
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})