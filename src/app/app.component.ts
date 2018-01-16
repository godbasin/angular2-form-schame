import { Component, OnInit } from "@angular/core";
import { ICustomControl } from "./shared/components/dynamic-form/dynamic-form.component";
import { IListFormConfig } from "./shared/components/dynamic-list/dynamic-list.component";

const schameMap = {
  Simple: {
    config: [
      {
        type: "text",
        label: "Name",
        key: "name"
      },
      {
        type: "checkbox",
        label: "Job",
        key: "job",
        options: [
          {
            id: "doctor",
            text: "doctor",
            valid: true
          },
          {
            id: "engineer",
            text: "engineer",
            valid: true
          },
          {
            id: "teacher",
            text: "teacher",
            valid: true
          }
        ]
      }
    ]
  },
  WithValidation: {
    config: [
      {
        validations: [
          {
            type: "required"
          },
          {
            type: "minLength",
            param: 2
          }
        ],
        type: "text",
        label: "Username",
        key: "username"
      },
      {
        validations: [
          {
            type: "email"
          }
        ],
        type: "text",
        label: "Email",
        key: "email"
      }
    ]
  },
  Array: {
    functions: ["add", "delete", "edit"],
    formConfig: [
      {
        validations: [
          {
            type: "required",
            message: "required"
          }
        ],
        type: "text",
        label: "name",
        key: "Name"
      },
      {
        validations: [
          {
            type: "required",
            message: "required"
          }
        ],
        type: "number",
        label: "tel",
        key: "Tel"
      },
      {
        type: "day",
        label: "birthday",
        key: "birthday"
      }
    ]
  },
  "Array List": {
    functions: ["add", "delete", "edit"],
    formConfig: [
      {
        validations: [
          {
            type: "required",
            message: "required"
          }
        ],
        type: "text",
        label: "name",
        key: "Name"
      },
      {
        validations: [
          {
            type: "required",
            message: "required"
          }
        ],
        type: "number",
        label: "tel",
        key: "Tel"
      },
      {
        type: "day",
        label: "birthday",
        key: "birthday"
      }
    ]
  }
};

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  jsonConfig: string = "";
  listConfig: IListFormConfig = {};
  formConfig: ICustomControl[] = [];
  schameType: string = "Simple";
  formModel: any = {};
  listModel: any = [];

  ngOnInit() {
    this.schameType = "Simple";
    this.formConfig = schameMap[this.schameType].config;
    this.jsonConfig = JSON.stringify(schameMap[this.schameType]);
  }

  changeSchame(val) {
    if (["Array List", "Array"].indexOf(this.schameType) > -1) {
      this.listConfig = schameMap[this.schameType];
      this.jsonConfig = JSON.stringify(schameMap[this.schameType]);
    } else {
      this.formConfig = schameMap[this.schameType].config;
      this.jsonConfig = JSON.stringify(schameMap[this.schameType]);
    }
  }

  changeJSON(val) {
    this.formConfig = JSON.parse(this.jsonConfig).config;
  }
}
