import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConverterComponent } from './converter/converter.component';
import { ConvertService } from './shared/services/ConvertService';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { UriInterceptor } from './shared/interceptor/uri.interceptor'; 

@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UriInterceptor, multi: true },
    ConvertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
