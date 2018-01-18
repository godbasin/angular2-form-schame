import {Component, Input, OnInit, OnChanges, ElementRef} from '@angular/core';
import {ICustomControl} from '@shared/components/dynamic-form/dynamic-form.component';
import {ObjectCopy, ArrayCopy} from '@shared/tool/object-copy.tool';
import {customInputAccessor} from '../../class/custom-input.class';

export interface IList {
    label: string;                      // List title inner <th></th>
    key: string;                        // List model key.
}

export interface IListConfig {
    functions: string[];                 // ['add', 'edit', 'delete']
    content: IList[];                   // Contents that will show in list.
}

export interface IListFormConfig {
    functions?: string[];                 // ['add', 'edit', 'delete']
    formConfig?: ICustomControl[];
}

@Component({
    selector: 'dynamic-list',
    templateUrl: './dynamic-list.component.html',
    providers: [customInputAccessor(DynamicListComponent)],
})
export class DynamicListComponent implements OnInit, OnChanges {
    @Input() config: IListFormConfig;
    @Input() formModel: any = []; // form default data

    listConfig: IListConfig = {} as any;
    formConfig: ICustomControl[];

    isShown: boolean = false;
    isEdit: number = -1;

    private model: any = []; // inner value
    private onChange: (_: any) => void;
    private onTouched: () => void;
    private el;

    constructor(el:ElementRef) {
        this.el = el;
    }

    ngOnInit() {
        if (!this.config) {
            console.error('<dynamic-list> should input config.');
        }else{
            this.updateConfig();
        }
    }

    ngOnChanges(changes) {
        if (changes.config && !changes.config.firstChange) {
            this.updateConfig();
        }
    }

    // Update config changes
    updateConfig() {
        this.formConfig = this.config.formConfig || [];
        this.listConfig.functions = this.config.functions;
        this.listConfig.content = this.formConfig.map(control => {
            return {
                key: control.key,
                label: control.label
            };
        });
        this.model = [];
    }

    // Check if listConfig has the function.
    hasFunction(fun: string) {
        if (this.listConfig && this.listConfig.functions) {
            return this.listConfig.functions.indexOf(fun) > -1;
        }
        return false;
    }

    // Add or edit one list data.
    edit(index: number) {
        this.isEdit = index;
        if (index > -1) {
            // If edit, deep copy option into formModel.
            this.formModel = ObjectCopy(this.model[index]);
        } else {
            // If add, clear formModel.
            this.formModel = {};
        }
        console.log('edit', this.formModel)
        this.isShown = true;
        $(this.el.nativeElement).find('.modal').modal("show");
    }

    // delete one list data
    delete(index: number) {
        this.model.splice(index, 1);
        this.onChange(this.model);
    }

    // Save changes or new list data.
    save() {
        // Deep copy formModel.
        // If in real internet envirenment, we can request new list data without deepcopy.
        const model = ObjectCopy(this.formModel);
        if (this.isEdit > -1) {
            this.model[this.isEdit] = model;
        } else {
            this.model.push(model);
        }
        this.onChange(this.model);
        this.isShown = false;
        $(this.el.nativeElement).find('.modal').modal("hide");
    }

    // Set touched on blur
    onBlur() {
        this.onTouched();
    }

    // Write a new value to the element.
    writeValue(value: string): void {
        if (value) {
            this.model = value;
        }
    }

    // Set the function to be called when the control receives a change event.
    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    // registerOnTouched(fn: any) : void
    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }
}