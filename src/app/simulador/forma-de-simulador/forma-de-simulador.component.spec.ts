import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaDeSimuladorComponent } from './forma-de-simulador.component';

describe('FormaDeSimuladorComponent', () => {
  let component: FormaDeSimuladorComponent;
  let fixture: ComponentFixture<FormaDeSimuladorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormaDeSimuladorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormaDeSimuladorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
