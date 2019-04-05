// Generate by @vengardus 2019-03-27 15:03:50.315627

export class TOParametros {

   private login:string;
   private password:string;
   private nombreVendedor:string;
   private codigoVendedor:string;
   private fechaRuta:string;
   private diaRuta:string;
   private zonaCod:string;
   private monedas_id:string;
   private isMonedaDoble:boolean;
   private iva:number;
   private isc:number;
   private isCredito:boolean;
   private isLogged:boolean;
   private isPrevPayment:boolean;
   private isRecordarPassword:boolean;
   private token:string;
   private correlativoPedido:number;
   private tipoCambioVenta:number;
   private tipoCambioCompra:number;

   constructor(itemDataStorage?:any) {
      if ( itemDataStorage != null ) {
         this.login = itemDataStorage.login;
         this.password = itemDataStorage.password;
         this.nombreVendedor = itemDataStorage.nombreVendedor;
         this.codigoVendedor = itemDataStorage.codigoVendedor;
         this.fechaRuta = itemDataStorage.fechaRuta;
         this.diaRuta = itemDataStorage.diaRuta;
         this.zonaCod = itemDataStorage.zonaCod;
         this.monedas_id = itemDataStorage.monedas_id;
         this.isMonedaDoble = itemDataStorage.isMonedaDoble;
         this.iva = itemDataStorage.iva;
         this.isc = itemDataStorage.isc;
         this.isCredito = itemDataStorage.isCredito;
         this.isLogged = itemDataStorage.isLogged;
         this.isPrevPayment = itemDataStorage.isPrevPayment;
         this.isRecordarPassword = itemDataStorage.isRecordarPassword;
         this.token = itemDataStorage.token;
         this.correlativoPedido = itemDataStorage.correlativoPedido;
         this.tipoCambioVenta = itemDataStorage.tipoCambioVenta;
         this.tipoCambioCompra = itemDataStorage.tipoCambioCompra;
      }
   }

   getLogin():string { return this.login; }
   setLogin(value:string) { this.login = value; }

   getPassword():string { return this.password; }
   setPassword(value:string) { this.password = value; }

   getNombreVendedor():string { return this.nombreVendedor; }
   setNombreVendedor(value:string) { this.nombreVendedor = value; }

   getCodigoVendedor():string { return this.codigoVendedor; }
   setCodigoVendedor(value:string) { this.codigoVendedor = value; }

   getFechaRuta():string { return this.fechaRuta; }
   setFechaRuta(value:string) { this.fechaRuta = value; }

   getDiaRuta():string { return this.diaRuta; }
   setDiaRuta(value:string) { this.diaRuta = value; }

   getZonaCod():string { return this.zonaCod; }
   setZonaCod(value:string) { this.zonaCod = value; }

   getMonedas_id():string { return this.monedas_id; }
   setMonedas_id(value:string) { this.monedas_id = value; }

   getIsMonedaDoble():boolean { return this.isMonedaDoble; }
   setIsMonedaDoble(value:boolean) { this.isMonedaDoble = value; }

   getIva():number { return this.iva; }
   setIva(value:number) { this.iva = value; }

   getIsc():number { return this.isc; }
   setIsc(value:number) { this.isc = value; }

   getIsCredito():boolean { return this.isCredito; }
   setIsCredito(value:boolean) { this.isCredito = value; }

   getIsLogged():boolean { return this.isLogged; }
   setIsLogged(value:boolean) { this.isLogged = value; }

   getIsPrevPayment():boolean { return this.isPrevPayment; }
   setIsPrevPayment(value:boolean) { this.isPrevPayment = value; }

   getIsRecordarPassword():boolean { return this.isRecordarPassword; }
   setIsRecordarPassword(value:boolean) { this.isRecordarPassword = value; }

   getToken():string { return this.token; }
   setToken(value:string) { this.token = value; }

   getCorrelativoPedido():number { return this.correlativoPedido; }
   setCorrelativoPedido(value:number) { this.correlativoPedido = value; }

   getTipoCambioVenta():number { return this.tipoCambioVenta; }
   setTipoCambioVenta(value:number) { this.tipoCambioVenta = value; }

   getTipoCambioCompra():number { return this.tipoCambioCompra; }
   setTipoCambioCompra(value:number) { this.tipoCambioCompra = value; }

}
