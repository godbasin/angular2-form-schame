/**
 * desc：upload-file
 * how to use: <upload-file [(ngModel)]='your_prop' [multiple]='if_multiple' [limit]='limit_condition' [disabled]='your_condition' [btnName]="btn_name" ></upload-file>
 */
import {Component, Input, OnInit, ElementRef} from '@angular/core';
import {customInputAccessor} from '../custom-input';

export interface IFileLimit {
    size?: number;
    type?: string;
}

@Component({
    selector: 'upload-file',
    templateUrl: './upload-file.component.html',
    providers: [customInputAccessor(UploadFileComponent)]
})
export class UploadFileComponent implements OnInit {
    @Input() disabled: boolean = false;
    @Input() required: boolean = false;
    @Input() limit: IFileLimit = {};
    @Input() btnName: string = 'upload files';
    @Input() multiple: boolean = true;
    @Input() dataType: string = 'DataURL'; // Can be 'DataURL'/'ArrayBuffer'/'BinaryString'/'Text'

    filesArr: any = [];
    help: string = '';
    checkErrArr: any = [];

    private model: string[] = []; // urls array chosen
    private onChange: (_: any) => void;
    private onTouched: () => void;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        // Set help text.
        if (this.required) {
            this.help += 'required. ';
        }
        if (this.limit) {
            if (this.limit.size) {
                this.help = this.help ? this.help + ', <= ' + this.limit.size + 'k' : '<= ' + this.limit.size + 'k';
            }
            if (this.limit.type) {
                this.help = this.help ? this.help + ', type: ' + this.limit.type : 'Type: ' + this.limit.type;
            }
        }
    }

    // when file input change
    upLoad() {
        const me = this;
        this.filesArr = [];
        this.model = [];
        this.checkErrArr = [];
        // Get files.
        const input = this.el.nativeElement.find('input')[0];
        const files = input.files;
        if (files) {
            // Travelsal files.
            Object.keys(files).forEach(index => {
                const file = files[index];
                const regMap = new RegExp(`\.${this.limit.type}$`, 'i');
                const reader: FileReader = new FileReader();

                reader.onload = (e: ProgressEvent) => {
                    const url = reader.result;
                    const name = file.name;
                    const checkErr = [];
                    // If image is not valid, write down the file name and error message.
                    if (this.limit.size && file.size > this.limit.size * 1024) {
                        checkErr.push('File should no more than ' + this.limit.size + ' K. ');
                    }
                    if (this.limit.type && !regMap.test(file.name)) {
                        checkErr.push('File type should be ' + this.limit.type);
                    }
                    if (!checkErr.length) {
                        // If image is valid, push into model array
                        this.filesArr.push({name, url});
                        this.model.push(url);
                        this.onChange(this.model);
                    } else {
                        this.checkErrArr.push({name, checkErr});
                    }
                };
                // reader
                reader[`readAs${me.dataType}`](file);
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
            this.filesArr = this.model.map(url => {
                return {url, name: ''};
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
