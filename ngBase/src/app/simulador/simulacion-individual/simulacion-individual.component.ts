import { Component, OnInit, Input } from '@angular/core';
import { SimulacionIndividual } from '../modelos-de-simulador';

@Component({
  selector: 'app-simulacion-individual',
  templateUrl: './simulacion-individual.component.html',
  styleUrls: ['./simulacion-individual.component.css'],
})
export class SimulacionIndividualComponent implements OnInit {
  @Input() simulacionIndividual: SimulacionIndividual;
  constructor() {}

  ngOnInit() {}
}
