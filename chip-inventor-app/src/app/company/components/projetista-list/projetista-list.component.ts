import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { Router, RouterModule } from '@angular/router'; 
import { Projetista } from '../../../shared/models/projetista.model';
import { MockDataService } from '../../../shared/services/mock-data.service';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { CommonModule } from '@angular/common'; 
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-projetista-list',
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
  templateUrl: './projetista-list.component.html',
  styleUrls: ['./projetista-list.component.css']
})
export class ProjetistaListComponent implements OnInit {
  projetistas$!: Observable<Projetista[]>;
  empresaIdLogada = 1;
  displayedColumns: string[] = ['id', 'nome', 'email', 'cargo', 'acoes'];

  constructor(
    private mockDataService: MockDataService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.projetistas$ = this.mockDataService.getProjetistas();
  }

  editarProjetista(projetista: Projetista): void {
    this.router.navigate(['/company/projetistas/editar', projetista.id]);
  }

  excluirProjetista(projetista: Projetista): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Confirmar Exclusão', message: `Tem certeza que deseja excluir o projetista "${projetista.nome}"?` }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.mockDataService.deleteProjetista(projetista.id).subscribe(() => {
          console.log('Projetista excluído:', projetista.id);
        });
      }
    });
  }

  novoProjetista(): void {
    this.router.navigate(['/company/projetistas/novo']);
  }
}

