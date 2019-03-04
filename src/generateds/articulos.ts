// Generate by @vengardus 2019-03-04 14:45:03.131522

import { TOArticulos } from './to/TOarticulos';


export class Articulos{
    aTOArticulos:TOArticulos[]=[];
    oTOArticulos:TOArticulos;

    constructor ( ){}

    add(item:any) {
        let oTOArticulos = new TOArticulos(item);
        this.aTOArticulos.push(oTOArticulos);
        this.oTOArticulos = oTOArticulos;
    }

    addArticulos(items:any) {
        this.setATOArticulos([]);
        for ( let item of items ) 
            this.add(item);
    }

    getATOArticulos():TOArticulos[] {
        return this.aTOArticulos;
    }

    setATOArticulos(value) {
        this.aTOArticulos = value;
    }

    setOTOArticulos(oTOArticulos:TOArticulos) {
        this.oTOArticulos = oTOArticulos;
    }

    getOTOArticulos():TOArticulos {
        return this.oTOArticulos;
    }
}
