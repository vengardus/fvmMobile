import { TOClientes } from './to/TOclientes';
import { TOPedidoCabecera } from './to/TOpedidoCabecera';
import { TOParametros } from './to/TOparametros';

export interface iSession {
    oTOClientes:TOClientes;
    isRuta:string; //'0', '1'
    oTOPedidoCabecera:TOPedidoCabecera;
    oTOParametros:TOParametros;
}