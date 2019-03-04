// Generate by @vengardus 2019-03-02 17:42:58.815481

export class TOArticulos {

   private id:number;
   private codigo:string;
   private descripcion:string;
   private precioUnitario:number;
   private descuento:number;
   private tiposDescuento_id:string;

   public constructor(item:any) {
      this.id = item.id;
      this.codigo = item.codigo;
      this.descripcion = item.descripcion;
      this.precioUnitario = item.precioUnitario;
      this.descuento = item.descuento;
      this.tiposDescuento_id = item.tiposDescuento_id;
   }

   public getId() { return this.id; }
   public setId(value) { this.id = value; }

   public getCodigo() { return this.codigo; }
   public setCodigo(value) { this.codigo = value; }

   public getDescripcion() { return this.descripcion; }
   public setDescripcion(value) { this.descripcion = value; }

   public getPreciounitario() { return this.precioUnitario; }
   public setPreciounitario(value) { this.precioUnitario = value; }

   public getDescuento() { return this.descuento; }
   public setDescuento(value) { this.descuento = value; }

   public getTiposdescuento_id() { return this.tiposDescuento_id; }
   public setTiposdescuento_id(value) { this.tiposDescuento_id = value; }

}
