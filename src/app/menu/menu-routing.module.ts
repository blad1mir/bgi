import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'principal',
        loadChildren: () => import('../principal/principal.module').then(m => m.PrincipalPageModule)
      },
      {
        path: 'documentos',
        loadChildren: () => import('../documentos/documentos.module').then(m => m.DocumentosPageModule)
      },
      {
        path: 'hmedico',
        loadChildren: () => import('../historial/historial.module').then(m => m.HistorialPageModule)
      },
      {
        path: 'hfarmacia',
        loadChildren: () => import('../farmacia/farmacia.module').then(m => m.FarmaciaPageModule)
      },
      {
        path: 'viajero',
        loadChildren: () => import('../viaje/viaje.module').then(m => m.ViajePageModule)
      },
      {
        path: 'medica',
        loadChildren: () => import('../voip/voip.module').then(m => m.VoipPageModule)
      },
      {
        path: 'soporte',
        loadChildren: () => import('../soporte/soporte.module').then(m => m.SoportePageModule)
      },
      {
        path: '',
        redirectTo: 'principal',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
