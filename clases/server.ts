import { SERVER_PORT } from '../global/environment';
import express from 'express';

// permite exportar la clase
// default permite exportar el paquete completo al exportar la clase cuando se importe
export default class Servidor {

    public app: express.Application;
    public port: number;



    constructor() {

        this.app = express();
        this.port = SERVER_PORT;

    }

    start( callback: VoidFunction ) {

        this.app.listen( this.port, callback );
    }

}