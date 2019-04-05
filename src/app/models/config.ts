// Generate by @vengardus 2019-03-15 21:59:26.516414

import { TOConfig } from 'src/app/models/to/TOconfig';

export class Config{
    private aTOConfig:TOConfig[]=[];
    private dataStorage:any=null;

    constructor ( dataStorage?:any ) {
        if ( dataStorage )
            this.dataStorage = dataStorage;
    }

    private add(itemDataStorage:any) {
        let oTOConfig = new TOConfig(itemDataStorage);
        this.aTOConfig.push(oTOConfig);
    }

    getAll(dataStorage?:any) {
        this.aTOConfig = [];  
        if ( dataStorage )      
            this.dataStorage = dataStorage
        for ( let item of this.dataStorage ) 
            this.add(item);
    }

    getATOConfig():TOConfig[] {
        return this.aTOConfig;
    }

    setATOConfig(value:TOConfig[]) {
        this.aTOConfig = value;
    }


    /*--------------------------------------------------------------------
                        Funcionalidad adicional
    ----------------------------------------------------------------------*/
    addTO(oTOConfig:TOConfig) {
        this.aTOConfig.push(oTOConfig);
    }
}
