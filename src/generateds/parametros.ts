// Generate by @vengardus 2019-03-04 14:45:03.197512

import { TOParametros } from './to/TOparametros';


export class Parametros{
    aTOParametros:TOParametros[]=[];
    oTOParametros:TOParametros;

    constructor ( ){}

    add(item:any) {
        let oTOParametros = new TOParametros(item);
        this.aTOParametros.push(oTOParametros);
        this.oTOParametros = oTOParametros;
    }

    addParametros(items:any) {
        this.setATOParametros([]);
        for ( let item of items ) 
            this.add(item);
    }

    getATOParametros():TOParametros[] {
        return this.aTOParametros;
    }

    setATOParametros(value) {
        this.aTOParametros = value;
    }

    setOTOParametros(oTOParametros:TOParametros) {
        this.oTOParametros = oTOParametros;
    }

    getOTOParametros():TOParametros {
        return this.oTOParametros;
    }
}
