import { DiagramaComponent } from './diagrama/diagrama.component';
import { DocumentacionComponent } from './documentacion/documentacion.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimuladorComponent } from './simulador/simulador.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'simulador', component: SimuladorComponent },
  { path: 'documentacion', component: DocumentacionComponent },
  { path: 'diagrama', component: DiagramaComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
