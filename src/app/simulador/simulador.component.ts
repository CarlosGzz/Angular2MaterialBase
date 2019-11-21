import { Component, OnInit } from "@angular/core";
import {
  SimulacionIndividual,
  PromedioDeSimulaciones,
  FormaDeSimulador
} from "./modelos-de-simulador";

@Component({
  selector: "app-simulador",
  templateUrl: "./simulador.component.html",
  styleUrls: ["./simulador.component.css"]
})
export class SimuladorComponent implements OnInit {
  numeroDeJugadores = 2;
  numeroDeSimulaciones = 10;
  metodoDeSimulacion = 0;
  tipoDeJuego = 1;
  numerodDePromedio = 10;
  simulacionPromedioOIndividual = undefined;
  simulacionIndividual: SimulacionIndividual;
  promedioDeSimulaciones: PromedioDeSimulaciones;

  ngOnInit() {}

  correrSimulacion(datosDeForma: FormaDeSimulador) {
    this.establecerDatosDelFormularioDeSimulador(datosDeForma);
    this.simulacionIndividual = this.inicializarSimulacionIndividual();
    this.simulacionIndividual = this.escogerSimulacion(
      datosDeForma.metodoDeSimulacion
    );
    this.simulacionPromedioOIndividual = "individual";
  }

  escogerSimulacion(metodoDeSimulacion) {
    const simulacion = {
      0: () => this.primerJugadorSiempreInicia(),
      1: () => this.jugadorQueGanaSigueJugando(),
      2: () => this.jugadoresIntercalados()
    };
    return simulacion[metodoDeSimulacion]();
  }

  promediarSimulaciones(datosDeForma) {
    this.establecerDatosDelFormularioDeSimulador(datosDeForma);
    this.promedioDeSimulaciones = this.inicializarPromedioDeSimulaciones();
    for (let i = 0; i < this.numerodDePromedio; i++) {
      this.promedioDeSimulaciones.simulaciones.push(
        this.escogerSimulacion(datosDeForma.metodoDeSimulacion)
      );
    }
    this.promedioDeSimulaciones.promedioCompuestoDeJugadores = this.obtenerPromedioDeJugadorGanador(
      this.promedioDeSimulaciones.simulaciones
    );
    this.promedioDeSimulaciones = {
      ...this.promedioDeSimulaciones,
      ...this.obtenerJugadorGanadorDeTodasLasSimulaciones(
        this.promedioDeSimulaciones.simulaciones
      )
    };
    this.simulacionPromedioOIndividual = "promedio";
  }

  private establecerDatosDelFormularioDeSimulador(datosDeForma) {
    this.numeroDeJugadores = datosDeForma.numeroDeJugadores;
    this.numeroDeSimulaciones = datosDeForma.numeroDeSimulaciones;
    this.metodoDeSimulacion = datosDeForma.metodoDeSimulacion;
    this.tipoDeJuego = datosDeForma.tipoDeJuego;
    this.numerodDePromedio = datosDeForma.numerodDePromedio;
  }

  private obtenerPromedioDeJugadorGanador(
    simulaciones: Array<SimulacionIndividual>
  ) {
    let sumaDePromediosPorJugador = new Array<number>(this.numeroDeJugadores);
    simulaciones.forEach(simulacion => {
      simulacion.promedioDeVictoriasPorJugador.forEach(
        (promedioDeVictoriasDeJugador, index) => {
          sumaDePromediosPorJugador[index] =
            parseFloat(promedioDeVictoriasDeJugador) +
            (sumaDePromediosPorJugador[index]
              ? sumaDePromediosPorJugador[index]
              : 0);
        }
      );
    });
    const promedioCompuestoDeJugadores = sumaDePromediosPorJugador.map(
      sumaDeJugador => {
        return sumaDeJugador / this.numerodDePromedio;
      }
    );
    return promedioCompuestoDeJugadores;
  }
  private obtenerJugadorGanadorDeTodasLasSimulaciones(
    simulaciones: Array<SimulacionIndividual>
  ): Partial<PromedioDeSimulaciones> {
    let hash = {};
    let contadorDeMasFrecuente = 0;
    let masFrecuente: number;
    simulaciones.forEach((simulacion, index) => {
      const ganadorDeSimulacion = simulacion.jugadorGanadorDeSimulacion;
      if (hash[ganadorDeSimulacion] === undefined) {
        hash[ganadorDeSimulacion] = 1;
      } else {
        hash[ganadorDeSimulacion] = hash[ganadorDeSimulacion] + 1;
      }
      if (hash[ganadorDeSimulacion] > contadorDeMasFrecuente) {
        contadorDeMasFrecuente = hash[ganadorDeSimulacion];
        masFrecuente = ganadorDeSimulacion;
      }
    });
    if (hash[masFrecuente] <= this.numerodDePromedio / this.numeroDeJugadores) {
      masFrecuente = null;
    }
    return {
      jugadorGanadorDeTodasLasSimulaciones: masFrecuente,
      sumaDeJuegosGanadosPorJugador: hash
    };
  }

  private inicializarSimulacionIndividual(): SimulacionIndividual {
    return {
      numeroDeJuegos: 0,
      victoriasPorJugador: this.inicializarJugadores(),
      simulacionesVisuales: [],
      promedioDeJuegosPorPartida: 0,
      promedioDeVictoriasPorJugador: [],
      jugadorGanadorDeSimulacion: undefined
    };
  }

  private inicializarJugadores() {
    let victoriasPorJugador = [];
    for (let i = 0; i < this.numeroDeJugadores; i++) {
      victoriasPorJugador.push(0);
    }
    return victoriasPorJugador;
  }

  private inicializarPromedioDeSimulaciones(): PromedioDeSimulaciones {
    return {
      promedioCompuestoDeJugadores: [],
      simulaciones: [],
      jugadorGanadorDeTodasLasSimulaciones: undefined,
      sumaDeJuegosGanadosPorJugador: []
    };
  }

  private obtenerPromediosDeSimulacion(
    simulacion: SimulacionIndividual,
    sumaTotalDeJuegos: number
  ): Partial<SimulacionIndividual> {
    const promediosDeSimulacion = {
      promedioDeVictoriasPorJugador: this.promedioDeVictoriasPorJugador(
        simulacion
      ),
      promedioDeJuegosPorPartida:
        sumaTotalDeJuegos / simulacion.simulacionesVisuales.length
    };
    return promediosDeSimulacion;
  }

  private promedioDeVictoriasPorJugador(
    simulacion: SimulacionIndividual
  ): Array<string> {
    const dat = simulacion.victoriasPorJugador.map(victorias => {
      return (victorias / simulacion.simulacionesVisuales.length).toFixed(4);
    });
    return dat;
  }

  private primerJugadorSiempreInicia(): SimulacionIndividual {
    let posicion = 0;
    let partidas = 0;
    let sumaJuegosPorPartida = 0;
    let sumaTotalDeJuegos = 0;
    let simulacion = this.inicializarSimulacionIndividual();
    do {
      sumaTotalDeJuegos++;
      sumaJuegosPorPartida++;
      const random = Math.random().toFixed(4);
      if (this.validarPartida(random)) {
        simulacion.simulacionesVisuales[partidas] = {
          jugadorGanador: posicion + 1,
          juegos: sumaJuegosPorPartida
        };
        simulacion.victoriasPorJugador[posicion]++;
        posicion = 0;
        partidas++;
        sumaJuegosPorPartida = 0;
      } else {
        posicion = this.aumentarPosicion(posicion);
      }
    } while (partidas < this.numeroDeSimulaciones);
    const jugadorGanadorDeSimulacion = this.jugadorGanadorDeSimulacion(
      simulacion.victoriasPorJugador
    );
    simulacion = {
      ...simulacion,
      ...this.obtenerPromediosDeSimulacion(simulacion, sumaTotalDeJuegos),
      jugadorGanadorDeSimulacion,
      numeroDeJuegos: sumaTotalDeJuegos
    };
    return simulacion;
  }

  private jugadorQueGanaSigueJugando() {
    let posicion = 0;
    let partidas = 0;
    let sumaJuegosPorPartida = 0;
    let sumaTotalDeJuegos = 0;
    let simulacion = this.inicializarSimulacionIndividual();
    do {
      sumaTotalDeJuegos++;
      sumaJuegosPorPartida++;
      const random = Math.random().toFixed(4);
      if (this.validarPartida(random)) {
        simulacion.simulacionesVisuales[partidas] = {
          jugadorGanador: posicion + 1,
          juegos: sumaJuegosPorPartida
        };
        simulacion.victoriasPorJugador[posicion]++;
        partidas++;
        sumaJuegosPorPartida = 0;
      } else {
        posicion = this.aumentarPosicion(posicion);
      }
    } while (partidas < this.numeroDeSimulaciones);
    const jugadorGanadorDeSimulacion = this.jugadorGanadorDeSimulacion(
      simulacion.victoriasPorJugador
    );
    simulacion = {
      ...simulacion,
      ...this.obtenerPromediosDeSimulacion(simulacion, sumaTotalDeJuegos),
      jugadorGanadorDeSimulacion,
      numeroDeJuegos: sumaTotalDeJuegos
    };
    return simulacion;
  }

  private jugadoresIntercalados() {
    let posicion = 0;
    let partidas = 0;
    let sumaJuegosPorPartida = 0;
    let sumaTotalDeJuegos = 0;
    let simulacion = this.inicializarSimulacionIndividual();
    do {
      sumaTotalDeJuegos++;
      sumaJuegosPorPartida++;
      const random = Math.random().toFixed(4);
      if (this.validarPartida(random)) {
        simulacion.simulacionesVisuales[partidas] = {
          jugadorGanador: posicion + 1,
          juegos: sumaJuegosPorPartida
        };
        simulacion.victoriasPorJugador[posicion]++;
        posicion = this.aumentarPosicion(posicion);
        partidas++;
        sumaJuegosPorPartida = 0;
      } else {
        posicion = this.aumentarPosicion(posicion);
      }
    } while (partidas < this.numeroDeSimulaciones);
    const jugadorGanadorDeSimulacion = this.jugadorGanadorDeSimulacion(
      simulacion.victoriasPorJugador
    );
    simulacion = {
      ...simulacion,
      ...this.obtenerPromediosDeSimulacion(simulacion, sumaTotalDeJuegos),
      jugadorGanadorDeSimulacion,
      numeroDeJuegos: sumaTotalDeJuegos
    };
    return simulacion;
  }

  private validarPartida(random) {
    const validar = {
      0: valorRandom => this.validarCaraOCruz(valorRandom),
      1: valorRandom => this.validarDado(valorRandom),
      2: valorRandom => this.validarCartas(valorRandom)
    };
    return validar[this.tipoDeJuego](random);
  }

  private validarCaraOCruz(random) {
    const cara = random <= 0.5;
    const cruz = random > 0.5;
    return cara;
  }

  private validarDado(random: number) {
    const lado = 6;
    const miLadoSalio = (lado - 1) / 6 < random && random <= lado / 6;
    return miLadoSalio;
  }

  private validarCartas(random) {
    const carta = 30;
    const miCartaSalio = (carta - 1) / 52 < random && random <= carta / 52;
    return miCartaSalio;
  }

  private aumentarPosicion(posicion) {
    if (posicion < this.numeroDeJugadores - 1) {
      posicion++;
    } else {
      posicion = 0;
    }
    return posicion;
  }

  private jugadorGanadorDeSimulacion(victoriasPorJugador): number {
    let jugadorGanador = null;
    let auxiliar;
    let auxiliarEmpate;
    victoriasPorJugador.forEach((victorias, index) => {
      if (auxiliar === undefined) {
        auxiliar = victorias;
        jugadorGanador = index;
      } else {
        if (auxiliar === victorias) {
          auxiliarEmpate = victorias;
        }
        if (auxiliar < victorias) {
          auxiliar = victorias;
          jugadorGanador = index;
        }
      }
    });
    if (victoriasPorJugador[jugadorGanador] === auxiliarEmpate) {
      jugadorGanador = null;
    }
    return jugadorGanador;
  }
}
