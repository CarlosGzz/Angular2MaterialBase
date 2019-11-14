import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacionIndividualComponent } from './simulacion-individual.component';

describe('SimulacionIndividualComponent', () => {
  let component: SimulacionIndividualComponent;
  let fixture: ComponentFixture<SimulacionIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulacionIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulacionIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
