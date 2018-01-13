import {Component, Input, Output, EventEmitter, OnInit, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ILimit} from 'angular-form-components/src/upload-image/upload-image.component';
import { IListFormConfig } from '@shared/components/dynamic-list/dynamic-list.component';
import {validate} from '../../tool/validate.tool';

export interface IValidations {
    type: string;                       // 'required' | 'email' | 'maxLength' | 'minLength' | 'pattern'
    param?: any;                        // function call with param
    message: string;                    // error message when not valid
}

export interface IOptions {
    id: string;                         // value
    text: string;                       // text
    withInput?: boolean;                // if with input
    type?: 'text' | 'number' | 'email'; // input type
}

export interface ICustomControl {
    type: string;                      // 'text' | 'number' | 'select' |'select2' |
                                       // 'radio' | 'checkbox' | 'radio-with-input' | 'checkbox-with-input' |
                                       // 'date' | 'date-time' | 'date-hour' | 'upload-image' | 'hidden-when-dialog'
    label: string;                     // control label
    key: string;                       // model key
    validations?: IValidations[];      // formbuilder validations
    options?: IOptions[];              // options for select or radio or checkbox etc.
    limit?: ILimit;                    // upload image limit
    listConfig?: IListFormConfig;      // config for dynamic-list control
}

@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnInit, OnChanges {
    @Input() config: ICustomControl[] = [];
    @Input() model: any = {};
    dynamicForm: FormGroup;
    customGroup: any = {};

    formErrors = {};
    validationMessages = {};

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.updateConfig();
    }

    ngOnChanges(changes) {
        if (changes.config && !changes.config.firstChange) {
            this.updateConfig();
        }
    }

    updateConfig(){
        // Set messages for validations.
        this.customGroup = []
        this.config.forEach((control: ICustomControl, i) => {
            this.formErrors[control.key] = '';
            this.validationMessages[control.key] = {};
            const validations = [];
            // Because FormBuilder still validate it even the element displays none.
            if (control.validations) {
                control.validations.forEach((valid: IValidations) => {
                    // Set error message. (control.errors is lowercase)
                    this.validationMessages[control.key][valid.type.toLowerCase()] = valid.message;
                    if (valid['param']) {
                        // Call as funtion when it has param.
                        validations.push(Validators[valid.type](valid.param));
                    } else {
                        validations.push(Validators[valid.type]);
                    }
                });
            }
            // Set validation with default value. (this.model[control.key])
            this.customGroup[control.key] = [this.model[control.key], validations];
            console.log('updateConfig', this.customGroup)
        });
        this.createForm();
    }

    createForm() {
        // Register multiple FormControl into one parent of FormGroup.
        this.dynamicForm = this.fb.group(this.customGroup);
        this.dynamicForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (Re)set validation messages now.
    }

    onValueChanged(data?: any) {
        if (!this.dynamicForm) {
            return;
        }
        console.log('onValueChanged', this.dynamicForm)
        const form = this.dynamicForm;
        for (const field in this.formErrors) {
            if (field) {
                // Clear previous error message (if any)
                this.formErrors[field] = '';
                const control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        if (key) {
                            this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }

        }
        // Use Object.assign() without changing the link.
        this.model = Object.assign(this.model, {...this.dynamicForm.value}, {valid: this.dynamicForm.valid});
    }

    // Get option's Type for control's type.
    optionsType(type: string) {
        switch (type) {
            case 'select':
            case 'radio':
            case 'checkbox':
                return 'withOption';
            case 'radio-with-input':
            case 'checkbox-with-input':
                return 'withInput';
            default:
                return '';
        }
    }
}