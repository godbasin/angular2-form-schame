/**
 * desc：radio-group
 * how to use: <radio-group [(ngModel)]='your_prop' [options]='your_options' [disabled]='your_condition' ></radio-group>
 */

import {Component, Input, Output} from '@angular/core';
import {customInputAccessor, CustomInputComponent} from './custom-input';

@Component({
    selector: 'radio-group',
    template: `
        <span *ngFor="let op of options" class="form-check">
            <input type="radio" [(ngModel)]="value" [name]="value" [disabled]="disabled" [value]="op.id"/>{{op.text}}
        </span>`,
    providers: [customInputAccessor(RadioGroupComponent)]
})
// ControlValueAccessor: A bridge between a control and a native element.
export class RadioGroupComponent extends CustomInputComponent {
    @Input() options: any[] = []; // object: {id, text} or array: []
    @Input() disabled: boolean = false;

    constructor() {
        super();
    }
}
