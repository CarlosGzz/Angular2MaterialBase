import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { PromedioDeSimulaciones } from '../modelos-de-simulador';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as Highcharts from 'highcharts';

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
  selector: 'app-grafica-simulacion-promediada',
  templateUrl: './grafica-simulacion-promediada.component.html',
  styleUrls: ['./grafica-simulacion-promediada.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraficaSimulacionPromediadaComponent implements OnInit, OnChanges {
  @Input() promedioDeSimulaciones: PromedioDeSimulaciones;
  @Input() numeroDeJugadores: number;
  graficaPromediosData: ChartObject = {
    barChartOptions: chartOptionsDefault,
    barChartLabels: [],
    barChartType: 'bar',
    barChartLegend: true,
    barChartPlugins: [],
    barChartData: [],
  };
  graficaPromediosCompuestosLineal: ChartObject = {
    barChartOptions: chartOptionsDefault,
    barChartLabels: [],
    barChartType: 'line',
    barChartLegend: false,
    barChartPlugins: [],
    barChartData: [],
  };

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [
      {
        data: [1, 2, 3],
        type: 'line',
      },
    ],
  };
  constructor() {}

  ngOnInit() {}

  ngOnChanges(change: SimpleChanges) {
    if (change.promedioDeSimulaciones) {
      this.crearGraficaDeVictorias();
      this.crearGraficaDeProbabilidadCompuesta();
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
    const barChartLabels = ['Probabilida'];
    const barChartData = [];
    for (let i = 0; i < this.numeroDeJugadores; i++) {
      barChartData.push({ data: [this.promedioDeSimulaciones.promedioCompuestoDeJugadores[i]], label: `Jugador ${i + 1}` });
    }
    this.graficaPromediosData.barChartOptions = {
      ...this.graficaPromediosData.barChartOptions,
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

  private crearGraficaDeProbabilidadCompuesta() {
    const arregloDePromediosPorJugador = this.aplanarSimulaciones();
    this.sortearArregloDePromedios(arregloDePromediosPorJugador);
    // const hashDePromediosContados = this.obtenerHashDePromediosRepetidos(arregloDePromediosPorJugador);

    // const promediosNormalizados = [];
    // const labels = [];
    // // tslint:disable-next-line: forin
    // for (const data in hashDePromediosContados) {
    //   hashDePromediosContados[data].forEach(count => {
    //     promediosNormalizados.push({ data: count, label: `Jugador ${data + 1}` });
    //   });
    // }
    // this.graficaPromediosCompuestosLineal.barChartData = promediosNormalizados;
  }

  private aplanarSimulaciones() {
    let hash = {};
    this.promedioDeSimulaciones.simulaciones.forEach(simulacion => {
      simulacion.promedioDeVictoriasPorJugador.forEach((promedio, index) => {
        if (hash[index] === undefined) {
          hash[index] = [promedio];
        } else {
          hash[index].push(promedio);
        }
      });
    });
    return hash;
  }

  private sortearArregloDePromedios(arregloDePromediosPorJugador) {
    for (let jugador in arregloDePromediosPorJugador) {
      arregloDePromediosPorJugador[jugador].sort((a, b) => a - b);
    }
  }

  private obtenerHashDePromediosRepetidos(arregloDePromediosPorJugador) {
    let hashDePromediosContados = {};
    for (let data in arregloDePromediosPorJugador) {
      let hashDePromedios = {};
      arregloDePromediosPorJugador[data].forEach(promedio => {
        const datoPromedio = promedio;
        if (hashDePromedios[datoPromedio] === undefined) {
          hashDePromedios[datoPromedio] = 1;
        } else {
          hashDePromedios[datoPromedio] = hashDePromedios[datoPromedio] + 1;
        }
      });
      hashDePromediosContados[data] = hashDePromedios;
    }
    return hashDePromediosContados;
  }
}
