/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoey, CategoriesService } from '@prayug/products';
import { MessageService,ConfirmationService } from 'primeng/api';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit {
    categories: Categoey[] = [];

    constructor(private messageService: MessageService,
         private categoriesServices: CategoriesService,
         private confirmationService: ConfirmationService,
         private router:Router ){}

    ngOnInit(): void {
       this._getCategories();
    }
    deleteCategory(categoryId: string, event:Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to deleted Category ?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoriesServices.deleteCategory(categoryId).subscribe(
                    (Response) => {
                        this._getCategories();
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is deleted!' });
                    },
                    (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is deleted!' });
                    }
                );    
            },
          
        });
       
    }

    updateCategory(categoryId:string){
this.router.navigateByUrl(`categories/form/${categoryId}`)
    }



    //At  a time delete and refers the page
    private _getCategories(){
        this.categoriesServices.getCategories().subscribe((cats) => {
            this.categories = cats;
        });
    }
}
