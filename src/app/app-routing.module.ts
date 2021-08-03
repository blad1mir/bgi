import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'contacto/:previo',
    loadChildren: () => import('./contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'directorio/:previo',
    loadChildren: () => import('./directorio/directorio.module').then( m => m.DirectorioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'citas',
    loadChildren: () => import('./citas/citas.module').then( m => m.CitasPageModule)
  },
  {
    path: 'documentos',
    loadChildren: () => import('./documentos/documentos.module').then( m => m.DocumentosPageModule)
  },
  {
    path: 'farmacia',
    loadChildren: () => import('./farmacia/farmacia.module').then( m => m.FarmaciaPageModule)
  },
  {
    path: 'viaje',
    loadChildren: () => import('./viaje/viaje.module').then( m => m.ViajePageModule)
  },
  {
    path: 'modal-registro',
    loadChildren: () => import('./modal-registro/modal-registro.module').then( m => m.ModalRegistroPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'modalhistorial',
    loadChildren: () => import('./modalhistorial/modalhistorial.module').then( m => m.ModalhistorialPageModule)
  },
  {
    path: 'modalviajes',
    loadChildren: () => import('./modalviajes/modalviajes.module').then( m => m.ModalviajesPageModule)
  },
  {
    path: 'voip',
    loadChildren: () => import('./voip/voip.module').then( m => m.VoipPageModule)
  },
  {
    path: 'modalfarmacia',
    loadChildren: () => import('./modalfarmacia/modalfarmacia.module').then( m => m.ModalfarmaciaPageModule)
  },
  {
    path: 'soporte',
    loadChildren: () => import('./soporte/soporte.module').then( m => m.SoportePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
