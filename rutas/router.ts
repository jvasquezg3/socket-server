import { usuariosConectados } from './../sockets/socket';
import { Socket } from 'socket.io';
//archivo para crear las apis rest

import {Router, Request, Response} from "express";
import Server from "../clases/server";

const ruta = Router();


ruta.get("/mensajes", ( req: Request, res: Response ) => {

    res.json({

        ok:true,
        mensaje: "Todo esta bien!!"
    });


});

ruta.post("/mensajes/", ( req: Request, res: Response ) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    server.io.emit( 'mensaje-nuevo', payload );
 

    res.json({

        ok:true,
        //mensaje: "SERVICIO POST - LISTO"
        cuerpo,
        de
    });


});

ruta.post("/mensajes/:id", ( req: Request, res: Response ) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    server.io.in( id ).emit( 'mensaje-privado', payload );

    res.json({

        ok:true,
        //mensaje: "SERVICIO POST - LISTO"
        cuerpo,
        de,
        id
    });


});


// Servicio para obtener todos los Id's dse los usuaios
ruta.get('/usuarios', (req: Request, res: Response) => {
    const server = Server.instance;
    server.io .allSockets().then( (clientes) => {
            res.json({
                ok: true,
                clientes : Array.from(clientes)
        });    
    })
    .catch( err =>{
        res.json({
            ok: false,
            err,
        });
    })
});

//Obtener usuarios y sus nombres 
ruta.get('/usuarios/detalle', ( req: Request, res: Response ) => {

    usuariosConectados
    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });

});


export default ruta;