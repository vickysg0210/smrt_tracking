import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';



import { AppComponent } from './app.component';
import { AppMaterialModules } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppMaterialModules,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
