/**
 * desc：json-to-html
 * how to use: <json-to-html [(ngModel)]='your_json || your_obj'></json-to-html>
 */

import {Component, Input, Output, AfterViewInit, OnChanges, EventEmitter, ElementRef} from '@angular/core';
import {CustomInputComponent, customInputAccessor} from '../class/custom-input.class';
import {JsonToHtml} from '../tool/json-to-html.tool';

@Component({
    selector: 'json-to-html',
    template: `
        <div></div>`,
    providers: [customInputAccessor(JsonToHtmlComponent)]
})
export class JsonToHtmlComponent implements AfterViewInit {
    @Input() options: object = {};

    private el;

    private model: any = []; // inner value
    private onChange: (_: any) => void;
    private onTouched: () => void;

    constructor(el: ElementRef) {
        this.el = el;
    }

    ngAfterViewInit() {
        this.setValue(this.model); // update status
    }

    // update value when status changed
    setValue(value: any) {
        if (value) {
            this.el.nativeElement.innerHTML = JsonToHtml(value);
        }
    }

    // Set touched on blur
    onBlur() {
        this.onTouched();
    }

    // Write a new value to the element.
    writeValue(value: string): void {
        if (value) {
            this.model = value;
            this.setValue(value);
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

