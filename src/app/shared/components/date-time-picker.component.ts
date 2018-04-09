/**
 * desc：date-time-picker
 * how to use: <date-time-picker [(ngModel)]='your_prop' accuracy='hour' ></date-time-picker>
 */
declare var require: any;
const $ = require("jquery");
require("../../../assets/datetimepicker/bootstrap-datetimepicker.js");

// if need chinese
// require('./assets/datetimepicker/bootstrap-datetimepicker.zh-CN.js');

import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  EventEmitter,
  Output,
  ViewEncapsulation
} from "@angular/core";
import { CustomInputComponent, customInputAccessor } from "./custom-input";

(function() {
  // Format Date into string.
  // month(M)、day(d)、hour(h)、minute(m)、second(s)、quarterly(q) , 1 or 2 character，
  // Samples：
  // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
  // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
  (Date as any).prototype.format = function(fmt) {
    // author: meizz
    const o = {
      "M+": this.getMonth() + 1, // Month
      "d+": this.getDate(), // Day
      "h+": this.getHours(), // Hour
      "m+": this.getMinutes(), // Minute
      "s+": this.getSeconds(), // Second
      "q+": Math.floor((this.getMonth() + 3) / 3), // Quarterly
      S: this.getMilliseconds() // Millisecond
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (const k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return fmt;
  };
})();

declare interface IDate extends Date {
  format: (fmt: any) => string;
}

@Component({
  selector: "date-time-picker",
  template: `<input type="text" class="form-control" [disabled]="disabled" [(ngModel)]="viewValue" (blur)="onBlur()" />`,
  styleUrls: ["../../../assets/datetimepicker/bootstrap-datetimepicker.css"],
  encapsulation: ViewEncapsulation.None,
  providers: [customInputAccessor(DateTimePickerComponent)]
})
// ControlValueAccessor: A bridge between a control and a native element.
export class DateTimePickerComponent implements AfterViewInit {
  @Input() accuracy: string; // accuracy of date-time pick. [min(default) | hour | day]
  @Input() startDate: string; // date range: start date
  @Input() endDate: string; // date range: end date
  @Input() maxView: string; // max view
  @Input() minView: string; // min view
  @Input() disabled: boolean = false; // isDisabled
  @Input() useTimestamp: boolean = false; // if use timestamp

  @Output() onSelect = new EventEmitter<any>(); // change event callback of input

  public viewValue: string = "";
  private el; // element
  model: any; // inner value
  private onChange: (_: any) => void;
  private onTouched: () => void;
  private formatStr: string = "yyyy-MM-dd hh:mm:ss";

  constructor(el: ElementRef) {
    this.el = el;
  }

  // Lifecycle hook that is called after a component's view has been fully initialized.
  ngAfterViewInit() {
    /*
     source:http://www.bootcss.com/p/bootstrap-datetimepicker/
     minView: default 2
     maxView: default 4
     0 or 'hour' for the hour view （hour view）
     1 or 'day' for the day view 0-24h （day view）
     2 or 'month' for month view (the default) （month view）
     3 or 'year' for the 12-month overview （year view）
     4 or 'decade' for the 10-year overview. Useful for date-of-birth datetimepickers. （decade view）
     */
    let format = "yyyy-mm-dd hh:ii:00"; // default accuracy: minute. datetimepicker do not support second accuracy.
    let minView = 0; // default min view: hour view

    if (this.accuracy === "hour") {
      format = "yyyy-mm-dd hh:00:00"; // hour accuracy: both minute and second is 00
      minView = 1; // min view: day view
    } else if (this.accuracy === "day") {
      format = "yyyy-mm-dd"; // day accuracy
      minView = 2; // min view: month view
    }

    $(this.el.nativeElement)
      .find("input")
      .datetimepicker({
        // if need chinese
        // language: 'zh-CN',
        autoclose: true, // autoclose after date-time picked
        maxView: parseInt(this.maxView, 10) || 4, // max view (default: decade view)
        startDate: this.startDate || "", // date range: start date.
        endDate: this.endDate || "", // date range: end date.
        format, // output format
        minView: parseInt(this.minView, 10) || minView || 0 // min view (default: hour view)
      })
      .on("hide", ev => {
        this.viewValue = $(ev.target).val(); // set value. (calling onChange())
        // If use timestamp, change string into timestamp.
        //
        this.model = this.useTimestamp
          ? Date.parse(this.viewValue) / 1000
          : this.viewValue;
        this.onChange(this.model);
        this.onSelect.emit({ timestamp: this.model, text: this.viewValue }); // change event callback of input
      });
  }

  // Set touched on blur
  onBlur() {
    this.onTouched();
  }

  // Write a new value to the element.
  writeValue(value: string): void {
    if (value && value !== this.model) {
      this.model = value;
      const vd = new Date(+value * 1000); // multiply 1000 for server timestamp
      this.viewValue = this.useTimestamp
      ? (vd as IDate).format(this.formatStr) : value;
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
