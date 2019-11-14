export interface FormaDeSimulador {
  numeroDeJugadores: number;
  cantidadDeVictoriasParaTerminar: number;
  metodoDeSimulacion: number;
  tipoDeJuego: number;
  numerodDePromedio: number;
}

export interface Partida {
  juegos: number;
  jugadorGanador: number;
}

export interface SimulacionIndividual {
  numeroDePartidas: number;
  victoriasPorJugador: Array<number>;
  simulacionesVisuales: Array<Partida>;
  promedioDeJuegosPorPartida: number;
  promedioDeVictoriasPorJugador: Array<string>;
  jugadorGanadorDeSimulacion: number;
}

export interface PromedioDeSimulaciones {
  promedioCompuestoDeJugadores: Array<number>;
  simulaciones: Array<SimulacionIndividual>;
  jugadorGanadorDeTodasLasSimulaciones: number;
  sumaDeJuegosGanadosPorJugador: any;
}
