import {
  Component,
  Input,
  Output,
  AfterViewInit,
  ElementRef,
  EventEmitter,
  OnChanges
} from "@angular/core";
import { NgModel, ControlValueAccessor } from "@angular/forms";
import {
  customInputAccessor,
  CustomInputComponent
} from "../class/custom-input.class";
import JSONEditor from "jsoneditor/dist/jsoneditor.min.js";
// require('jsoneditor/dist/jsoneditor.min.css');

@Component({
  selector: "json-editor",
  template: `<div id="jsoneditor"></div>`,
  providers: [customInputAccessor(JSONEditorComponent)]
})
export class JSONEditorComponent implements AfterViewInit {
  @Input() options: Object = {};
  @Input() isEdit: boolean = false;
  private model: any; // inner value
  private onChange: (_: any) => void;
  private onTouched: () => void;

  private editor: any;
  private el;

  // update value when status changed
  setValue(model: any) {
    this.model = JSON.stringify(model);
    this.onChange(this.model);
  }

  constructor(el: ElementRef) {
    this.el = el;
  }
  ngAfterViewInit() {
    let options = this.isEdit
      ? {
          mode: "code",
          modes: ["code", "form", "tree", "view"],
          onChange: () => {
            try {
              this.setValue(this.editor.get());
            } catch (e) {}
          },
          onError: err => {
            // 在切换mode的时候会提示
            alert("请输入正确的json格式");
          }
        }
      : {
          mode: "view"
        };
    options = Object.assign(options, this.options);
    this.editor = new JSONEditor(this.el.nativeElement, options);
  }

  // Write a new value to the element.
  writeValue(value: string): void {
    if (this.editor && value !== this.model) {
      if (typeof value == "string") {
        try {
          value = JSON.parse(value);
        } catch (e) {}
      }
      this.editor.set(value);
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
