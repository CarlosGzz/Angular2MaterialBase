import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacionPromediadaComponent } from './simulacion-promediada.component';

describe('SimulacionPromediadaComponent', () => {
  let component: SimulacionPromediadaComponent;
  let fixture: ComponentFixture<SimulacionPromediadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulacionPromediadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulacionPromediadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
