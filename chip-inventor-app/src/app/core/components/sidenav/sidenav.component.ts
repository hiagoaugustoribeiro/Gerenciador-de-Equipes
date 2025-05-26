import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, RouterModule, MatIconModule],
  template: `
    <mat-nav-list>
      <h3 matSubheader>Administrador</h3>
      <a mat-list-item routerLink="/admin/empresas" routerLinkActive="active-link">
        
        <span matListItemTitle>• Empresas</span>
      </a>
      <mat-divider></mat-divider>
      <h3 matSubheader>Empresa</h3>
      <a mat-list-item routerLink="/company/projetistas" routerLinkActive="active-link">
        
        <span matListItemTitle>• Projetistas</span>
      </a>
      <a mat-list-item routerLink="/company/equipes" routerLinkActive="active-link">
        
        <span matListItemTitle>• Equipes</span>
      </a>
    </mat-nav-list>
  `,
  styles: [`
    .active-link {
      background-color: rgba(0, 0, 0, 0.04);
    }
  `]
})
export class SidenavComponent { }

