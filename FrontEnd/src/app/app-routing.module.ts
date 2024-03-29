import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HabitacionesComponent } from './components/habitaciones/habitaciones.component';
import { HomeComponent } from './components/home/home.component';
import { PruebaComponent } from './components/prueba/prueba.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {path:'inicio',component:HomeComponent},
  {path:'habitaciones',component:HabitacionesComponent},
  {path:'prueba',component:PruebaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
