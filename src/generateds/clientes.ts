// Generate by @vengardus 2019-03-04 14:45:03.173518

import { TOClientes } from './to/TOclientes';


export class Clientes{
    aTOClientes:TOClientes[]=[];
    oTOClientes:TOClientes;

    constructor ( ){}

    add(item:any) {
        let oTOClientes = new TOClientes(item);
        this.aTOClientes.push(oTOClientes);
        this.oTOClientes = oTOClientes;
    }

    addClientes(items:any) {
        this.setATOClientes([]);
        for ( let item of items ) 
            this.add(item);
    }

    getATOClientes():TOClientes[] {
        return this.aTOClientes;
    }

    setATOClientes(value) {
        this.aTOClientes = value;
    }

    setOTOClientes(oTOClientes:TOClientes) {
        this.oTOClientes = oTOClientes;
    }

    getOTOClientes():TOClientes {
        return this.oTOClientes;
    }
}
