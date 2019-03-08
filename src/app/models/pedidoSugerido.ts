// Generate by @vengardus 2019-03-08 16:53:08.831901

import { TOPedidoSugerido } from 'src/app/models/to/TOpedidoSugerido';

export class PedidoSugerido{
    private aTOPedidoSugerido:TOPedidoSugerido[]=[];
    private dataStorage:any=null;

    constructor ( dataStorage?:any ) {
        if ( dataStorage )
            this.dataStorage = dataStorage;
    }

    private add(itemDataStorage:any) {
        let oTOPedidoSugerido = new TOPedidoSugerido(itemDataStorage);
        this.aTOPedidoSugerido.push(oTOPedidoSugerido);
    }

    getAll(dataStorage?:any) {
        this.aTOPedidoSugerido = [];  
        if ( dataStorage )      
            this.dataStorage = dataStorage
        for ( let item of this.dataStorage ) 
            this.add(item);
    }

    getATOPedidoSugerido():TOPedidoSugerido[] {
        return this.aTOPedidoSugerido;
    }

    setATOPedidoSugerido(value:TOPedidoSugerido[]) {
        this.aTOPedidoSugerido = value;
    }


    /*--------------------------------------------------------------------
                        Funcionalidad adicional
    ----------------------------------------------------------------------*/
    
}
