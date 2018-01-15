/**
 * desc：checkbox-group
 * how to use: <checkbox-group [(ngModel)]='your_prop' [options]='your_options' [disabled]='your_condition' ></checkbox-group>
 */

import {Component, Input} from '@angular/core';
import {customInputAccessor, IOptions} from './custom-input';

@Component({
    selector: 'checkbox-group',
    template: `
        <label class="checkbox-inline" *ngFor="let op of options">
            <input type="checkbox" [checked]="model.indexOf(op.id) > -1" (click)="setValue(op)"
                   [disabled]="disabled" [value]="op.id"/>{{op.text}}
        </label>`,
    providers: [customInputAccessor(CheckboxGroupComponent)]
})
// ControlValueAccessor: A bridge between a control and a native element.
export class CheckboxGroupComponent {
    @Input() options: IOptions[] = []; // object: {id, text} or array: []
    @Input() disabled: boolean = false;

    private model: any = []; // inner value
    private onChange: (_: any) => void;
    private onTouched: () => void;

    // update value when status changed
    setValue(option: any) {
        const {id} = option;
        const index = this.model.indexOf(id);
        if (index > -1) {
            this.model.splice(index, 1);
            this.onChange(this.model);
        } else {
            this.model.push(id);
            this.onChange(this.model);
        }
    }

    // Set touched on blur
    onBlur() {
        this.onTouched();
    }

    // Write a new value to the element.
    writeValue(value: string): void {
        if (value && value.length) {
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
