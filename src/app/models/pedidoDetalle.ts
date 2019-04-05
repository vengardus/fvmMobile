// Generate by @vengardus 2019-03-27 14:27:17.201753

import { TOPedidoDetalle } from 'src/app/models/to/TOpedidoDetalle';

export class PedidoDetalle{
    private aTOPedidoDetalle:TOPedidoDetalle[]=[];
    private dataStorage:any=null;

    constructor ( dataStorage?:any ) {
        if ( dataStorage ) {
            this.dataStorage = dataStorage;
            this.getAll();
        }
    }

    private add(itemDataStorage:any) {
        let oTOPedidoDetalle = new TOPedidoDetalle(itemDataStorage);
        this.aTOPedidoDetalle.push(oTOPedidoDetalle);
    }

    getAll(dataStorage?:any) {
        this.aTOPedidoDetalle = [];  
        if ( dataStorage )      
            this.dataStorage = dataStorage
        for ( let item of this.dataStorage ) 
            this.add(item);
    }

    getATOPedidoDetalle():TOPedidoDetalle[] {
        return this.aTOPedidoDetalle;
    }

    setATOPedidoDetalle(value:TOPedidoDetalle[]) {
        this.aTOPedidoDetalle = value;
    }

    insert(oTOPedidoDetalle:TOPedidoDetalle) {
        this.aTOPedidoDetalle.push(oTOPedidoDetalle);
    }

    



    /*--------------------------------------------------------------------
                        Funcionalidad adicional
    ----------------------------------------------------------------------*/
    remove(oTOPedidoDetalle:TOPedidoDetalle):boolean {
        let index = this.aTOPedidoDetalle.findIndex(item => {
            return (oTOPedidoDetalle.getPedido_id() === item.getPedido_id() 
            && oTOPedidoDetalle.getArticulos_id() === item.getArticulos_id()) ;
        })
        if ( index == -1 )
            return false;
        this.aTOPedidoDetalle.splice(index, 1);
        return true;
    }

    update(oTOPedidoDetalle:TOPedidoDetalle):boolean {
        let index = this.aTOPedidoDetalle.findIndex(item => {
            return ( oTOPedidoDetalle.getPedido_id() === item.getPedido_id() 
                    && oTOPedidoDetalle.getArticulos_id() === item.getArticulos_id() ) ;
        })
        if ( index == -1 )
            return false;
        this.aTOPedidoDetalle.splice(index, 1, oTOPedidoDetalle);
        return true;
    }

    filterByPedido(pedido_id):TOPedidoDetalle[] {
        return  this.aTOPedidoDetalle.filter(item=>{
            return ( item.getPedido_id() === pedido_id );
        })
    }
}
