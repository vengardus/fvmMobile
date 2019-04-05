// Generate by @vengardus 2019-03-24 19:05:50.272818

import { TOTtablas } from 'src/app/models/to/TOttablas';
import { iSelectOptions } from '../class/selectOptions';

export class Ttablas{
    private aTOTtablas:TOTtablas[]=[];
    private dataStorage:any=null;

    constructor ( dataStorage?:any ) {
        if ( dataStorage )
            this.dataStorage = dataStorage;
    }

    private add(itemDataStorage:any) {
        let oTOTtablas = new TOTtablas(itemDataStorage);
        this.aTOTtablas.push(oTOTtablas);
    }

    getAll(dataStorage?:any) {
        this.aTOTtablas = [];  
        if ( dataStorage )      
            this.dataStorage = dataStorage
        for ( let item of this.dataStorage ) 
            this.add(item);
    }

    getATOTtablas():TOTtablas[] {
        return this.aTOTtablas;
    }

    setATOTtablas(value:TOTtablas[]) {
        this.aTOTtablas = value;
    }


    /*--------------------------------------------------------------------
                        Funcionalidad adicional
    ----------------------------------------------------------------------*/
    getTabla(subTabla:string):iSelectOptions[] {
        let aTO = this.getATOTtablas();
        aTO = aTO.filter(oTOTtablas=>{
            if ( oTOTtablas.getTablaCod() == subTabla )
                return true;
            else
                return false;
        });
        console.log('ato', aTO);
        let selectOptions:iSelectOptions[] = [];
        for ( let index in aTO ) {
            console.log('index', aTO[index].getTabla_id());
            let option:iSelectOptions;
            option = {
                id: aTO[index].getTabla_id(),
                value : aTO[index].getDescripcion()
            }
            selectOptions.push(option);
        }
        return selectOptions;
    }
}
