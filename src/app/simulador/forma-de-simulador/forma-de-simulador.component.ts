import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-forma-de-simulador',
  templateUrl: './forma-de-simulador.component.html',
  styleUrls: ['./forma-de-simulador.component.css'],
})
export class FormaDeSimuladorComponent implements OnInit {
  @Output() correrSimulaciom = new EventEmitter<any>();
  @Output() promediarSimulacion = new EventEmitter<any>();
  numeroDeJugadores = 2;
  numeroDeSimulaciones = 10;
  metodoDeSimulacion = 0;
  tipoDeJuego = 0;
  numerodDePromedio = 10;

  metodosDeSimulacion = [
    { value: 0, viewValue: 'Primero Siempre Empieza' },
    { value: 1, viewValue: 'Ganador Sigue Jugando' },
    { value: 2, viewValue: 'Intercalado' },
  ];
  tiposDeJuego = [
    { value: 0, viewValue: 'Cara O Cruz' },
    { value: 1, viewValue: 'Dado' },
    { value: 2, viewValue: 'Cartas' },
  ];

  constructor() {}

  ngOnInit() {}
  correrSimulacion() {
    this.correrSimulaciom.emit(this.datosDeForma);
  }
  promediarSimulaciones() {
    this.promediarSimulacion.emit(this.datosDeForma);
  }

  get datosDeForma() {
    return {
      numeroDeJugadores: this.numeroDeJugadores,
      numeroDeSimulaciones: this.numeroDeSimulaciones,
      metodoDeSimulacion: this.metodoDeSimulacion,
      tipoDeJuego: this.tipoDeJuego,
      numerodDePromedio: this.numerodDePromedio,
    };
  }
}
