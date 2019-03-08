// Generate by @vengardus 2019-03-08 16:52:45.173502

import { TOArticulosItems } from 'src/app/models/to/TOarticulosItems';

export class ArticulosItems{
    private aTOArticulosItems:TOArticulosItems[]=[];
    private dataStorage:any=null;

    constructor ( dataStorage?:any ) {
        if ( dataStorage )
            this.dataStorage = dataStorage;
    }

    private add(itemDataStorage:any) {
        let oTOArticulosItems = new TOArticulosItems(itemDataStorage);
        this.aTOArticulosItems.push(oTOArticulosItems);
    }

    getAll(dataStorage?:any) {
        this.aTOArticulosItems = [];  
        if ( dataStorage )      
            this.dataStorage = dataStorage
        for ( let item of this.dataStorage ) 
            this.add(item);
    }

    getATOArticulosItems():TOArticulosItems[] {
        return this.aTOArticulosItems;
    }

    setATOArticulosItems(value:TOArticulosItems[]) {
        this.aTOArticulosItems = value;
    }


    /*--------------------------------------------------------------------
                        Funcionalidad adicional
    ----------------------------------------------------------------------*/
    
}
