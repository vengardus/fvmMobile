// Generate by @vengardus 2019-03-02 23:43:33.153726

export class TOParametros {

   private login : string;
   private password : string;
   private nombreVendedor : string;
   private codigoVendedor : string;
   private fechaRuta: string;
   private diaRuta: string;
   private zonaCod: string;
   private monedas_id : string;
   private isMonedaDoble:  boolean;
   private iva : number;
   private isc: number;
   private isCredito: boolean;
   private isLogged: boolean;
   private isPrevPayment: boolean;

   constructor(item:any) {
      this.login  = item.login ;
      this.password  = item.password ;
      this.nombreVendedor  = item.nombreVendedor ;
      this.codigoVendedor  = item.codigoVendedor ;
      this.fechaRuta = item.fechaRuta;
      this.diaRuta = item.diaRuta;
      this.zonaCod = item.zonaCod;
      this.monedas_id  = item.monedas_id ;
      this.isMonedaDoble = item.isMonedaDoble;
      this.iva  = item.iva ;
      this.isc = item.isc;
      this.isCredito = item.isCredito;
      this.isLogged = item.isLogged;
      this.isPrevPayment = item.isPrevPayment;
   }

   getLogin (): string { return this.login ; }
   setLogin (value: string) { this.login  = value; }

   getPassword (): string { return this.password ; }
   setPassword (value: string) { this.password  = value; }

   getNombreVendedor (): string { return this.nombreVendedor ; }
   setNombreVendedor (value: string) { this.nombreVendedor  = value; }

   getCodigoVendedor (): string { return this.codigoVendedor ; }
   setCodigoVendedor (value: string) { this.codigoVendedor  = value; }

   getFechaRuta(): string { return this.fechaRuta; }
   setFechaRuta(value: string) { this.fechaRuta = value; }

   getDiaRuta(): string { return this.diaRuta; }
   setDiaRuta(value: string) { this.diaRuta = value; }

   getZonaCod(): string { return this.zonaCod; }
   setZonaCod(value: string) { this.zonaCod = value; }

   getMonedas_id (): string { return this.monedas_id ; }
   setMonedas_id (value: string) { this.monedas_id  = value; }

   getIsMonedaDoble():  boolean { return this.isMonedaDoble; }
   setIsMonedaDoble(value:  boolean) { this.isMonedaDoble = value; }

   getIva (): number { return this.iva ; }
   setIva (value: number) { this.iva  = value; }

   getIsc(): number { return this.isc; }
   setIsc(value: number) { this.isc = value; }

   getIsCredito(): boolean { return this.isCredito; }
   setIsCredito(value: boolean) { this.isCredito = value; }

   getIsLogged(): boolean { return this.isLogged; }
   setIsLogged(value: boolean) { this.isLogged = value; }

   getIsPrevPayment(): boolean { return this.isPrevPayment; }
   setIsPrevPayment(value: boolean) { this.isPrevPayment = value; }

}
