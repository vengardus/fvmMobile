// Generate by @vengardus 2019-03-04 19:51:55.944757

import { TOArticulos } from 'src/app/models/to/TOarticulos';

export class Articulos{
    private aTOArticulos:TOArticulos[]=[];
    private dataStorage:any=null;

    constructor ( dataStorage?:any ) {
        if ( dataStorage )
            this.dataStorage = dataStorage;
    }

    private add(item:any) {
        let oTOArticulos = new TOArticulos(item);
        this.aTOArticulos.push(oTOArticulos);
    }

    getAll(dataStorage?:any) {
        this.aTOArticulos = [];  
        if ( dataStorage )      
            this.dataStorage = dataStorage
        for ( let item of this.dataStorage ) 
            this.add(item);
    }

    getATOArticulos():TOArticulos[] {
        return this.aTOArticulos;
    }

    setATOArticulos(value:TOArticulos[]) {
        this.aTOArticulos = value;
    }


    /*--------------------------------------------------------------------
                        Funcionalidad adicional
    ----------------------------------------------------------------------*/
    
}
