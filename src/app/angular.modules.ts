import {MatButtonModule} from '@angular/material/button';
import {NgModule} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [MatButtonModule, MatDatepickerModule, MatRadioModule, MatSelectModule],
  exports: [MatButtonModule, MatDatepickerModule, MatRadioModule, MatSelectModule]
})
export class AngularModule {

}
