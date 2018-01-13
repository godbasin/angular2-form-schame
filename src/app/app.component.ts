import { Component, OnInit } from '@angular/core';
import {ICustomControl} from './shared/components/dynamic-form/dynamic-form.component'

const schameMap = {
  'Simple': {
    'config': [{"type":"text","label":"Name","key":"name"}]
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
      console.log('changeSchame', {val})
  }

  changeJSON(val){
    this.formConfig = JSON.parse(this.jsonConfig).config;
  }
}
