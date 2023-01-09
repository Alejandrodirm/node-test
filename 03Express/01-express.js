const express = require('express')
const app = express()
const port = 3005
//motor de plantilla
app.set('view engine','ejs');
app.set('views', __dirname+'/views');
//middleware
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.render("index",{titulo:"mi titulo dinamico"})
})
//peticiones basicas
app.get('/contacto', (req, res) => {
    res.render('contacto',{tituloContacto:"es mi contacto dinamico"});
})
app.use((req,res) => {
    res.status(404).render("404",{
        titulo:"error 404",
        descripcion:"Page Not Found"

    })
 })
app.use(express.static(__dirname + '/public'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})