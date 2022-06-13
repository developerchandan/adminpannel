/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoey, CategoriesService } from '@prayug/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent implements OnInit {
    form!: FormGroup;
    isSubmitted: boolean = false;
    editmode = false;
    currentCategoryId!: string;

    constructor(
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private categoriesServices: CategoriesService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            icon: ['', Validators.required],
            color: ['#0000'],
            desc:['']
        });
        this._checkEditMode();
    }
    onSubmit() {
        this.isSubmitted = true;

        if (this.form.invalid) {
            return;
        }
        const category: Categoey = {
            id: this.currentCategoryId,
            name: this.categoryForm['name'].value,
            icon: this.categoryForm['icon'].value,
            color: this.categoryForm['color'].value,
            desc:this.categoryForm['desc'].value
        };
        if (this.editmode) {
            this._updateCategory(category);
        } else {
            this._addCategory(category);
        }
    }

    private _addCategory(category: Categoey) {
        this.categoriesServices.createCategory(category).subscribe(
            (category:Categoey) => {
                this.messageService.add({ 
                    severity: 'success', 
                    summary: 'Success', 
                    detail: `Category ${category.name} is created!` });
            },
            (error) => {
                this.messageService.add({ 
                    severity: 'error', 
                    summary: 'Error', 
                    detail: 'Category is not created!' });
            }
        );
        timer(2000)
            .toPromise()
            .then((done) => {
                this.location.back();
            });
        // console.log(this.categoryForm['name'].value);
        // console.log(this.categoryForm['icon'].value);
    }
    private _updateCategory(category: Categoey) {
        this.categoriesServices.updateCategory(category).subscribe(
            (Response) => {
                this.messageService.add({ 
                    severity: 'success', 
                    summary: 'Success', 
                    detail: 'Category is Updated!' });
            },
            (error) => {
                this.messageService.add({ 
                    severity: 'error', 
                    summary: 'Error', 
                    detail: 'Category is not Updated!' });
            }
        );
        timer(2000)
            .toPromise()
            .then((done) => {
                this.location.back();
            });
        // console.log(this.categoryForm['name'].value);
        // console.log(this.categoryForm['icon'].value);
    }

    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.editmode = true;
                this.currentCategoryId = params['id'];
                this.categoriesServices.getCategory(params['id']).subscribe((category) => {
                    this.categoryForm['name'].setValue(category.name);
                    this.categoryForm['icon'].setValue(category.icon);
                    this.categoryForm['color'].setValue(category.color);
                    this.categoryForm['desc'].setValue(category.desc);
                });
            }
        });
    }
    get categoryForm() {
        return this.form.controls;
    }
}
