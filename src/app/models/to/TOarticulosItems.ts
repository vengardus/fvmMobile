// Generate by @vengardus 2019-03-12 22:05:23.844605

import { TOArticulos } from 'src/app/models/to/TOarticulos'

export class TOArticulosItems extends TOArticulos{

   private cantidad:number;
   private isSelected:boolean;
   private isSugerido:boolean;
   private precioFinal:number;
   private subTotal:number;
   private subTotalAfectos:number;
   private subTotalInafectos:number;
   private subTotalIgv:number;
   private subTotalIsc:number;
   private subTotalDscto:number;

   constructor(itemDataStorage:any
      , cantidad?:number
      , isSelected?:boolean
      , isSugerido?:boolean
      , precioFinal?:number
      , subTotal?:number
      , subTotalAfectos?:number
      , subTotalInafectos?:number
      , subTotalIgv?:number
      , subTotalIsc?:number
      , subTotalDscto?:number
   ) {
      super(itemDataStorage);
      if ( cantidad != null )
         this.cantidad = cantidad;
      if ( isSelected != null )
         this.isSelected = isSelected;
      if ( isSugerido != null )
         this.isSugerido = isSugerido;
      if ( precioFinal != null )
         this.precioFinal = precioFinal;
      if ( subTotal != null )
         this.subTotal = subTotal;
      if ( subTotalAfectos != null )
         this.subTotalAfectos = subTotalAfectos;
      if ( subTotalInafectos != null )
         this.subTotalInafectos = subTotalInafectos;
      if ( subTotalIgv != null )
         this.subTotalIgv = subTotalIgv;
      if ( subTotalIsc != null )
         this.subTotalIsc = subTotalIsc;
      if ( subTotalDscto != null )
         this.subTotalDscto = subTotalDscto;
   }

   getCantidad():number { return this.cantidad; }
   setCantidad(value:number) { this.cantidad = value; }

   getIsSelected():boolean { return this.isSelected; }
   setIsSelected(value:boolean) { this.isSelected = value; }

   getIsSugerido():boolean { return this.isSugerido; }
   setIsSugerido(value:boolean) { this.isSugerido = value; }

   getPrecioFinal():number { return this.precioFinal; }
   setPrecioFinal(value:number) { this.precioFinal = value; }

   getSubTotal():number { return this.subTotal; }
   setSubTotal(value:number) { this.subTotal = value; }

   getSubTotalAfectos():number { return this.subTotalAfectos; }
   setSubTotalAfectos(value:number) { this.subTotalAfectos = value; }

   getSubTotalInafectos():number { return this.subTotalInafectos; }
   setSubTotalInafectos(value:number) { this.subTotalInafectos = value; }

   getSubTotalIgv():number { return this.subTotalIgv; }
   setSubTotalIgv(value:number) { this.subTotalIgv = value; }

   getSubTotalIsc():number { return this.subTotalIsc; }
   setSubTotalIsc(value:number) { this.subTotalIsc = value; }

   getSubTotalDscto():number { return this.subTotalDscto; }
   setSubTotalDscto(value:number) { this.subTotalDscto = value; }

}
