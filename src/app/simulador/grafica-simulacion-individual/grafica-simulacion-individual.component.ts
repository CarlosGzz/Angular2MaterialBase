import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { SimulacionIndividual } from '../modelos-de-simulador';
interface ChartObject {
  barChartOptions: ChartOptions;
  barChartLabels: Label[];
  barChartType: ChartType;
  barChartLegend: boolean;
  barChartPlugins: Array<any>;
  barChartData: ChartDataSets[];
}
const chartOptionsDefault = {
  responsive: true,
  scales: {
    yAxes: [
      {
        ticks: {
          suggestedMin: 0,
        },
      },
    ],
  },
};
@Component({
  selector: 'app-grafica-simulacion-individual',
  templateUrl: './grafica-simulacion-individual.component.html',
  styleUrls: ['./grafica-simulacion-individual.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraficaSimulacionIndividualComponent implements OnInit, OnChanges {
  @Input() simulacionIndividual: SimulacionIndividual;
  @Input() numeroDeJugadores: number;
  @Input() numeroDeSimulaciones: number;

  graficaVictoriasData: ChartObject = {
    barChartOptions: chartOptionsDefault,
    barChartLabels: [],
    barChartType: 'bar',
    barChartLegend: true,
    barChartPlugins: [],
    barChartData: [],
  };
  graficaPromediosData: ChartObject = {
    barChartOptions: chartOptionsDefault,
    barChartLabels: [],
    barChartType: 'bar',
    barChartLegend: true,
    barChartPlugins: [],
    barChartData: [],
  };
  graficaSimulacionesData: ChartObject = {
    barChartOptions: chartOptionsDefault,
    barChartLabels: [],
    barChartType: 'line',
    barChartLegend: false,
    barChartPlugins: [],
    barChartData: [],
  };

  constructor() {}

  ngOnInit() {
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.simulacionIndividual) {
      this.crearGraficaDeVictorias();
      this.crearGraficaDePromedios();
      this.crearGraficaDeSimulaciones();
    }
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent; active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent; active: {}[] }): void {
    console.log(event, active);
  }

  private crearGraficaDeVictorias() {
    const barChartLabels = ['Victorias'];
    const barChartData = [];
    for (let i = 0; i < this.numeroDeJugadores; i++) {
      barChartData.push({ data: [this.simulacionIndividual.victoriasPorJugador[i]], label: `Jugador ${i + 1}` });
    }
    this.graficaPromediosData.barChartOptions = {
      ...this.graficaSimulacionesData.barChartOptions,
      scales: {
        yAxes: [
          {
            ticks: {
              min: 0,
              max: this.numeroDeSimulaciones,
            },
          },
        ],
      },
    };
    this.graficaVictoriasData.barChartData = barChartData;
    this.graficaVictoriasData.barChartLabels = barChartLabels;
  }

  private crearGraficaDePromedios() {
    const barChartLabels = ['Probabilidad'];
    const barChartData = [];
    for (let i = 0; i < this.numeroDeJugadores; i++) {
      barChartData.push({ data: [this.simulacionIndividual.promedioDeVictoriasPorJugador[i]], label: `Jugador ${i + 1}` });
    }
    this.graficaPromediosData.barChartOptions = {
      ...this.graficaSimulacionesData.barChartOptions,
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMin: 0,
              suggestedMax: 1,
            },
          },
        ],
      },
    };
    this.graficaPromediosData.barChartData = barChartData;
    this.graficaPromediosData.barChartLabels = barChartLabels;
  }
  private crearGraficaDeSimulaciones() {
    const barChartLabels = [];
    const barChartData = [];
    const sortedSimulaciones = this.simulacionIndividual.simulacionesVisuales.sort((a,b) => a.juegos-b.juegos )
    let hash = {};
    sortedSimulaciones.forEach(partida => {
      const numeroDeJuegos = partida.juegos;
      if (hash[numeroDeJuegos] === undefined) {
        hash[numeroDeJuegos] = 1;
      } else {
        hash[numeroDeJuegos] = hash[numeroDeJuegos] + 1;
      }
    });
    const juegosNormalizados = [];
    const labels = [];
    for (let data in hash) {
      juegosNormalizados.push(hash[data]);
      labels.push(`${data} Juegos`);
    }
    this.graficaSimulacionesData.barChartData= [{ data: juegosNormalizados, label: 'Distribucion' }];
    this.graficaSimulacionesData.barChartLabels = labels;
  }
}
