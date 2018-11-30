import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Category } from "../shared/category.model";
import { CategoryService } from "../shared/category.service";

 import { switchMap } from "rxjs/operators";

 import toastr from "toastr";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string; //diz se está editando ou criando
  categoryForm: FormGroup; //formulário do tipo categoria
  pageTitle: string; //título da página se é criando ou editando
  serverErrorMessages: string[] = null; 
  submittingForm: boolean = false; //ao clicar no botão de enviar vai desabilitar e botão e voltar após o servidor responder
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction(); //editando ou criando
    this.buildCategoryForm(); //constrói o form
    this.loadCategory(); //carrega a categoria caso esteja editando
  }

  ngAfterContentChecked(){
    this.setPageTitle(); //após o carregamento de tudo, pegamos o título da página se está editando ou cadastrando
  }

  // PRIVATE METHODS
  private setCurrentAction() {
    if(this.route.snapshot.url[0].path == "new") //pegamos o primeiro seguimento da url, se for criando será new
      this.currentAction = "new"
    else
      this.currentAction = "edit"
  }

  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private loadCategory() {
    if (this.currentAction == "edit") { //se estiver editando, então pego a categoria pelo id
      
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get("id"))) //esse + transforma para número
      )
      .subscribe(
        (category) => {
          this.category = category;
          this.categoryForm.patchValue(category) // binds loaded category data to CategoryForm. Preenche o form
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      )
    }
  }

  private setPageTitle() {
    if (this.currentAction == 'new')
      this.pageTitle = "Cadastro de Nova Categoria"
    else{
      const categoryName = this.category.name || ""  //quando tentar setar o título da página não vai ter a categoria carregada, por isso ""
      this.pageTitle = "Editando Categoria: " + categoryName;
    }
  }

}
