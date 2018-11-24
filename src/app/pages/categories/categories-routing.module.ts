import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';

const routes: Routes = [
  { path: '', component: CategoryListComponent },
  { path: 'new', component: CategoryFormComponent},
  { path: ':id/edit', component: CategoryFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)], //gerando as rotas
  exports: [RouterModule] //exportando as rotas e configurações para os componentes de categoria
})
export class CategoriesRoutingModule { }
