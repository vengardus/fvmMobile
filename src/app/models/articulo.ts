
export class TOArticulos {
    id:number;
    codigo:string;
    descripcion:string;
    precioUnitario:number;
    descuento:number;
    tiposDescuento_id:string;

    constructor(
        id:number,
        codigo:string,
        descripcion:string,
        precioUnitario:number,
        descuento:number,
        tiposDescuento_id:string
    ) {
        this.id = id;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.precioUnitario = precioUnitario;
        this.descuento = descuento;
        this.tiposDescuento_id = tiposDescuento_id;
    }
}

export class Articulos {
    aTOArticulos:TOArticulos[]=[];

    constructor ( ){}
    addArticulo(item:any) {
        let oTOArticulos = new TOArticulos(
            item.id,
            item.codigo,
            item.descripcion,
            item.precioUnitario,
            item.descuento,
            item.tiposDescuento_id
        );
        this.aTOArticulos.push(oTOArticulos);
    }

    addArticulos(items:any) {
        this.setATOArticulos([]);
        for ( let item of items ) 
            this.addArticulo(item);
    }

    getATOArticulos():TOArticulos[] {
        return this.aTOArticulos;
    }

    setATOArticulos(value) {
        this.aTOArticulos = value;
    }

}