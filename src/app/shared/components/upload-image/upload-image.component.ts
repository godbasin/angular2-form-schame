/**
 * desc：upload-image
 * how to use:
 * <upload-image [(ngModel)]='your_prop' [multiple]='if_multiple' [limit]='limit_condition' [disabled]='your_condition'
 *  [btnName]="btn_name" ></upload-image>
 */
import { Component, Input, OnInit, ElementRef } from "@angular/core";
import { customInputAccessor } from "../custom-input";

export interface ILimit {
  width?: number;
  height?: number;
  size?: number;
  type?: string;
}

@Component({
  selector: "upload-image",
  templateUrl: "./upload-image.component.html",
  styles: [
    `.btn-file {
        position: relative;
        overflow: hidden;
    }
    .btn-file input[type="file"] {
        position: absolute;
        top: 0;
        right: 0;
        min-width: 100%;
        min-height: 100%;
        font-size: 100px;
        text-align: right;
        filter: alpha(opacity=0);
        opacity: 0;
        outline: none;
        background: #fff;
        cursor: inherit;
        display: block;
    }
    .upload-image-show {
        width: 200px;
        height: 100px;
        border: dashed 2px #ccc;
    }
    .img-contain {
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
    }
    `
  ],
  providers: [customInputAccessor(UploadImageComponent)]
})
export class UploadImageComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() limit: ILimit = {};
  @Input() btnName: string = "upload images";
  @Input() multiple: boolean = true;

  imagesArr: any = [];
  help: string = "";
  checkErrArr: any = [];

  model: string[] = []; // urls array chosen
  private onChange: (_: any) => void;
  private onTouched: () => void;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Set help text.
    if (this.required) {
      this.help += "required. ";
    }
    if (this.limit) {
      if (this.limit.width && this.limit.height) {
        this.help +=
          "Image size: " + this.limit.width + "*" + this.limit.height;
      }
      if (this.limit.size) {
        this.help = this.help
          ? this.help + ", <= " + this.limit.size + "k"
          : "<= " + this.limit.size + "k";
      }
      if (this.limit.type) {
        this.help = this.help
          ? this.help + ", type: " + this.limit.type
          : "Type: " + this.limit.type;
      }
    }
  }

  // when file input change
  upLoad() {
    this.imagesArr = [];
    this.model = [];
    this.checkErrArr = [];
    // Get files.
    const input = $(this.el.nativeElement).find("input")[0];
    const files = input.files;
    if (files) {
      // Travelsal files.
      Object.keys(files).forEach(index => {
        const file = files[index];
        const regMap = {
          jpg: /\.(jpe?g)$/i,
          jpeg: /\.(jpe?g)$/i,
          png: /\.(png)$/i,
          gif: /\.(gif)$/i
        };
        const reader: FileReader = new FileReader();

        reader.onload = (e: ProgressEvent) => {
          const image = new Image();
          const url = reader.result;
          const name = file.name;
          const checkErr = [];
          image.onload = ev => {
            // If image is not valid, write down the file name and error message.
            if (this.limit.size && file.size > this.limit.size * 1024) {
              checkErr.push(
                "Image should no more than " + this.limit.size + " K. "
              );
            }
            if (
              (this.limit.width && image.width > this.limit.width) ||
              (this.limit.height && image.height > this.limit.height)
            ) {
              checkErr.push(
                "Image size should be inner " +
                  (this.limit.width
                    ? "width: " + this.limit.width + ". "
                    : "") +
                  (this.limit.height
                    ? " height: " + this.limit.height + ". "
                    : "")
              );
            }
            if (
              this.limit.type &&
              regMap[this.limit.type] &&
              !regMap[this.limit.type].test(file.name)
            ) {
              checkErr.push("Image type should be " + this.limit.type);
            }
            if (!checkErr.length) {
              // If image is valid, push into model array
              this.imagesArr.push({ name, url });
              this.model.push(url);
              this.onChange(this.model);
            } else {
              this.checkErrArr.push({ name, checkErr });
            }
          };
          image.src = url;
        };
        reader.readAsDataURL(file);
      });
    }
  }

  // Set touched on blur
  onBlur() {
    this.onTouched();
  }

  // Write a new value to the element.
  writeValue(value: string[]): void {
    if (value && value.length) {
      this.model = value;
      this.imagesArr = this.model.map(url => {
        return { url, name: "" };
      });
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
