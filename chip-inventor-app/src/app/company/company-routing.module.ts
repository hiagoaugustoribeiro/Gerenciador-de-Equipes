import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjetistaListComponent } from './components/projetista-list/projetista-list.component';
import { ProjetistaFormComponent } from './components/projetista-form/projetista-form.component';
import { EquipeListComponent } from './components/equipe-list/equipe-list.component';
import { EquipeFormComponent } from './components/equipe-form/equipe-form.component';

const routes: Routes = [
  {
    path: 'projetistas',
    component: ProjetistaListComponent
  },
  {
    path: 'projetistas/novo',
    component: ProjetistaFormComponent
  },
  {
    path: 'projetistas/editar/:id',
    component: ProjetistaFormComponent
  },
  {
    path: 'equipes',
    component: EquipeListComponent
  },
  {
    path: 'equipes/novo',
    component: EquipeFormComponent
  },
  {
    path: 'equipes/editar/:id',
    component: EquipeFormComponent
  },
  {
    path: '', // Rota padrão do módulo Company, redireciona para projetistas
    redirectTo: 'projetistas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }

