import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-simulacion-promediada',
  templateUrl: './simulacion-promediada.component.html',
  styleUrls: ['./simulacion-promediada.component.css']
})
export class SimulacionPromediadaComponent implements OnInit {
  @Input() promedioDeSimulaciones;
  constructor() { }

  ngOnInit() {
  }

}
