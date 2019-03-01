import { Globals } from '../config/globals';

export class TOClientes {
    id:number;
	tiposPersona_id:string;
	apepat:string;
	apemat:string;
	nombres:string;
	razonSocial:string;
	tiposDocIden_id:string;
	numeroDocIden:string;
	numeroRuc:string;
	telefono:string;
	celular:string;
    direccion:string;
    diaRuta:string;
    zonaCod:string;
    estadoAtencion:string;

    constructor(
        id,
        tiposPersona_id,
        apepat,
        apemat,
        nombres,
        razonSocial,
        tiposDocIden_id,
        numeroDocIden,
        numeroRuc,
        telefono,
        celular,
        direccion,
        diaRuta,
        zonaCod,
        estadoAtencion
    ) {
        this.id = id;
        this.tiposPersona_id = tiposPersona_id;
        this.apepat = apepat;
        this.apemat = apemat;
        this.nombres = nombres;
        this.razonSocial = razonSocial;
        this.tiposDocIden_id = tiposDocIden_id;
        this.numeroDocIden = numeroDocIden;
        this.numeroRuc = numeroRuc;
        this.telefono = telefono;
        this.celular = celular;
        this.direccion = (direccion!=null)?direccion:'';
        this.diaRuta = diaRuta;
        this.zonaCod = zonaCod;
        this.estadoAtencion = estadoAtencion;
    }
}

export class Clientes{
    aTOClientes:TOClientes[]=[];
    oTOClientes:TOClientes;

    constructor ( ){}

    addCliente(item:any) {
        let oTOClientes = new TOClientes(
            item.id,
            item.tiposPersona_id,
            item.apepat,
            item.apemat,
            item.nombres,
            item.razonSocial,
            item.tiposDocIden_id,
            item.numeroDocIden,
            item.numeroRuc,
            item.telefono,
            item.celular,
            item.direccion,
            item.diaRuta,
            item.zonaCod,
            item.estadoAtencion
        );
        this.aTOClientes.push(oTOClientes);
        this.oTOClientes = oTOClientes;
    }

    addClientes(items:any) {
        this.setATOClientes([]);
        for ( let item of items ) 
            this.addCliente(item);
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
        if ( this.oTOClientes.tiposPersona_id!=Globals.TIPO_PERSONA_JURIDICA ) 
          return this.oTOClientes.apepat + ' ' + this.oTOClientes.apemat + ', ' + this.oTOClientes.nombres;
        else 
          return this.oTOClientes.razonSocial;
    }

    getContacto():string {
        let contacto = '';
        if ( this.oTOClientes.tiposPersona_id == Globals.TIPO_PERSONA_JURIDICA
            && this.oTOClientes.nombres.trim().length
        ) {
            contacto = this.oTOClientes.apepat + ' ' + this.oTOClientes.apemat + ', ' + this.oTOClientes.nombres;
            contacto = contacto + ' (DNI: ' + this.oTOClientes.numeroDocIden + ')';
        }
        return contacto;
    }

    getTelefonos():string {
        let telefonos = '';;
        telefonos = telefonos + this.oTOClientes.telefono;
        if ( telefonos.trim().length && this.oTOClientes.celular.trim().length ) 
            telefonos = telefonos + ' - ';
        telefonos = telefonos + this.oTOClientes.celular;
        return telefonos;
    }

    getDocIden():string {
        let docIden = '';
        if (this.oTOClientes.tiposPersona_id == Globals.TIPO_PERSONA_JURIDICA)
            docIden = 'RUC: ' + this.oTOClientes.numeroRuc;
        else
            docIden = 'DNI: ' + this.oTOClientes.numeroDocIden;
        return docIden;
    }
}