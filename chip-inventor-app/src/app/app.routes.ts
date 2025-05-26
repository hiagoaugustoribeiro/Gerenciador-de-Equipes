import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'company',
    loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)
  },
  {
    path: '',
    redirectTo: '/admin', // Redireciona para a área do admin por padrão
    pathMatch: 'full'
  },
  {
    path: '**', // Rota curinga para páginas não encontradas
    redirectTo: '/admin'
  }
];

