import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';

const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: '', component: ClientesComponent, pathMatch: 'full' },
  { path: '**', component: ClientesComponent},

];

export const routing : ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
