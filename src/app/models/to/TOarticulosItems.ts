// Generate by @vengardus 2019-03-08 16:52:40.266134

import { TOArticulos } from 'src/app/models/to/TOarticulos'

export class TOArticulosItems extends TOArticulos{

   private cantidad:number;
   private isSelected:boolean;
   private isSugerido:boolean;

   constructor(itemDataStorage:any
      , cantidad?:number
      , isSelected?:boolean
      , isSugerido?:boolean
   ) {
      super(itemDataStorage);
      if ( cantidad != null )
         this.cantidad = cantidad;
      if ( isSelected != null )
         this.isSelected = isSelected;
      if ( isSugerido != null )
         this.isSugerido = isSugerido;
   }

   getCantidad():number { return this.cantidad; }
   setCantidad(value:number) { this.cantidad = value; }

   getIsSelected():boolean { return this.isSelected; }
   setIsSelected(value:boolean) { this.isSelected = value; }

   getIsSugerido():boolean { return this.isSugerido; }
   setIsSugerido(value:boolean) { this.isSugerido = value; }

}
