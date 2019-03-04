import { TOClientes } from './to/TOclientes';
import { Globals } from '../config/globals';

export class Clientes{
    aTOClientes:TOClientes[]=[];
    oTOClientes:TOClientes;

    constructor ( ){}

    add(item:any) {
        let oTOClientes = new TOClientes(item);
        this.aTOClientes.push(oTOClientes);
        this.oTOClientes = oTOClientes;
    }

    addClientes(items:any) {
        this.setATOClientes([]);
        for ( let item of items ) 
            this.add(item);
    }

    getATOClientes():TOClientes[] {
        return this.aTOClientes;
    }

    setATOClientes(value) {
        this.aTOClientes = value;
    }

    setOTOClientes(oTOClientes:TOClientes) {
        this.oTOClientes = oTOClientes;
    }

    getOTOClientes():TOClientes {
        return this.oTOClientes;
    }

    getNombreRazon():string {
        //console.log('oTOCliente', this.oTOClientes);
        if ( this.oTOClientes.getTiposPersona_id()!=Globals.TIPO_PERSONA_JURIDICA ) 
          return this.oTOClientes.getApepat() + ' ' + this.oTOClientes.getApemat() + ', ' + this.oTOClientes.getNombres();
        else 
          return this.oTOClientes.getRazonSocial();
    }

    getContacto():string {
        let contacto = '';
        if ( this.oTOClientes.getTiposPersona_id() == Globals.TIPO_PERSONA_JURIDICA
            && this.oTOClientes.getNombres().trim().length
        ) {
            contacto = this.oTOClientes.getApepat() + ' ' + this.oTOClientes.getApemat() + ', ' + this.oTOClientes.getNombres();
            contacto = contacto + ' (DNI: ' + this.oTOClientes.getNumeroDocIden() + ')';
        }
        return contacto;
    }

    getTelefonos():string {
        let telefonos = '';;
        telefonos = telefonos + this.oTOClientes.getTelefono();
        if ( telefonos.trim().length && this.oTOClientes.getCelular().trim().length ) 
            telefonos = telefonos + ' - ';
        telefonos = telefonos + this.oTOClientes.getCelular();
        return telefonos;
    }

    getDocIden():string {
        let docIden = '';
        if (this.oTOClientes.getTiposPersona_id() == Globals.TIPO_PERSONA_JURIDICA)
            docIden = 'RUC: ' + this.oTOClientes.getNumeroRuc();
        else
            docIden = 'DNI: ' + this.oTOClientes.getNumeroDocIden();
        return docIden;
    }
}
