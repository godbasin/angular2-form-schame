/**
 * desc：select-with-input
 * how to use: <select-with-input [(ngModel)]='your_prop' [options]='your_options' [disabled]='your_condition' ></select-with-input>
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import {customInputAccessor} from '../custom-input';

interface IOption{
    id: string;
    text: string;
}

@Component({
    selector: 'select-with-input',
    templateUrl: './select-with-input.component.html',
    styleUrls: ['./select-with-input.style.css'],
    providers: [customInputAccessor(SelectWithInputComponent)]
})
// ControlValueAccessor: A bridge between a control and a native element.
export class SelectWithInputComponent {
    @Input() options: IOption[] = []; // object: {id, text}
    @Input() disabled: boolean = false;
    @Output() onSelect = new EventEmitter<any>();

    isOpen: boolean = false;

    private model: string = ''; // inner value
    private viewModel: string = ''; // view value
    private onChange: (_: any) => void;
    private onTouched: () => void;

    handleSelect(option: IOption){
        this.viewModel = option.text; // set view value
        this.model = option.id;       // set inner value
        this.onChange(this.model);
        this.onSelect.emit(this.model);
        this.isOpen = false;
    }

    // update inner value when view value change
    updateModel(){
        const value = this.viewModel;
        const option = this.options && this.options.find(x => x.text === value);
        this.model = option ? option.id : value;
        this.onChange(this.model);
        this.onSelect.emit(this.model);
    }

    isSelected(option: IOption){
        return option.text === this.viewModel;
    }

    // Set touched on blur
    onBlur() {
        this.onTouched();
    }

    // Write a new value to the element.
    writeValue(value: string): void {
        if (value) {
            const option = this.options && this.options.find(x => x.id === value);
            this.viewModel = option ? option.text : value; // set view value
            this.model = value;                            // set inner value
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
