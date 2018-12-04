import { Category } from "../../categories/shared/category.model";
 export class Entry {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public type?: string, //receita ou despesa
    public amount?: string, //quantia
    public date?: string,
    public paid?: boolean,
    public categoryId?: number, //relacionamento com categoria
    public category?: Category
  ){ }
   static types = {
    expense: 'Despesa',
    renevue: 'Receita'
  };
   get paidText(): string {
    return this.paid ? 'Pago' : 'Pedente';
  }
} 