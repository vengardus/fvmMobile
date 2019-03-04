import { TOCatalogos } from './to/TOcatalogos';


export class Catalogos{
    aTOCatalogos:TOCatalogos[]=[];
    oTOCatalogos:TOCatalogos;

    constructor ( ){}

    add(item:any) {
        let oTOCatalogos = new TOCatalogos(item);
        this.aTOCatalogos.push(oTOCatalogos);
        this.oTOCatalogos = oTOCatalogos;
    }

    addCatalogos(items:any) {
        this.setATOCatalogos([]);
        for ( let item of items ) 
            this.add(item);
    }

    getATOCatalogos():TOCatalogos[] {
        return this.aTOCatalogos;
    }

    setATOCatalogos(value) {
        this.aTOCatalogos = value;
    }

    setOTOCatalogos(oTOCatalogos:TOCatalogos) {
        this.oTOCatalogos = oTOCatalogos;
    }

    getOTOCatalogos():TOCatalogos {
        return this.oTOCatalogos;
    }
}
