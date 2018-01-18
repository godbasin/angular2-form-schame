import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { ICustomControl } from "./components/dynamic-form/dynamic-form.component";
import { IListFormConfig } from "./components/dynamic-list/dynamic-list.component";
import { customInputAccessor } from "./class/custom-input.class";

export interface ISchemaFormConfig extends IListFormConfig {
  schameType: string; // 'form' | 'list' | 'array'
}

@Component({
  selector: "schema-form",
  templateUrl: "./schema-form.component.html",
  providers: [customInputAccessor(SchemaFormComponent)]
})
export class SchemaFormComponent implements OnInit, OnChanges {
  @Input() config: ISchemaFormConfig;
  listConfig: IListFormConfig = {};
  formConfig: ICustomControl[] = [];
  schameType: string = "";
  formModel: any = {};
  listModel: any = [];

  private model: any = {}; // inner value
  private onChange: (_: any) => void;
  private onTouched: () => void;

  ngOnChanges(changes) {
    if ((changes.config && !changes.config.firstChange) || (changes.model && !changes.model.firstChange)) {
      this.changeSchame();
    }
  }

  ngOnInit() {}

  // Update model
  updateModel() {
    const model = this.model
}

  changeSchame() {
    if (["list", "array"].indexOf(this.config.schameType) > -1) {
      this.listConfig = {
        functions: this.config.functions,
        formConfig: this.config.formConfig
      };
      // for enumerable properties
      // clear properties
      Object.keys(this.model).forEach(prop => {
        delete this.model[prop];
      });
      this.model = this.listModel;
      this.onChange(this.model);
    } else if (["form"].indexOf(this.config.schameType) > -1) {
      this.formConfig = this.config.formConfig;
      // for enumerable properties
      // clear properties
      Object.keys(this.model).forEach(prop => {
        delete this.model[prop];
      });
      this.model = this.formModel;
      this.onChange(this.model);
    }
    this.schameType = this.config.schameType;
    this.updateModel();
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
