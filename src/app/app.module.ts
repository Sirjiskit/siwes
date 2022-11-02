import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './_components/_global/_ts/_app.component';
import { AppRoutingModule } from './_modules/_app-route.routing';
import { ComponentsModules } from './_modules/_components.modules';
import { ImportsModule } from './_modules/_imports.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './_helpers/_error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ComponentsModules
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ImportsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
