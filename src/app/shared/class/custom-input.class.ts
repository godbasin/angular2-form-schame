import { forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export function customInputAccessor(component) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => component), // forwardRef. Allows to refer to references which are not yet defined.
    multi: true
  };
}
// A ControlValueAccessor abstracts the operations of writing a new value to a DOM element representing an input control.
// A bridge between a control and a native element.
// See https://angular.io/docs/ts/latest/api/forms/index/ControlValueAccessor-interface.html
export class CustomInputComponent implements ControlValueAccessor {
  model: any; // inner value
  private onChange: (_: any) => void;
  private onTouched: () => void;

  // get accessor
  get value(): any {
    console.log("get value", this.model);
    return this.model;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.model) {
      this.model = v;
      console.log("set value", { v });
      this.onChange(v);
    }
  }

  // Set touched on blur
  onBlur() {
    this.onTouched();
  }

  // Write a new value to the element.
  writeValue(value: string): void {
    console.log("writeValue", { value });
    if (value !== this.model) {
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
