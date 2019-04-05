import { TOArticulosItems } from './to/TOarticulosItems';
import { Globals } from '../config/globals';
import { TOClientes } from './to/TOclientes';
import { TOPedidoCabecera } from './to/TOpedidoCabecera';
import { TOParametros } from './to/TOparametros';
import { Clientes } from './clientes';
import { TOPedidoDetalle } from './to/TOpedidoDetalle';

export class Pedidos {
    aTOArticulosItems : TOArticulosItems[] = [];
    numItems : number;
    subTotal: number;
    totalPedido : number;
    totalIgv : number;
    totalIsc : number;
    totalDscto : number;
    messages:string[]=[];
    oTOPedidoCabecera:TOPedidoCabecera=null;
    aTOPedidoDetalle:TOPedidoDetalle[]=[];

    constructor() {
        this.subTotal = 0;
        this.totalDscto = 0;
        this.totalIgv = 0 ;
        this.totalPedido = 0;
    }

    getMessages():string[] {
        return this.messages;
    }

    getATOArticulosItems() {
        return this.aTOArticulosItems;
    }

    getOTOPedidoCabecera():TOPedidoCabecera {
        return this.oTOPedidoCabecera;
    }
    setOTOPedidoCabecera(value:TOPedidoCabecera) {
        this.oTOPedidoCabecera = value;
    }

    getATOPedidoDetalle():TOPedidoDetalle[] {
        return this.aTOPedidoDetalle;
    }
    setATOPedidoDetalle(value:TOPedidoDetalle[]) {
        this.aTOPedidoDetalle = value;
    }

    getSubTotal():number {
        return this.subTotal;
    }
    getTotalPedido():number {
        return this.totalPedido;
    }
    getTotalIgv():number {
        return this.totalIgv;
    }
    getTotalIsc():number {
        return this.totalIsc;
    }
    getTotalDscto():number {
        return this.totalDscto;
    }

    getSubTotalFormat():string {
        return this.subTotal.toFixed(2);
    }
    getTotalPedidoFormat():string {
        return this.totalPedido.toFixed(2);
    }
    getTotalIgvFormat():string {
        return this.totalIgv.toFixed(2);
    }
    getTotalDsctoFormat():string {
        return this.totalDscto.toFixed(2);
    }
    getPrecioFinalItemFormateado(oTOArticulosItems:TOArticulosItems):string {
        return oTOArticulosItems.getPrecioFinal().toFixed(2);
    }
    getSubTotalItemFormateado(oTOArticulosItems:TOArticulosItems):string {
        return oTOArticulosItems.getSubTotal().toFixed(2);
    }

    addCarrito(oTOArticulosItems:TOArticulosItems) {      
        let found =  false;
        for ( var index in this.aTOArticulosItems) {
            if ( this.aTOArticulosItems[index].getId() == oTOArticulosItems.getId() ) {
                found = true;
                if ( oTOArticulosItems.getCantidad() > 0 ) 
                    this.aTOArticulosItems[index].setCantidad(oTOArticulosItems.getCantidad());
                else {
                    oTOArticulosItems.setIsSelected(false);
                    this.aTOArticulosItems.splice(parseInt(index), 1);
                }
                break;
            }
        }
        if ( ! found && oTOArticulosItems.getCantidad() > 0 ) {
            oTOArticulosItems.setIsSelected(true);
            this.aTOArticulosItems.push(oTOArticulosItems);
        }
    }

    deleteCarrito(oTOArticulosItems:TOArticulosItems) {
        oTOArticulosItems.setCantidad(0);
        this.addCarrito(oTOArticulosItems);
        oTOArticulosItems.setCantidad(1);
    }

    calculaPedido() {
        /*
        Tener en cuenta que el igv puede venir incluido en el precio 
        => Globals.IGV_INCLUIDO_EN_PRECIO : boolean
        Cada articulo tiene un atributo de AFECTO o NO al igv
        => es afecto si = Globals.PRODUCTO_AFECTO_IGV (= "10")
        //
        Guardar calculos de
        p = precioUnitario incluido IGV
        q = cantidad
        pf = precio final aplicando descuentos
        d = descuento aplicado : (p - pf)*q
        igv = pf * q * IGV/100
        isc = pf * q * ISC/100
        st = subTotal = pf*q + isc 
        stA = subTotal productos afectos = pf*q*(1-IGV/100) : si prod es afecto
        stI = subTotal productos inafectos = pf*q : si prod es inafecto
        stIgv = subTotalIgv
        stIsc = subTotalIsc
        stD = subtotal descuento aplicado 
        */
        const IGV = 18.00;  // obtener de parametros
        const ISC = 0;      // obtener de parametros
        // inicializa totales
        this.totalPedido = 0;
        this.subTotal = 0;
        this.totalDscto = 0;
        this.totalIgv = 0;
        this.totalIsc = 0;
        // Por ahora no toma en cuenta ISC
        for (let index in this.aTOArticulosItems) {
            let p = this.aTOArticulosItems[index].getPrecioUnitario();
            if ( ! Globals.IGV_INCLUIDO_EN_PRECIO
                && this.aTOArticulosItems[index].getTiposAfectacion_id() == Globals.PRODUCTO_AFECTO_IGV
            )
                p =  p * (1+IGV/100);
            let q = this.aTOArticulosItems[index].getCantidad();
            let pf = this.getNuevoPrecio(index, p);
            let igv=0, isc=0, st=0, d=0, stA=0, stI=0;
            
            if ( this.aTOArticulosItems[index].getTiposAfectacion_id() == Globals.PRODUCTO_AFECTO_IGV )
                igv = this.round((pf)*q*IGV/100);
            isc = this.round((pf)*q*ISC/100);
            st = (pf)*q + isc;
            d = (p-pf)*q;
            if ( this.aTOArticulosItems[index].getTiposAfectacion_id() == Globals.PRODUCTO_AFECTO_IGV )
                stA = this.round(stA + (pf*q*(1-IGV/100)));
            else
                stI = stI + pf*q
            // redondeos
            pf = this.round(pf);
            igv = this.round(igv);
            isc = this.round(isc);
            st = this.round(st);
            d = this.round(d);
            stA = this.round(stA);
            stI = this.round(stI);
            // 
            this.aTOArticulosItems[index].setPrecioFinal(pf);
            this.aTOArticulosItems[index].setSubTotalIgv(igv);
            this.aTOArticulosItems[index].setSubTotalIsc(isc);
            this.aTOArticulosItems[index].setSubTotal(st);
            this.aTOArticulosItems[index].setSubTotalDscto(d);
            this.aTOArticulosItems[index].setSubTotalAfectos(stA);
            this.aTOArticulosItems[index].setSubTotalInafectos(stI);
            //
            console.log('subtotal', st);

            this.totalPedido += st;
            this.subTotal += (st-igv-isc);
            this.totalDscto += d;
            this.totalIgv += igv;
            this.totalIsc += isc;

            this.totalPedido = this.round(this.totalPedido);
            this.subTotal = this.round(this.subTotal);
            this.totalDscto = this.round(this.totalDscto);
            this.totalIgv = this.round(this.totalIgv);
            this.totalIsc = this.round(this.totalIsc);

console.log('total', this.totalPedido);
        }
    }

    private getNuevoPrecio(index, p:number):number {
        let d = this.aTOArticulosItems[index].getDescuento();
        let tipoDscto = this.aTOArticulosItems[index].getTiposDescuento_id();
        let pf=p;
        // de la misma tabla articulos.
        // Posteriormente habrá un tabla de descuentos
        if (tipoDscto === '01') // cambiar luego a Globals
            pf = p - (p*d/100);
        else
            pf = p - d;
        return this.round(pf);
    }

    private round(value:number):number {
        return Math.round(value * 100) / 100;       
    }

    public validForm(form:any):boolean {
        let ok = true;
        if ( form.selectFormasPago_id == '' ) {
            this.messages.push('Debe seleccionar una forma de pago.');
            ok = false;
        }
        if ( form.selectMonedas_id == '' ) {
            this.messages.push('Debe seleccionar una moneda.');
            ok = false;
        }
        return ok ;
    }

    public setPedidoCabecera(form:any, oTOClientes:TOClientes):TOPedidoCabecera {
        let oTOPedidoCabecera = new TOPedidoCabecera();
        
        oTOPedidoCabecera.setClientes_id(oTOClientes.getId());
        oTOPedidoCabecera.setMonedas_id(form.selectMonedas_id);
        oTOPedidoCabecera.setFormasPago_id(form.selectFormasPago_id);
        
        return oTOPedidoCabecera;
    }

    preSavePedido(  oTOClientes:TOClientes, 
                    oTOParametros:TOParametros):boolean {
        console.log('cliente', oTOClientes);
        console.log('param', oTOParametros);
        console.log('pedcab', this.oTOPedidoCabecera);
        console.log('opedidos', this);
        let oClientes = new Clientes();
        //oPedidoCabecera.setClientes_id(oTOClientes.getId());
        this.oTOPedidoCabecera.setEstado('P');
        this.oTOPedidoCabecera.setEstadoEnviado(Globals.ESTADO_PEDIDO_ENVIO.PENDIENTE);
        let now = new Date();
        let fecha = now.getFullYear().toString() + ('00'+(now.getMonth()+1).toString()).slice(-2) + ('00'+now.getDate().toString()).slice(-2);
        let hora = ('00'+now.getHours().toString()).slice(-2) + ('00'+now.getMinutes().toString()).slice(-2);
        this.oTOPedidoCabecera.setFechaEmision(fecha);
        //oPedidoCabecera.setFormasPago_id()
        this.oTOPedidoCabecera.setHoraEmision(hora);
        this.oTOPedidoCabecera.setId(oTOParametros.getCorrelativoPedido());
        this.oTOPedidoCabecera.setCorrelativoDocumento(oTOParametros.getCorrelativoPedido().toString());
        this.oTOPedidoCabecera.setNombreRazon(oClientes.getNombreRazon(oTOClientes));
        this.oTOPedidoCabecera.setNumeroDocIden(oClientes.getDocIden(oTOClientes));
        this.oTOPedidoCabecera.setSerieDocumento('');
        this.oTOPedidoCabecera.setTiposDocIden_id(oClientes.getTipoDocIden_id(oTOClientes));
        if ( oClientes.getTipoDocIden_id(oTOClientes) == Globals.TIPO_RUC )
            this.oTOPedidoCabecera.setTiposDocumento_id(Globals.TIPO_FACTURA);
        else
            this.oTOPedidoCabecera.setTiposDocumento_id(Globals.TIPO_BOLETA);
        this.oTOPedidoCabecera.setTotalDescuentos(this.getTotalDscto());
        this.oTOPedidoCabecera.setTotalIgv(this.getTotalIgv());
        this.oTOPedidoCabecera.setTotalIsc(this.getTotalIsc());
        this.oTOPedidoCabecera.setTotalVenta(this.getTotalPedido());

        console.log('cabecera', this.oTOPedidoCabecera);
        let index = 0;
        this.aTOPedidoDetalle = [];
        for ( let item of this.aTOArticulosItems ) {
            let oTOPedidoDetalle = new TOPedidoDetalle();
            oTOPedidoDetalle.setArticulos_id(item.getId());
            oTOPedidoDetalle.setCantidad(item.getCantidad());
            oTOPedidoDetalle.setDescuento(item.getDescuento());
            oTOPedidoDetalle.setIgv(item.getSubTotalIgv());
            oTOPedidoDetalle.setIsc(item.getSubTotalIsc());
            oTOPedidoDetalle.setItem(index++);
            oTOPedidoDetalle.setMonedas_id(item.getMonedas_id());
            oTOPedidoDetalle.setPedido_id(this.oTOPedidoCabecera.getId());
            oTOPedidoDetalle.setPrecioUnitario(item.getPrecioUnitario());
            oTOPedidoDetalle.setSubTotal(item.getSubTotal());
            oTOPedidoDetalle.setTipoCambio(oTOParametros.getTipoCambioVenta());
            oTOPedidoDetalle.setTiposAfectacion_id(item.getTiposAfectacion_id());
            oTOPedidoDetalle.setUnidadesMedida_id(item.getUnidadesMedida_id());
            this.aTOPedidoDetalle.push(oTOPedidoDetalle);
        }

        console.log('det ped', this.aTOPedidoDetalle);
        return true;
    }

}