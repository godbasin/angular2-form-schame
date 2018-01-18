import { Component, OnInit } from "@angular/core";
import { ICustomControl } from "./shared/components/dynamic-form/dynamic-form.component";
import { IListFormConfig } from "./shared/components/dynamic-list/dynamic-list.component";
import {schameMap} from './schameMap';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  config: string = "";
  schameType: string = "AllFormComponents";
  jsonConfig: string = "";
  model: any;
  modelResult: any;

  ngOnInit() {
    this.schameType = "AllFormComponents";
    this.changeSchame();
  }

  changeSchame() {
    this.config = schameMap[this.schameType].config;
    this.jsonConfig = JSON.stringify(schameMap[this.schameType].config);
  }

  changeJSON() {
    this.config = JSON.parse(this.jsonConfig);
  }

  changeModel(){
    this.modelResult = this.model;
  }
}
