# Angular2 Form Schame
Generate forms from JSON schemas using Angular(v2.0+)!

## Demo Time
[Here to experience.](http://p2n7500x0.bkt.clouddn.com/index.html)

## How to use

### About the project
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

``` cmd
# clone code
git clone https://github.com/godbasin/angular2-form-schame.git
cd angular-custom-app

# npm install
npm install -g @angular/cli
npm install
```

# Documentation

## Component Types

### Form Components
**component demo**      
`<dynamic-form [config]="formConfig" [(model)]="formModel" />`      

**formConfig: config[]**      
Config to generate form controls, arrays.      

- `type`: Form Control Type 
  - 'text' | 'number' | 'select' |'select2'
  - 'radio' | 'checkbox' | 'radio-with-input' | 'checkbox-with-input'
  - 'day' | 'hour' | 'minute' | 'upload-image'
  - see [Form Control Types](#form-control-types)
- `label`: control label
- `key`: model key
- `validations?` formbuilder validations
  - `type`: validation type
    - 'required' | 'email' | 'maxLength' | 'minLength' | 'pattern'
  - `param?`: function call with param
  - `message`: error message when not valid
- `options?`: options for select or radio or checkbox etc
  - `id`: value
  - `text`: text
  - `withInput?`: if with input
  - `type?`: input type
    - "text" | "number" | "email"
- `limit?`: upload image limit
- `listConfig?`: config for `<dynamic-list>` control

**formModel**      
Form value.      

**Form Demo**      
![image](http://o905ne85q.bkt.clouddn.com/1516097300%281%29.png)

### Form Array Components
**component demo**     
`<dynamic-array [config]="arrayConfig" [(ngModel)]="arrayModel" />`

**arrayConfig**     
Config to generate form lists.

- `functions`: List functions 
  - ['add', 'edit', 'delete']
- `formConfig`: formConfig, see `<dynamic-form>`

**arrayModel**     
Array list value.

**Array Demo**     
![image](http://o905ne85q.bkt.clouddn.com/%7BE67FE85C-D16A-4153-A287-6C011706975D%7D.png)

### Form List Components
**component demo**     
`<dynamic-list [config]="listConfig" [(ngModel)]="listModel" />`

**listConfig**     
Config to generate form list tables.

- `functions`: List functions 
  - ['add', 'edit', 'delete']
- `formConfig`: formConfig, see `<dynamic-form>`

**listModel**     
Array table value.

**List Demo**     
![image](http://o905ne85q.bkt.clouddn.com/%7BB13663E4-7BAF-4836-9275-2088D760ECF1%7D.png)

## Form Control Types
**By now we support these form control types:**     
- 'text': `<input type="text" />`
- 'number': `<input type="number" />`
- 'select': `<select>`
- 'select2': `<select2>` sealed with [select2](https://select2.github.io/) plugins
- 'radio': `<input type="radio" />` group
- 'radio-with-input': radio group with input
- 'checkbox': `<input type="checkbox" />` group
- 'checkbox-with-input': checkbox group with input
- 'day'| 'hour' | 'minute': date-picker, sealed with [bootstrap-datetimepicker](http://www.bootcss.com/p/bootstrap-datetimepicker/)
- 'upload-image': images upload with certain limits, such as width/height/size/type

### Config of Each Control
**Each control is defined up to these configs:**    
- `type (string)`: control type(`'text'`, `'number'`, `'select'`, `'radio'` and more)
- `label (string)`: label for the control
- `key (string)`: key(to connect the data or model and get value) for the control
- `validations (array)`: formbuilder validations
  - `type (string)`: [Validators](https://angular.io/docs/ts/latest/api/forms/index/Validators-class.html) type(`'required'`, `'email'`, `'maxLength'`, `'minLength'`, `'pattern'` and more)
  - `param`: Validators' function called with param(`maxLength(length)`, `minLength(length)` and more)
- `setOptions (boolean)`: if allowed to set options
- `options`: options for select or radio or checkbox etc.
  - `id (string)`: option value
  - `text (string)`: option text
  - `withInput (boolean)`: if with input
  - `type`: input type(`'text'`, `'number'`, `'email'`)
- `limit`: upload image limit
  - `width (number)`
  - `height (number)`
  - `size (number)`
  - `type? (string)`
