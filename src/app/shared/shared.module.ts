import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

// import components
import {
    Select2Component,
    RadioWithTextComponent,
    RadioGroupComponent,
    UploadImageComponent,
    CheckboxGroupComponent,
    CheckboxWithTextComponent,
    DateTimePickerComponent,
    SelectWithInputComponent,
    OnFocusLostDirective // For SelectWithInputComponent
} from './components';

import {DynamicFormComponent} from './components/dynamic-form/dynamic-form.component';
import {DynamicListComponent} from './components/dynamic-list/dynamic-list.component';
import {JSONEditorComponent} from './components/json-editor.component';
import {JsonToHtmlComponent} from './components/json-to-html.component';


@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule
  ],
  declarations: [
    DateTimePickerComponent,
    DynamicFormComponent,
    RadioGroupComponent,
    CheckboxGroupComponent,
    UploadImageComponent,
    CheckboxWithTextComponent,
    RadioWithTextComponent,
    DynamicListComponent,
    Select2Component,
    SelectWithInputComponent,
    JSONEditorComponent,
    JsonToHtmlComponent,

    OnFocusLostDirective
  ],
  exports: [
    DateTimePickerComponent,
    DynamicFormComponent,
    RadioGroupComponent,
    CheckboxGroupComponent,
    UploadImageComponent,
    CheckboxWithTextComponent,
    RadioWithTextComponent,
    DynamicListComponent,
    Select2Component,
    SelectWithInputComponent,
    JSONEditorComponent,
    JsonToHtmlComponent,

    OnFocusLostDirective
  ],
  providers: []
})
export class SharedModule {
}
