import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './_cliente/cliente/cliente.component';
import { CalculoComponent } from './_cliente/calculo/calculo.component';

const routes: Routes = [
  { path: 'cliente', component: ClienteComponent },
  { path: 'calculo', component: CalculoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
