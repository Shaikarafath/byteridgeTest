import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';
import { AuditComponent } from './audit';
import { DatePipe } from '@angular/common'

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule, MatSortModule, MatSelectModule,
        appRoutingModule, BrowserAnimationsModule, MatInputModule, MatTableModule, MatPaginatorModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AuditComponent,
        AlertComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };