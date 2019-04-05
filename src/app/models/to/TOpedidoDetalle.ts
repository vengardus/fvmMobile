// Generate by @vengardus 2019-04-04 16:31:39.832144

export class TOPedidoDetalle {

   private pedido_id:number;
   private articulos_id:number;
   private cantidad:number;
   private precioUnitario:number;
   private unidadesMedida_id:string;
   private monedas_id:string;
   private tiposAfectacion_id:string;
   private descuento:number;
   private igv:number;
   private isc:number;
   private subTotal:number;
   private item:number;
   private tipoCambio:number;

   constructor(itemDataStorage?:any) {
      if ( itemDataStorage != null ) {
         this.pedido_id = itemDataStorage.pedido_id;
         this.articulos_id = itemDataStorage.articulos_id;
         this.cantidad = itemDataStorage.cantidad;
         this.precioUnitario = itemDataStorage.precioUnitario;
         this.unidadesMedida_id = itemDataStorage.unidadesMedida_id;
         this.monedas_id = itemDataStorage.monedas_id;
         this.tiposAfectacion_id = itemDataStorage.tiposAfectacion_id;
         this.descuento = itemDataStorage.descuento;
         this.igv = itemDataStorage.igv;
         this.isc = itemDataStorage.isc;
         this.subTotal = itemDataStorage.subTotal;
         this.item = itemDataStorage.item;
         this.tipoCambio = itemDataStorage.tipoCambio;
      }
   }

   getPedido_id():number { return this.pedido_id; }
   setPedido_id(value:number) { this.pedido_id = value; }

   getArticulos_id():number { return this.articulos_id; }
   setArticulos_id(value:number) { this.articulos_id = value; }

   getCantidad():number { return this.cantidad; }
   setCantidad(value:number) { this.cantidad = value; }

   getPrecioUnitario():number { return this.precioUnitario; }
   setPrecioUnitario(value:number) { this.precioUnitario = value; }

   getUnidadesMedida_id():string { return this.unidadesMedida_id; }
   setUnidadesMedida_id(value:string) { this.unidadesMedida_id = value; }

   getMonedas_id():string { return this.monedas_id; }
   setMonedas_id(value:string) { this.monedas_id = value; }

   getTiposAfectacion_id():string { return this.tiposAfectacion_id; }
   setTiposAfectacion_id(value:string) { this.tiposAfectacion_id = value; }

   getDescuento():number { return this.descuento; }
   setDescuento(value:number) { this.descuento = value; }

   getIgv():number { return this.igv; }
   setIgv(value:number) { this.igv = value; }

   getIsc():number { return this.isc; }
   setIsc(value:number) { this.isc = value; }

   getSubTotal():number { return this.subTotal; }
   setSubTotal(value:number) { this.subTotal = value; }

   getItem():number { return this.item; }
   setItem(value:number) { this.item = value; }

   getTipoCambio():number { return this.tipoCambio; }
   setTipoCambio(value:number) { this.tipoCambio = value; }

}
