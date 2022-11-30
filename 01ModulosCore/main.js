var reloj = require("./reloj");

var miReloj = new reloj();

miReloj.on("tictac", ()=>{
    miReloj.theTime();
});