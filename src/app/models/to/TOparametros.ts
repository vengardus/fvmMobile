// Generate by @vengardus 2019-03-08 16:53:04.749479

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

   constructor(itemDataStorage:any) {
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

}
