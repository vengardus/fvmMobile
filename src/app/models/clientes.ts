// Generate by @vengardus 2019-03-04 19:51:56.129859

import { TOClientes } from 'src/app/models/to/TOclientes';
import { Globals } from 'src/app/config/globals';

export class Clientes{
    private aTOClientes:TOClientes[]=[];
    private dataStorage:any=null;

    constructor ( dataStorage?:any ) {
        if ( dataStorage )
            this.dataStorage = dataStorage;
    }

    private add(item:any) {
        let oTOClientes = new TOClientes(item);
        this.aTOClientes.push(oTOClientes);
    }

    getAll(dataStorage?:any) {
        this.aTOClientes = [];  
        if ( dataStorage )      
            this.dataStorage = dataStorage
        for ( let item of this.dataStorage ) 
            this.add(item);
    }

    getATOClientes():TOClientes[] {
        return this.aTOClientes;
    }

    setATOClientes(value:TOClientes[]) {
        this.aTOClientes = value;
    }


    /*--------------------------------------------------------------------
                        Funcionalidad adicional
    ----------------------------------------------------------------------*/
    getNombreRazon(oTOClientes:TOClientes):string {
        //console.log('oTOCliente', this.oTOClientes);
        if ( oTOClientes.getTiposPersona_id()!=Globals.TIPO_PERSONA_JURIDICA ) 
          return oTOClientes.getApepat() + ' ' + oTOClientes.getApemat() + ', ' + oTOClientes.getNombres();
        else 
          return oTOClientes.getRazonSocial();
    }

    getContacto(oTOClientes:TOClientes):string {
        let contacto = '';
        if ( oTOClientes.getTiposPersona_id() == Globals.TIPO_PERSONA_JURIDICA
            && oTOClientes.getNombres().trim().length
        ) {
            contacto = oTOClientes.getApepat() + ' ' + oTOClientes.getApemat() + ', ' + oTOClientes.getNombres();
            contacto = contacto + ' (DNI: ' + oTOClientes.getNumeroDocIden() + ')';
        }
        return contacto;
    }

    getTelefonos(oTOClientes:TOClientes):string {
        let telefonos = '';;
        telefonos = telefonos + oTOClientes.getTelefono();
        if ( telefonos.trim().length && oTOClientes.getCelular().trim().length ) 
            telefonos = telefonos + ' - ';
        telefonos = telefonos + oTOClientes.getCelular();
        return telefonos;
    }

    getDocIden(oTOClientes:TOClientes):string {
        let docIden = '';
        if (oTOClientes.getTiposPersona_id() == Globals.TIPO_PERSONA_JURIDICA)
            docIden = 'RUC: ' + oTOClientes.getNumeroRuc();
        else
            docIden = 'DNI: ' + oTOClientes.getNumeroDocIden();
        return docIden;
    }

    filterByDiaRuta(isRuta:string, diaRuta:string) {
        let aTOClientes_aux:TOClientes[]=[];
        for (let i in this.aTOClientes) {
            if (    (isRuta === Globals.IS_RUTA && this.aTOClientes[i].getDiaRuta() === diaRuta) 
                ||  (isRuta !== Globals.IS_RUTA && this.aTOClientes[i].getDiaRuta() !== diaRuta)
            )
                aTOClientes_aux.push(this.aTOClientes[i]);
        }
        this.aTOClientes = aTOClientes_aux;
    }

    filterBySearch(isRuta:string, diaRuta:string, searchValue:string){
        this.aTOClientes = this.aTOClientes.filter(cliente=>{
            let dato = this.getNombreRazon(cliente);
            if (    (   (isRuta === Globals.IS_RUTA && cliente.getDiaRuta() === diaRuta) 
                    ||  (isRuta !== Globals.IS_RUTA && cliente.getDiaRuta() !== diaRuta)
                )
                &&  dato.toUpperCase().indexOf(searchValue.toUpperCase())>-1
            ) 
              return true;
            else
              return false;
          })
    }
}
