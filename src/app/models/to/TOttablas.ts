// Generate by @vengardus 2019-03-24 19:05:50.102058

export class TOTtablas {

   private id:number;
   private tablaCod:string;
   private tabla_id:string;
   private descripcion:string;
   private glosa:string;
   private abrev:string;

   constructor(itemDataStorage?:any) {
      if ( itemDataStorage != null ) {
         this.id = itemDataStorage.id;
         this.tablaCod = itemDataStorage.tablaCod;
         this.tabla_id = itemDataStorage.tabla_id;
         this.descripcion = itemDataStorage.descripcion;
         this.glosa = itemDataStorage.glosa;
         this.abrev = itemDataStorage.abrev;
      }
   }

   getId():number { return this.id; }
   setId(value:number) { this.id = value; }

   getTablaCod():string { return this.tablaCod; }
   setTablaCod(value:string) { this.tablaCod = value; }

   getTabla_id():string { return this.tabla_id; }
   setTabla_id(value:string) { this.tabla_id = value; }

   getDescripcion():string { return this.descripcion; }
   setDescripcion(value:string) { this.descripcion = value; }

   getGlosa():string { return this.glosa; }
   setGlosa(value:string) { this.glosa = value; }

   getAbrev():string { return this.abrev; }
   setAbrev(value:string) { this.abrev = value; }

}
