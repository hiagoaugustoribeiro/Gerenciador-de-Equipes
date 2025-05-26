import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  template: `
  
  <span class="titulo-destaque">Gerenciador de Equipes</span>
 
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="onToggleSidenav()" aria-label="Toggle sidenav" >
         ≡ Menu
      </button>
      
      
    </mat-toolbar>
    
  `,
  styles: []
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }
}

