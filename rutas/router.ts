//archivo para crear las apis rest

import {Router, Request, Response} from "express";

const ruta = Router();


ruta.get("/mensajes", ( req: Request, res: Response ) => {

    res.json({

        ok:true,
        mensaje: "Todo esta bien!!"
    });


});

ruta.post("/mensajes", ( req: Request, res: Response ) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

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

    res.json({

        ok:true,
        //mensaje: "SERVICIO POST - LISTO"
        cuerpo,
        de,
        id
    });


});

export default ruta;