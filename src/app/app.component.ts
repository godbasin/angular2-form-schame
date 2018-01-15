import { Component, OnInit } from '@angular/core';
import {ICustomControl} from './shared/components/dynamic-form/dynamic-form.component'

const schameMap = {
  'Simple': {
    'config': [{
      "type":"text",
      "label":"Name",
      "key":"name"
  },{
      "type":"checkbox",
      "label":"Job",
      "key":"job",
      "options":[{
          "id":"doctor",
          "text":"doctor",
          "valid":true
      },{
          "id":"engineer",
          "text":"engineer",
          "valid":true
      },{
          "id":"teacher",
          "text":"teacher",
          "valid":true
      }]
  }]
  },'WithValidation': {
    'config': [{
      "validations":[{
          "type":"required",
          "message":"required"
      },{
          "type":"minLength",
          "param":2,
          "message":"minLength: 2"
      }],
      "type":"text",
      "label":"Name",
      "key":"name"
  },{
      "validations":[{
          "type":"email",
          "message":"email"
      }],
      "type":"text",
      "label":"Email",
      "key":"email"
  }]
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  jsonConfig: string = '';
  formConfig: ICustomControl[] = [];
  schameType: string = 'Simple';

  ngOnInit(){
    this.schameType = 'Simple';
    this.formConfig = schameMap[this.schameType].config;
    this.jsonConfig = JSON.stringify(schameMap[this.schameType]);
    console.log('this.jsonConfig', this.jsonConfig)
  }

  changeSchame(val){
    this.formConfig = schameMap[this.schameType].config;
    this.jsonConfig = JSON.stringify(schameMap[this.schameType]);
  }

  changeJSON(val){
    this.formConfig = JSON.parse(this.jsonConfig).config;
  }
}
