import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaSimulacionIndividualComponent } from './grafica-simulacion-individual.component';

describe('GraficaSimulacionIndividualComponent', () => {
  let component: GraficaSimulacionIndividualComponent;
  let fixture: ComponentFixture<GraficaSimulacionIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaSimulacionIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaSimulacionIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
