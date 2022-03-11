import { SERVER_PORT } from '../global/environment';
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import * as miSocket from '../sockets/socket';


// permite exportar la clase
// default permite exportar el paquete completo al exportar la clase cuando se importe
export default class Server {

    //instance es una propiedad statica de servidor para poderla utilizar
    private static _instance: Server;

    public app: express.Application;
    public port: number;
    
    
    // propiedad encargada de emitir y escuchar eventos
    public io: socketIO.Server;
    private httpServer: http.Server; // este se va a levantar en vez de app, encargado de los eventos



    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        //this.io = socketIO( this.httpServer );
        //this.io = require("socket.io")(this.httpServer);
        this.io = new socketIO.Server(this.httpServer, {
			cors: {
				origin: true,
				credentials: true
			}
		});

        this.escucharSockets();

    }

    public static get instance(){

        return this._instance || ( this._instance = new this() );

    }

    //es privado para la inicialización de la clase
    private escucharSockets(){

        console.log("Escuchando Sockets-Conexiones");

        this.io.on("connection", cliente => {

            console.log("Cliente nuevo conectado");

            //Mensajes
            miSocket.mensaje( cliente, this.io );


           //Desconección
           miSocket.desconectar( cliente );

        });

    }

    start( callback: VoidFunction ) {

        this.httpServer.listen( this.port, callback );
    }

}