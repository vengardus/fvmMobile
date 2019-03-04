// Generate by @vengardus 2019-03-04 14:45:03.123523

export class TOArticulos {

   private id:number;
   private codigo:string;
   private descripcion:string;
   private precioUnitario:number;
   private descuento:number;
   private tiposDescuento_id:string;

   constructor(item:any) {
      this.id = item.id;
      this.codigo = item.codigo;
      this.descripcion = item.descripcion;
      this.precioUnitario = item.precioUnitario;
      this.descuento = item.descuento;
      this.tiposDescuento_id = item.tiposDescuento_id;
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
