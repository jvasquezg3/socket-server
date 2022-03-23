import { UsuariosLista } from './../clases/usuarios-lista';
import socketIO  from 'socket.io';
// se encontrará toda la logica del servicio o escucha de los eventos de los sockets

import { Socket } from 'socket.io';
import { Usuario } from '../clases/usuario';


export const usuariosConectados = new UsuariosLista();


export const conectarCliente = ( cliente: Socket ) => {

    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );

}




export const desconectar = ( cliente: Socket ) => {

    cliente.on('disconnect', () => {
        console.log("Cliente Desconectado");
        usuariosConectados.borrarUsuario( cliente.id );
    });

}


//Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on( 'mensaje', ( payload: { de: string, cuerpo: string } ) => {

        console.log( 'Mensaje Recibido', payload );

        io.emit( 'mensaje-nuevo', payload );

    });
}

//Configurar Usuario 
export const configurarUsuario = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on( 'configurar-usuario', ( payload: { nombre: string }, callback: Function ) => {

        console.log( 'Configurando Usuario', payload.nombre );

        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });


    });
}