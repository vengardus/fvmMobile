// Generate by @vengardus 2019-04-02 17:08:48.644797

import { TOPedidoSugerido } from 'src/app/models/to/TOpedidoSugerido';

export class PedidoSugerido{
    private aTOPedidoSugerido:TOPedidoSugerido[]=[];
    private dataStorage:any=null;

    constructor ( dataStorage?:any ) {
        if ( dataStorage ) {
            this.dataStorage = dataStorage;
            this.getAll();
        }
    }

    private addFromArray(itemDataStorage:any) {
        let oTOPedidoSugerido = new TOPedidoSugerido(itemDataStorage);
        this.aTOPedidoSugerido.push(oTOPedidoSugerido);
    }

    getAll(dataStorage?:any) {
        this.aTOPedidoSugerido = [];  
        if ( dataStorage )      
            this.dataStorage = dataStorage
        for ( let item of this.dataStorage ) 
            this.addFromArray(item);
    }

    getATOPedidoSugerido():TOPedidoSugerido[] {
        return this.aTOPedidoSugerido;
    }

    setATOPedidoSugerido(value:TOPedidoSugerido[]) {
        this.aTOPedidoSugerido = value;
    }

    add(oTOPedidoSugerido:TOPedidoSugerido) {
        this.aTOPedidoSugerido.push(oTOPedidoSugerido);
    }

    remove(id:number):boolean {
        let index = this.aTOPedidoSugerido.findIndex(oTOPedidoSugerido => {
            return (oTOPedidoSugerido.getId() === id ) ;
        })
        if ( index == -1 )
            return false;
        this.aTOPedidoSugerido.splice(index, 1);
        return true;
    }

    update(oTOPedidoSugerido:TOPedidoSugerido):boolean {
        let index = this.aTOPedidoSugerido.findIndex(item => {
            return (oTOPedidoSugerido.getId() === item.getId() ) ;
        })
        if ( index == -1 )
            return false;
        this.aTOPedidoSugerido.splice(index, 1, oTOPedidoSugerido);
        return true;
    }



    /*--------------------------------------------------------------------
                        Funcionalidad adicional
    ----------------------------------------------------------------------*/
    
}
