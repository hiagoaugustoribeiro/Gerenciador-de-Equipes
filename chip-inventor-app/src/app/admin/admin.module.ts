import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';

import { EmpresaListComponent } from './components/empresa-list/empresa-list.component';
import { EmpresaFormComponent } from './components/empresa-form/empresa-form.component';


import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    EmpresaListComponent,
    EmpresaFormComponent,
    ConfirmationDialogComponent 
  ]
})
export class AdminModule { }

