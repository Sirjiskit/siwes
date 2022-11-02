import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgxUploaderModule } from 'ngx-uploader';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxMasonryModule } from 'ngx-masonry';
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    FilterPipeModule,
    NgxUploaderModule,
    NgxSelectModule,
    NgHttpLoaderModule.forRoot(),
    NgxMasonryModule
  ],
  exports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    FilterPipeModule,
    NgxUploaderModule,
    NgxSelectModule,
    NgHttpLoaderModule,
    NgxMasonryModule
  ],
  declarations: []
})
export class ImportsModule { }
