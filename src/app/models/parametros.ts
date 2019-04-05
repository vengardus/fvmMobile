// Generate by @vengardus 2019-03-27 15:03:50.342827

import { TOParametros } from 'src/app/models/to/TOparametros';

export class Parametros{
    private aTOParametros:TOParametros[]=[];
    private dataStorage:any=null;

    constructor ( dataStorage?:any ) {
        if ( dataStorage ) {
            this.dataStorage = dataStorage;
            this.getAll();
        }
    }

    private add(itemDataStorage:any) {
        let oTOParametros = new TOParametros(itemDataStorage);
        this.aTOParametros.push(oTOParametros);
    }

    getAll(dataStorage?:any) {
        this.aTOParametros = [];  
        if ( dataStorage )      
            this.dataStorage = dataStorage
        for ( let item of this.dataStorage ) 
            this.add(item);
    }

    getATOParametros():TOParametros[] {
        return this.aTOParametros;
    }

    setATOParametros(value:TOParametros[]) {
        this.aTOParametros = value;
    }

    insert(oTOParametros:TOParametros) {
        this.aTOParametros.push(oTOParametros);
    }

    



    /*--------------------------------------------------------------------
                        Funcionalidad adicional
    ----------------------------------------------------------------------*/
    remove(id:number):boolean {
        let index = this.aTOParametros.findIndex(oTOParametros => {
            return (true) ;
        })
        if ( index == -1 )
            return false;
        this.aTOParametros.splice(index, 1);
        return true;
    }

    update(oTOParametros:TOParametros):boolean {
        let index = this.aTOParametros.findIndex(item => {
            return (true) ;
        })
        if ( index == -1 )
            return false;
        this.aTOParametros.splice(index, 1, oTOParametros);
        return true;
    }
}
