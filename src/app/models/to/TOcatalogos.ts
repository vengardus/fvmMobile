// Generate by @vengardus 2019-03-08 16:52:52.008530

export class TOCatalogos {

   private id:string;
   private nombre:string;
   private descripcion:string;
   private obligatorio:boolean;
   private update:boolean;
   private send:boolean;
   private recv:number;
   private saved:number;

   constructor(itemDataStorage:any) {
      this.id = itemDataStorage.id;
      this.nombre = itemDataStorage.nombre;
      this.descripcion = itemDataStorage.descripcion;
      this.obligatorio = itemDataStorage.obligatorio;
      this.update = itemDataStorage.update;
      this.send = itemDataStorage.send;
      this.recv = itemDataStorage.recv;
      this.saved = itemDataStorage.saved;
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
