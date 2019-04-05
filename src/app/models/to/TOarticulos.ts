// Generate by @vengardus 2019-03-12 20:32:34.241629

export class TOArticulos {

   private id:number;
   private codigo:string;
   private descripcion:string;
   private precioUnitario:number;
   private descuento:number;
   private tiposDescuento_id:string;
   private tiposAfectacion_id:string;
   private unidadesMedida_id:string;
   private monedas_id:string;
   private marcas_id:number;
   private familias_id:number;

   constructor(itemDataStorage:any) {
      this.id = itemDataStorage.id;
      this.codigo = itemDataStorage.codigo;
      this.descripcion = itemDataStorage.descripcion;
      this.precioUnitario = itemDataStorage.precioUnitario;
      this.descuento = itemDataStorage.descuento;
      this.tiposDescuento_id = itemDataStorage.tiposDescuento_id;
      this.tiposAfectacion_id = itemDataStorage.tiposAfectacion_id;
      this.unidadesMedida_id = itemDataStorage.unidadesMedida_id;
      this.monedas_id = itemDataStorage.monedas_id;
      this.marcas_id = itemDataStorage.marcas_id;
      this.familias_id = itemDataStorage.familias_id;
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

   getTiposAfectacion_id():string { return this.tiposAfectacion_id; }
   setTiposAfectacion_id(value:string) { this.tiposAfectacion_id = value; }

   getUnidadesMedida_id():string { return this.unidadesMedida_id; }
   setUnidadesMedida_id(value:string) { this.unidadesMedida_id = value; }

   getMonedas_id():string { return this.monedas_id; }
   setMonedas_id(value:string) { this.monedas_id = value; }

   getMarcas_id():number { return this.marcas_id; }
   setMarcas_id(value:number) { this.marcas_id = value; }

   getFamilias_id():number { return this.familias_id; }
   setFamilias_id(value:number) { this.familias_id = value; }

}
