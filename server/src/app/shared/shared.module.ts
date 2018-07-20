import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterInputComponent } from './components/counter.component';
import { ProfilecardComponent } from './profilecard/profilecard.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import {
  DataTableModule, CarouselModule, AccordionModule, SelectButtonModule, CalendarModule , TabViewModule, SharedModule,
  DialogModule, DropdownModule, RatingModule , GalleriaModule, InputSwitchModule, PaginatorModule , ConfirmDialogModule,
  SliderModule, GMapModule,    RadioButtonModule, MultiSelectModule, CheckboxModule, PanelModule, FileUploadModule
} from 'primeng/primeng';
import { Routes, RouterModule } from '@angular/router';

import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularGooglePlaceModule } from 'angular-google-place';

import {PricePipe} from './pipes/currecy.pipe';
import { ProductarrayComponent } from '../pages/product/product-array/product-array.component';
import { ProductsingleComponent } from '../pages/product/product-single/product-single.component';
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    FileUploadModule,
    DropdownModule,
    CheckboxModule,
    RadioButtonModule,
    CalendarModule,
    FileUploadModule,
    MultiSelectModule,
    InputSwitchModule,
    SliderModule,
    CarouselModule,
    PaginatorModule,
    ConfirmDialogModule,
    GMapModule,
    DialogModule,
    ReactiveFormsModule,
    DataTableModule,
    PanelModule,
    TabViewModule,
    RouterModule,
    RatingModule
    // AngularGooglePlaceModule
  ],
  declarations: [
    ProfilecardComponent,
    ProductarrayComponent,
    ProductsingleComponent,
    PricePipe
  ],
  exports: [
    ProfilecardComponent,
    ProductarrayComponent,
    ProductsingleComponent,
    HttpModule,
    FormsModule,
    FileUploadModule,
    DialogModule,
    AccordionModule,
    DropdownModule,
    CheckboxModule,
    RadioButtonModule,
    PaginatorModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    CalendarModule,
    FileUploadModule,
    MultiSelectModule,
    InputSwitchModule,
    SliderModule,
    DataTableModule,
    CarouselModule,
    GalleriaModule,
    RatingModule,
    GMapModule,
    PanelModule,
    TabViewModule,
   AngularGooglePlaceModule, 
   PricePipe
  ]
})
export class SharedModuled { }
