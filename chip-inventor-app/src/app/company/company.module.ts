import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Para formulários

import { CompanyRoutingModule } from './company-routing.module';
// Importações do Angular Material (necessárias para os componentes standalone abaixo)
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select'; // Para selecionar projetistas na equipe
// Importar componentes standalone que são parte deste módulo ou usados aqui
import { ProjetistaListComponent } from './components/projetista-list/projetista-list.component';
import { ProjetistaFormComponent } from './components/projetista-form/projetista-form.component';
import { EquipeListComponent } from './components/equipe-list/equipe-list.component';
import { EquipeFormComponent } from './components/equipe-form/equipe-form.component';
// NÃO importar ConfirmationDialogComponent aqui, pois ele é usado DENTRO dos componentes standalone

@NgModule({
  // declarations: [], // Não há declarações pois os componentes são standalone
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule,
    // Angular Material Modules (podem ser importados aqui ou nos componentes standalone)
    // Mantê-los aqui pode ser redundante se já importados nos componentes, mas não causa erro.
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    // Importar os componentes standalone que fazem parte das rotas deste módulo
    ProjetistaListComponent,
    ProjetistaFormComponent,
    EquipeListComponent,
    EquipeFormComponent
    // NÃO importar ConfirmationDialogComponent aqui
  ]
})
export class CompanyModule { }

