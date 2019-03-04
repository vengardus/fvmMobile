// Generate by @vengardus 2019-03-04 14:45:03.161523

export class TOClientes {

   private id:number;
   private tiposPersona_id:string;
   private apepat:string;
   private apemat:string;
   private nombres:string;
   private razonSocial:string;
   private tiposDocIden_id:string;
   private numeroDocIden:string;
   private numeroRuc:string;
   private telefono:string;
   private celular:string;
   private direccion:string;
   private diaRuta:string;
   private zonaCod:string;
   private estadoAtencion:string;

   constructor(item:any) {
      this.id = item.id;
      this.tiposPersona_id = item.tiposPersona_id;
      this.apepat = item.apepat;
      this.apemat = item.apemat;
      this.nombres = item.nombres;
      this.razonSocial = item.razonSocial;
      this.tiposDocIden_id = item.tiposDocIden_id;
      this.numeroDocIden = item.numeroDocIden;
      this.numeroRuc = item.numeroRuc;
      this.telefono = item.telefono;
      this.celular = item.celular;
      this.direccion = item.direccion;
      this.diaRuta = item.diaRuta;
      this.zonaCod = item.zonaCod;
      this.estadoAtencion = item.estadoAtencion;
   }

   getId():number { return this.id; }
   setId(value:number) { this.id = value; }

   getTiposPersona_id():string { return this.tiposPersona_id; }
   setTiposPersona_id(value:string) { this.tiposPersona_id = value; }

   getApepat():string { return this.apepat; }
   setApepat(value:string) { this.apepat = value; }

   getApemat():string { return this.apemat; }
   setApemat(value:string) { this.apemat = value; }

   getNombres():string { return this.nombres; }
   setNombres(value:string) { this.nombres = value; }

   getRazonSocial():string { return this.razonSocial; }
   setRazonSocial(value:string) { this.razonSocial = value; }

   getTiposDocIden_id():string { return this.tiposDocIden_id; }
   setTiposDocIden_id(value:string) { this.tiposDocIden_id = value; }

   getNumeroDocIden():string { return this.numeroDocIden; }
   setNumeroDocIden(value:string) { this.numeroDocIden = value; }

   getNumeroRuc():string { return this.numeroRuc; }
   setNumeroRuc(value:string) { this.numeroRuc = value; }

   getTelefono():string { return this.telefono; }
   setTelefono(value:string) { this.telefono = value; }

   getCelular():string { return this.celular; }
   setCelular(value:string) { this.celular = value; }

   getDireccion():string { return this.direccion; }
   setDireccion(value:string) { this.direccion = value; }

   getDiaRuta():string { return this.diaRuta; }
   setDiaRuta(value:string) { this.diaRuta = value; }

   getZonaCod():string { return this.zonaCod; }
   setZonaCod(value:string) { this.zonaCod = value; }

   getEstadoAtencion():string { return this.estadoAtencion; }
   setEstadoAtencion(value:string) { this.estadoAtencion = value; }

}
