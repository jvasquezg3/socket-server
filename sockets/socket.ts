import socketIO  from 'socket.io';
// se encontrará toda la logica del servicio o escucha de los eventos de los sockets

import { Socket } from 'socket.io';




export const desconectar = ( cliente: Socket ) => {

    cliente.on('disconnect', () => {
        console.log("Cliente Desconectado");
    });

}


//Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on( 'mensaje', ( payload: { de: string, cuerpo: string } ) => {

        console.log( 'Mensaje Recibido', payload );

        io.emit( 'mensaje-nuevo', payload );

    });
}