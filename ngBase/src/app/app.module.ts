import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './core/material/material.module';
import { ChartsModule } from 'ng2-charts';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppComponent } from './app.component';
import { SimuladorComponent } from './simulador/simulador.component';
import { DocumentacionComponent } from './documentacion/documentacion.component';
import { DiagramaComponent } from './diagrama/diagrama.component';
import { FormaDeSimuladorComponent } from './simulador/forma-de-simulador/forma-de-simulador.component';
import { SimulacionIndividualComponent } from './simulador/simulacion-individual/simulacion-individual.component';
import { SimulacionPromediadaComponent } from './simulador/simulacion-promediada/simulacion-promediada.component';
import { GraficaSimulacionIndividualComponent } from './simulador/grafica-simulacion-individual/grafica-simulacion-individual.component';
import { GraficaSimulacionPromediadaComponent } from './simulador/grafica-simulacion-promediada/grafica-simulacion-promediada.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SimuladorComponent,
    DocumentacionComponent,
    DiagramaComponent,
    FormaDeSimuladorComponent,
    SimulacionIndividualComponent,
    SimulacionPromediadaComponent,
    GraficaSimulacionIndividualComponent,
    GraficaSimulacionPromediadaComponent,
  ],
  imports: [
    CoreModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ChartsModule,
    HighchartsChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
