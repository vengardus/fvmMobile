// Generate by @vengardus 2019-03-27 16:51:08.910036

import { TOClientes } from 'src/app/models/to/TOclientes';
import { Globals } from '../config/globals';

export class Clientes{
    private aTOClientes:TOClientes[]=[];
    private dataStorage:any=null;

    constructor ( dataStorage?:any ) {
        if ( dataStorage ) {
            this.dataStorage = dataStorage;
            this.getAll();
        }
    }

    private addFromArray(itemDataStorage:any) {
        let oTOClientes = new TOClientes(itemDataStorage);
        this.aTOClientes.push(oTOClientes);
    }

    getAll(dataStorage?:any) {
        this.aTOClientes = [];  
        if ( dataStorage )      
            this.dataStorage = dataStorage
        for ( let item of this.dataStorage ) 
            this.addFromArray(item);
    }

    getATOClientes():TOClientes[] {
        return this.aTOClientes;
    }

    setATOClientes(value:TOClientes[]) {
        this.aTOClientes = value;
    }

    add(oTOClientes:TOClientes) {
        this.aTOClientes.push(oTOClientes);
    }

    remove(id:number):boolean {
        let index = this.aTOClientes.findIndex(oTOClientes => {
            return (oTOClientes.getId() === id ) ;
        })
        if ( index == -1 )
            return false;
        this.aTOClientes.splice(index, 1);
        return true;
    }

    update(oTOClientes:TOClientes):boolean {
        let index = this.aTOClientes.findIndex(item => {
            return (oTOClientes.getId() === item.getId() ) ;
        })
        if ( index == -1 )
            return false;
        this.aTOClientes.splice(index, 1, oTOClientes);
        return true;
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
            docIden = oTOClientes.getNumeroRuc();
        else
            docIden = oTOClientes.getNumeroDocIden();
        return docIden;
    }

    getTipoDocIden_id(oTOClientes:TOClientes):string {
        let tipoDocIden = '';
        if (oTOClientes.getTiposPersona_id() == Globals.TIPO_PERSONA_JURIDICA)
            tipoDocIden = Globals.TIPO_RUC;
        else
            tipoDocIden = Globals.TIPO_DNI;
        return tipoDocIden;
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

    getLimiteCredito(oTOClientes:TOClientes):string {
        return oTOClientes.getLimiteCredito().toFixed(2);
    }

    getCreditoDisponible(oTOClientes:TOClientes):string {
        return oTOClientes.getCreditoDisponible().toFixed(2);
    }

    getDeudaPendiente(oTOClientes:TOClientes):string {
        return (oTOClientes.getLimiteCredito()-oTOClientes.getCreditoDisponible()).toFixed(2);
    }

}
