import Server from "./clases/server";
import ruta from "./rutas/router";
import bodyParser from "body-parser";// se utiliza para recibir las peticiones y la serializar
import cors from "cors";

const server = new Server();

//Body Parser (esto basicamente dice todo lo que viene en una petición post se toma y genera un objeto de java script)
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

//Cors ( con esta linea me permite que cualquier persona pueda llamar mis servicios )
server.app.use( cors({ origin: true, credentials: true}) );

//Rutas
server.app.use('/', ruta);


server.start( () => {
        console.log(`Servidor corriendo en el puerto ${ server.port } `)
});