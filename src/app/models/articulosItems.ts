// Generate by @vengardus 2019-03-08 16:52:45.173502

// OJO: Tiene funcionalidad adicional

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
    getAllArticulos(dataStorageArticulos:any) {
        this.aTOArticulosItems = []; 
        for ( let item of dataStorageArticulos ) 
            this.addArticulo(item, 1, false, false, 0, 0, 0, 0, 0, 0);
    }

    private addArticulo(itemDataStorage:any, 
                        cantidad?:number,
                        isSugerido?:boolean,
                        isSelected?:boolean,
                        subTotal?:number,
                        subTotalIgv?:number,
                        subTotalIsc?:number,
                        subTotalDscto?:number,
                        subTotalAfectos?:number,
                        subTotalInafectos?:number) {
        let oTOArticulosItems = new TOArticulosItems(itemDataStorage, cantidad, isSelected, isSugerido, subTotal, subTotalIgv, subTotalIsc, subTotalDscto, subTotalAfectos, subTotalInafectos);
        this.aTOArticulosItems.push(oTOArticulosItems);
    }

    public filterItem(searchValue:string, oTOArticulosItems:TOArticulosItems) {
        if (   !searchValue.length 
            || oTOArticulosItems.getDescripcion().toUpperCase().indexOf(searchValue.toUpperCase()) > -1
            || oTOArticulosItems.getCodigo().toUpperCase().indexOf(searchValue.toUpperCase()) > -1
        )
            return true;
        return false;
    }

    public updateCantidad(isAdd:boolean, oTOArticulosItems:TOArticulosItems) {
        let cantidad = oTOArticulosItems.getCantidad();
        if ( isAdd )
            cantidad++;
        else if (cantidad > 0 )
            cantidad--;
        oTOArticulosItems.setCantidad(cantidad);
    }

    public getPrecioUnitario(oTOArticulosItems:TOArticulosItems):string {
        return oTOArticulosItems.getPrecioUnitario().toFixed(2);
    }

    filterBySearch(searchValue:string, tabButton_id:number):TOArticulosItems[] {
        // tabButton_id: 0=todos articulos, 1=sugeridos, 2=carrito
        let aTOArticulosItemsFiltered = this.aTOArticulosItems;
        if ( !(! searchValue.trim().length && tabButton_id == 0 ) ) {
            console.log('filter');
            aTOArticulosItemsFiltered = aTOArticulosItemsFiltered.filter(oTOArticulosItems=>{
                if ( !searchValue.length ) {
                    if ( tabButton_id == 0
                        ||  ( tabButton_id == 1 && oTOArticulosItems.getIsSugerido() )
                        ||  ( tabButton_id == 2 && oTOArticulosItems.getIsSelected() )
                    )
                        return true;
                    else
                        return false;
                }
                else {
                    if ( (      tabButton_id == 0
                            ||  ( tabButton_id == 1 && oTOArticulosItems.getIsSugerido() )
                            ||  ( tabButton_id == 2 && oTOArticulosItems.getIsSelected() )
                        )
                        && (    oTOArticulosItems.getDescripcion().toUpperCase().indexOf(searchValue.toUpperCase()) > -1
                            ||  oTOArticulosItems.getCodigo().toUpperCase().indexOf(searchValue.toUpperCase()) > -1
                        )
                    )
                        return true;
                        else
                        return false;
                }
            })
        }
        console.log('sale fiktro');
        return aTOArticulosItemsFiltered;
    }
}
