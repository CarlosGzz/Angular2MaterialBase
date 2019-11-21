import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaSimulacionPromediadaComponent } from './grafica-simulacion-promediada.component';

describe('GraficaSimulacionPromediadaComponent', () => {
  let component: GraficaSimulacionPromediadaComponent;
  let fixture: ComponentFixture<GraficaSimulacionPromediadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaSimulacionPromediadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaSimulacionPromediadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
