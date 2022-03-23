

export class Usuario {

    //todos los usuarios o clientes conectados tienen un id 
    public id: string;
    public nombre: string; //opcional porque al momento que se conecta al servidor aun no tiene nombre
    public sala: string;

    constructor( id:string ){

        this.id = id;
        this.nombre = 'sin-nombre';
        this.sala = 'sin-sala';
        
    }
}