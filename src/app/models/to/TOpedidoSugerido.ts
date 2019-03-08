// Generate by @vengardus 2019-03-08 16:53:08.822906

export class TOPedidoSugerido {

   private cliente_id:number;
   private articulo_id:number;
   private cantidad:number;

   constructor(itemDataStorage:any) {
      this.cliente_id = itemDataStorage.cliente_id;
      this.articulo_id = itemDataStorage.articulo_id;
      this.cantidad = itemDataStorage.cantidad;
   }

   getCliente_id():number { return this.cliente_id; }
   setCliente_id(value:number) { this.cliente_id = value; }

   getArticulo_id():number { return this.articulo_id; }
   setArticulo_id(value:number) { this.articulo_id = value; }

   getCantidad():number { return this.cantidad; }
   setCantidad(value:number) { this.cantidad = value; }

}
