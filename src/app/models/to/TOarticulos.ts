// Generate by @vengardus 2019-03-08 16:52:21.663953

export class TOArticulos {

   private id:number;
   private codigo:string;
   private descripcion:string;
   private precioUnitario:number;
   private descuento:number;
   private tiposDescuento_id:string;

   constructor(itemDataStorage:any) {
      this.id = itemDataStorage.id;
      this.codigo = itemDataStorage.codigo;
      this.descripcion = itemDataStorage.descripcion;
      this.precioUnitario = itemDataStorage.precioUnitario;
      this.descuento = itemDataStorage.descuento;
      this.tiposDescuento_id = itemDataStorage.tiposDescuento_id;
   }

   getId():number { return this.id; }
   setId(value:number) { this.id = value; }

   getCodigo():string { return this.codigo; }
   setCodigo(value:string) { this.codigo = value; }

   getDescripcion():string { return this.descripcion; }
   setDescripcion(value:string) { this.descripcion = value; }

   getPrecioUnitario():number { return this.precioUnitario; }
   setPrecioUnitario(value:number) { this.precioUnitario = value; }

   getDescuento():number { return this.descuento; }
   setDescuento(value:number) { this.descuento = value; }

   getTiposDescuento_id():string { return this.tiposDescuento_id; }
   setTiposDescuento_id(value:string) { this.tiposDescuento_id = value; }

}
