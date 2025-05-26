import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Empresa } from '../../../shared/models/empresa.model';
import { MockDataService } from '../../../shared/services/mock-data.service';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { CommonModule } from '@angular/common'; 
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-empresa-list',
  standalone: true, 
  imports: [ 
    CommonModule,
    RouterModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    ConfirmationDialogComponent 
  ],
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css']
})
export class EmpresaListComponent implements OnInit {
  empresas$!: Observable<Empresa[]>;
  displayedColumns: string[] = ['id', 'nome', 'cnpj', 'acoes'];

  constructor(
    private mockDataService: MockDataService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.empresas$ = this.mockDataService.getEmpresas();
  }

  editarEmpresa(empresa: Empresa): void {
    this.router.navigate(['/admin/editar', empresa.id]);
  }

  excluirEmpresa(empresa: Empresa): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Confirmar Exclusão', message: `Tem certeza que deseja excluir a empresa "${empresa.nome}"?` }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.mockDataService.deleteEmpresa(empresa.id).subscribe(() => {
          console.log('Empresa excluída:', empresa.id);
          
          this.empresas$ = this.mockDataService.getEmpresas(); 
        });
      }
    });
  }

  novaEmpresa(): void {
    this.router.navigate(['/admin/nova']);
  }
}

