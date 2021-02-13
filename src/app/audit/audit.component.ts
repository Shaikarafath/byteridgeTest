import { Component, OnInit, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common'
import { first } from 'rxjs/operators';
import { User } from '@/_models';
import { Audit } from '@/_models';
import { AuditService, AuthenticationService } from '@/_services';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
export interface AuditData {
    id: number;
    user: string;
    loginTime: string;
    logoutTime: string;
    ip: string;
}
@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit
{
    audits = [];
    format: any;
    currentUser: User;
    displayedColumns: string[] = ['id', 'user', 'loginTime', 'logoutTime', 'ip'];
    auditdata: MatTableDataSource <AuditData>;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    constructor(
        private authenticationService: AuthenticationService,
        private auditService: AuditService, public datepipe: DatePipe
    )
    {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit()
    {
        this.format = '12';
        this.loadAllAudits();
    }
    private loadAllAudits()
    {
        this.auditService.getAll()
            .subscribe(audits => {
                this.audits = audits;
                for (let i = 0; i < this.audits.length; i++) {
                    this.audits[i].loginTime = this.datepipe.transform(this.audits[i].loginTime, 'dd/MM/yyyy hh:mm:ss a');
                    this.audits[i].logoutTime = this.datepipe.transform(this.audits[i].logoutTime, 'dd/MM/yyyy hh:mm:ss a');
                }
            console.log('this.audits===>', this.audits);
            this.auditdata = new MatTableDataSource(this.audits);
            console.log('this.dataSource===>', this.auditdata);
            this.auditdata.paginator = this.paginator;
            this.auditdata.sort = this.sort;
            });
            
    }
    applyFilter(filterValue: string) {
        this.auditdata.filter = filterValue.trim().toLowerCase();
    
        if (this.auditdata.paginator) {
          this.auditdata.paginator.firstPage();
        }
      }
      formatChange() {
          console.log('this.format', this.format);
          if (this.format == '24') {
            for (let i = 0; i < this.audits.length; i++) {
                this.audits[i].loginTime = this.datepipe.transform(this.audits[i].loginTime, 'dd/MM/yyyy HH:mm:ss');
                this.audits[i].logoutTime = this.datepipe.transform(this.audits[i].logoutTime, 'dd/MM/yyyy HH:mm:ss');
            }
          } else {
            for (let i = 0; i < this.audits.length; i++) {
                this.audits[i].loginTime = this.datepipe.transform(this.audits[i].loginTime, 'dd/MM/yyyy hh:mm:ss a');
                this.audits[i].logoutTime = this.datepipe.transform(this.audits[i].logoutTime, 'dd/MM/yyyy hh:mm:ss a');
            }
          }
      }
}