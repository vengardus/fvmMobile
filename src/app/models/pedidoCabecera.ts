// Generate by @vengardus 2019-03-27 14:09:42.439861

import { TOPedidoCabecera } from 'src/app/models/to/TOpedidoCabecera';

export class PedidoCabecera{
    private aTOPedidoCabecera:TOPedidoCabecera[]=[];
    private dataStorage:any=null;

    constructor ( dataStorage?:any ) {
        if ( dataStorage ) {
            this.dataStorage = dataStorage;
            this.getAll();
        }
    }

    private add(itemDataStorage:any) {
        let oTOPedidoCabecera = new TOPedidoCabecera(itemDataStorage);
        this.aTOPedidoCabecera.push(oTOPedidoCabecera);
    }

    getAll(dataStorage?:any) {
        this.aTOPedidoCabecera = [];  
        if ( dataStorage )      
            this.dataStorage = dataStorage
        for ( let item of this.dataStorage ) 
            this.add(item);
    }

    getATOPedidoCabecera():TOPedidoCabecera[] {
        return this.aTOPedidoCabecera;
    }

    setATOPedidoCabecera(value:TOPedidoCabecera[]) {
        this.aTOPedidoCabecera = value;
    }

    insert(oTOPedidoCabecera:TOPedidoCabecera) {
        this.aTOPedidoCabecera.push(oTOPedidoCabecera);
    }

    remove(id:number):boolean {
        let index = this.aTOPedidoCabecera.findIndex(oTOPedidoCabecera => {
            return (oTOPedidoCabecera.getId() === id ) ;
        })
        if ( index == -1 )
            return false;
        this.aTOPedidoCabecera.splice(index, 1);
        return true;
    }

    update(oTOPedidoCabecera:TOPedidoCabecera):boolean {
        let index = this.aTOPedidoCabecera.findIndex(item => {
            return (oTOPedidoCabecera.getId() === item.getId() ) ;
        })
        if ( index == -1 )
            return false;
        this.aTOPedidoCabecera.splice(index, 1, oTOPedidoCabecera);
        return true;
    }



    /*--------------------------------------------------------------------
                        Funcionalidad adicional
    ----------------------------------------------------------------------*/
    filterByCliente(id:number):TOPedidoCabecera[] {
        return this.aTOPedidoCabecera.filter(item=>{
            console.log(item.getClientes_id(), id);
            return (item.getClientes_id() === id);
        })
    }
}
