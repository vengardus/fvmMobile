// Generate by @vengardus 2019-03-04 19:51:56.073540

import { TOCatalogos } from 'src/app/models/to/TOcatalogos';

export class Catalogos{
    private aTOCatalogos:TOCatalogos[]=[];
    private dataStorage:any=null;

    constructor ( dataStorage?:any ) {
        if ( dataStorage )
            this.dataStorage = dataStorage;
    }

    private add(item:any) {
        let oTOCatalogos = new TOCatalogos(item);
        this.aTOCatalogos.push(oTOCatalogos);
    }

    getAll(dataStorage?:any) {
        this.aTOCatalogos = [];  
        if ( dataStorage )      
            this.dataStorage = dataStorage
        for ( let item of this.dataStorage ) 
            this.add(item);
    }

    getATOCatalogos():TOCatalogos[] {
        return this.aTOCatalogos;
    }

    setATOCatalogos(value:TOCatalogos[]) {
        this.aTOCatalogos = value;
    }


    /*--------------------------------------------------------------------
                        Funcionalidad adicional
    ----------------------------------------------------------------------*/
    
}
