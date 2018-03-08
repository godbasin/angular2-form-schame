import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { ICustomControl } from "@shared/components/dynamic-form/dynamic-form.component";
import { ObjectCopy, ArrayCopy } from "@shared/tool/object-copy.tool";
import { customInputAccessor } from "../../class/custom-input.class";

export interface IList {
  label: string; // List title inner <th></th>
  key: string; // List model key.
}

export interface IListConfig {
  functions: string[]; // ['add', 'edit', 'delete']
  content: IList[]; // Contents that will show in list.
}

export interface IListFormConfig {
  functions: string[]; // ['add', 'edit', 'delete']
  formConfig: ICustomControl[];
}

@Component({
  selector: "dynamic-array",
  templateUrl: "./dynamic-array.component.html",
  providers: [customInputAccessor(DynamicArrayComponent)]
})
export class DynamicArrayComponent implements OnInit, OnChanges {
  @Input() config: IListFormConfig;
  @Input() formModel: any = []; // form default data

  listConfig: IListConfig = {} as any;
  formConfig: ICustomControl[];

  isShown: boolean = false;
  isEdit: number = -1;

  model: any = []; // inner value
  private onChange: (_: any) => void;
  private onTouched: () => void;

  ngOnInit() {
    if (!this.config) {
      console.error("<dynamic-array> should input config.");
    } else {
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
    this.listConfig.content = this.formConfig.map((control, i) => {
      return {
        key: control.key,
        label: control.label
      };
    });
    console.log("updateConfig", this.listConfig.content);
    this.model = [];
  }

  // Check if listConfig has the function.
  hasFunction(fun: string) {
    if (this.listConfig && this.listConfig.functions) {
      return this.listConfig.functions.indexOf(fun) > -1;
    }
    return false;
  }

  // add one list data
  add() {
    const model = {};
    this.model.push(model);
    this.onChange(this.model);
  }

  // delete one list data
  delete(index: number) {
    this.model.splice(index, 1);
    this.onChange(this.model);
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
