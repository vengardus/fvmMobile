// Generate by @vengardus 2019-04-02 17:08:45.215803

export class TOPedidoSugerido {

   private id:number;
   private cliente_id:number;
   private articulo_id:number;
   private cantidad:number;

   constructor(itemDataStorage?:any) {
      if ( itemDataStorage != null ) {
         this.id = itemDataStorage.id;
         this.cliente_id = itemDataStorage.cliente_id;
         this.articulo_id = itemDataStorage.articulo_id;
         this.cantidad = itemDataStorage.cantidad;
      }
   }

   getId():number { return this.id; }
   setId(value:number) { this.id = value; }

   getCliente_id():number { return this.cliente_id; }
   setCliente_id(value:number) { this.cliente_id = value; }

   getArticulo_id():number { return this.articulo_id; }
   setArticulo_id(value:number) { this.articulo_id = value; }

   getCantidad():number { return this.cantidad; }
   setCantidad(value:number) { this.cantidad = value; }

}
