// Generate by @vengardus 2019-03-04 19:51:56.129859

import { TOClientes } from 'src/app/models/to/TOclientes';

export class Clientes{
    private aTOClientes:TOClientes[]=[];
    private dataStorage:any=null;

    constructor ( dataStorage?:any ) {
        if ( dataStorage )
            this.dataStorage = dataStorage;
    }

    private add(item:any) {
        let oTOClientes = new TOClientes(item);
        this.aTOClientes.push(oTOClientes);
    }

    getAll(dataStorage?:any) {
        this.aTOClientes = [];  
        if ( dataStorage )      
            this.dataStorage = dataStorage
        for ( let item of this.dataStorage ) 
            this.add(item);
    }

    getATOClientes():TOClientes[] {
        return this.aTOClientes;
    }

    setATOClientes(value:TOClientes[]) {
        this.aTOClientes = value;
    }


    /*--------------------------------------------------------------------
                        Funcionalidad adicional
    ----------------------------------------------------------------------*/
    
}
