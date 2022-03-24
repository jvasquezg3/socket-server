import { UsuariosLista } from './../clases/usuarios-lista';
import socketIO  from 'socket.io';
// se encontrará toda la logica del servicio o escucha de los eventos de los sockets

import { Socket } from 'socket.io';
import { Usuario } from '../clases/usuario';


export const usuariosConectados = new UsuariosLista();


export const conectarCliente = ( cliente: Socket, io: socketIO.Server ) => {

    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );


}




export const desconectar = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('disconnect', () => {
        console.log("Cliente Desconectado");
        usuariosConectados.borrarUsuario( cliente.id );

        io.emit('usuarios-activos', usuariosConectados.getLista() );
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

        io.emit('usuarios-activos', usuariosConectados.getLista() );

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });


    });
}

//Obtener Usuarios 
export const obtenerUsuarios = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on( 'obtener-usuarios', () => {

        // este envia la información a todo el grupo
        //io.emit('usuarios-activos', usuariosConectados.getLista() );

        //este manda la información únicamente a la persona que se esta conectando 
        io.to( cliente.id ).emit('usuarios-activos', usuariosConectados.getLista() );

    });
}