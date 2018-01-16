/**
 * desc：checkbox-with-input
 * how to use: <checkbox-with-input [(ngModel)]='your_prop' [options]='your_options' [disabled]='your_condition' ></checkbox-with-input>
 */

import { Component, Input, OnInit } from "@angular/core";
import { customInputAccessor, IOptions } from "./custom-input";

@Component({
  selector: "checkbox-with-input",
  template: `
        <label class="checkbox-inline" *ngFor="let op of options">
            <input type="checkbox" [checked]="model[op.id] && model[op.id].checked"
                   (click)="setValue(op)"  [style.marginTop]="op.withInput ? '12px': '4px'"
                   [disabled]="disabled" [value]="op.id"/>{{op.text}}
            <input *ngIf="op.withInput" class="form-control form-inline-input"
                   [type]="op.type || 'text'" [disabled]="!(model[op.id] && model[op.id].checked)" [(ngModel)]="model[op.id].value"/>
        </label>`,
  styles: [
    `
    .form-inline-input {
        width: 100px;
        display: inline-block;
    }
    `
  ],
  providers: [customInputAccessor(CheckboxWithTextComponent)]
})
export class CheckboxWithTextComponent implements OnInit {
  @Input() options: IOptions[] = []; // object: {id, text} or array: []
  @Input() disabled: boolean = false;

  private model: any = {}; // inner value
  private onChange: (_: any) => void;
  private onTouched: () => void;

  ngOnInit() {
    // options status init
    this.options.forEach(op => {
      this.model[op.id] = {
        checked: false
      };
      if (op.withInput) {
        this.model[op.id].value = null;
      }
    });
  }

  // update value when status changed
  setValue(op: any) {
    const isChecked = !this.model[op.id].checked;
    this.model[op.id].checked = isChecked;
    this.onChange(this.model);
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
