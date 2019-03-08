// Generate by @vengardus 2019-03-08 16:52:54.956141

import { TOCatalogos } from 'src/app/models/to/TOcatalogos';

export class Catalogos{
    private aTOCatalogos:TOCatalogos[]=[];
    private dataStorage:any=null;

    constructor ( dataStorage?:any ) {
        if ( dataStorage )
            this.dataStorage = dataStorage;
    }

    private add(itemDataStorage:any) {
        let oTOCatalogos = new TOCatalogos(itemDataStorage);
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
