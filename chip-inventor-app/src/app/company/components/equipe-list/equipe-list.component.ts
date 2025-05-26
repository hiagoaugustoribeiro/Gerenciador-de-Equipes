import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { Router, RouterModule } from '@angular/router'; 
import { Equipe } from '../../../shared/models/equipe.model';
import { MockDataService } from '../../../shared/services/mock-data.service';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { CommonModule } from '@angular/common'; 
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-equipe-list',
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
  templateUrl: './equipe-list.component.html',
  styleUrls: ['./equipe-list.component.css']
})
export class EquipeListComponent implements OnInit {
  equipes$!: Observable<Equipe[]>;
  empresaIdLogada = 1;
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'projetistas', 'acoes'];

  constructor(
    private mockDataService: MockDataService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.equipes$ = this.mockDataService.getEquipes();
  }

  getProjetistaNomes(equipe: Equipe): string {
    if (equipe && Array.isArray(equipe.projetistas)) {
        return equipe.projetistas.map(p => p.nome).join(', ') || 'Nenhum';
    }
    return 'Nenhum';
  }

  editarEquipe(equipe: Equipe): void {
    this.router.navigate(['/company/equipes/editar', equipe.id]);
  }

  excluirEquipe(equipe: Equipe): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Confirmar Exclusão', message: `Tem certeza que deseja excluir a equipe "${equipe.nome}"?` }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.mockDataService.deleteEquipe(equipe.id).subscribe(() => {
          console.log('Equipe excluída:', equipe.id);
        });
      }
    });
  }

  novaEquipe(): void {
    this.router.navigate(['/company/equipes/novo']);
  }
}

