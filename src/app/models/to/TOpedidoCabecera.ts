// Generate by @vengardus 2019-03-24 16:58:20.840989

export class TOPedidoCabecera {

   private id:number;
   private tiposDocumento_id:string;
   private serieDocumento:string;
   private correlativoDocumento:string;
   private clientes_id:number;
   private tiposDocIden_id:string;
   private numeroDocIden:string;
   private nombreRazon:string;
   private formasPago_id:string;
   private monedas_id:string;
   private totalVenta:number;
   private totalIgv:number;
   private totalIsc:number;
   private totalDescuentos:number;
   private fechaEmision:string;
   private horaEmision:string;
   private estado:string;
   private estadoEnviado:string;

   constructor(itemDataStorage?:any) {
      if ( itemDataStorage != null ) {
         this.id = itemDataStorage.id;
         this.tiposDocumento_id = itemDataStorage.tiposDocumento_id;
         this.serieDocumento = itemDataStorage.serieDocumento;
         this.correlativoDocumento = itemDataStorage.correlativoDocumento;
         this.clientes_id = itemDataStorage.clientes_id;
         this.tiposDocIden_id = itemDataStorage.tiposDocIden_id;
         this.numeroDocIden = itemDataStorage.numeroDocIden;
         this.nombreRazon = itemDataStorage.nombreRazon;
         this.formasPago_id = itemDataStorage.formasPago_id;
         this.monedas_id = itemDataStorage.monedas_id;
         this.totalVenta = itemDataStorage.totalVenta;
         this.totalIgv = itemDataStorage.totalIgv;
         this.totalIsc = itemDataStorage.totalIsc;
         this.totalDescuentos = itemDataStorage.totalDescuentos;
         this.fechaEmision = itemDataStorage.fechaEmision;
         this.horaEmision = itemDataStorage.horaEmision;
         this.estado = itemDataStorage.estado;
         this.estadoEnviado = itemDataStorage.estadoEnviado;
      }
   }

   getId():number { return this.id; }
   setId(value:number) { this.id = value; }

   getTiposDocumento_id():string { return this.tiposDocumento_id; }
   setTiposDocumento_id(value:string) { this.tiposDocumento_id = value; }

   getSerieDocumento():string { return this.serieDocumento; }
   setSerieDocumento(value:string) { this.serieDocumento = value; }

   getCorrelativoDocumento():string { return this.correlativoDocumento; }
   setCorrelativoDocumento(value:string) { this.correlativoDocumento = value; }

   getClientes_id():number { return this.clientes_id; }
   setClientes_id(value:number) { this.clientes_id = value; }

   getTiposDocIden_id():string { return this.tiposDocIden_id; }
   setTiposDocIden_id(value:string) { this.tiposDocIden_id = value; }

   getNumeroDocIden():string { return this.numeroDocIden; }
   setNumeroDocIden(value:string) { this.numeroDocIden = value; }

   getNombreRazon():string { return this.nombreRazon; }
   setNombreRazon(value:string) { this.nombreRazon = value; }

   getFormasPago_id():string { return this.formasPago_id; }
   setFormasPago_id(value:string) { this.formasPago_id = value; }

   getMonedas_id():string { return this.monedas_id; }
   setMonedas_id(value:string) { this.monedas_id = value; }

   getTotalVenta():number { return this.totalVenta; }
   setTotalVenta(value:number) { this.totalVenta = value; }

   getTotalIgv():number { return this.totalIgv; }
   setTotalIgv(value:number) { this.totalIgv = value; }

   getTotalIsc():number { return this.totalIsc; }
   setTotalIsc(value:number) { this.totalIsc = value; }

   getTotalDescuentos():number { return this.totalDescuentos; }
   setTotalDescuentos(value:number) { this.totalDescuentos = value; }

   getFechaEmision():string { return this.fechaEmision; }
   setFechaEmision(value:string) { this.fechaEmision = value; }

   getHoraEmision():string { return this.horaEmision; }
   setHoraEmision(value:string) { this.horaEmision = value; }

   getEstado():string { return this.estado; }
   setEstado(value:string) { this.estado = value; }

   getEstadoEnviado():string { return this.estadoEnviado; }
   setEstadoEnviado(value:string) { this.estadoEnviado = value; }

}
