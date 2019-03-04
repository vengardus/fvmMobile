// Generate by @vengardus 2019-03-02 23:43:33.097757

export class TOCatalogos {

   private id:string;
   private nombre:string;
   private descripcion:string;
   private obligatorio:boolean;
   private update:boolean;
   private send:boolean;
   private recv:number;
   private saved:number;

   constructor(item:any) {
      this.id = item.id;
      this.nombre = item.nombre;
      this.descripcion = item.descripcion;
      this.obligatorio = item.obligatorio;
      this.update = item.update;
      this.send = item.send;
      this.recv = item.recv;
      this.saved = item.saved;
   }

   getId():string { return this.id; }
   setId(value:string) { this.id = value; }

   getNombre():string { return this.nombre; }
   setNombre(value:string) { this.nombre = value; }

   getDescripcion():string { return this.descripcion; }
   setDescripcion(value:string) { this.descripcion = value; }

   getObligatorio():boolean { return this.obligatorio; }
   setObligatorio(value:boolean) { this.obligatorio = value; }

   getUpdate():boolean { return this.update; }
   setUpdate(value:boolean) { this.update = value; }

   getSend():boolean { return this.send; }
   setSend(value:boolean) { this.send = value; }

   getRecv():number { return this.recv; }
   setRecv(value:number) { this.recv = value; }

   getSaved():number { return this.saved; }
   setSaved(value:number) { this.saved = value; }

}
