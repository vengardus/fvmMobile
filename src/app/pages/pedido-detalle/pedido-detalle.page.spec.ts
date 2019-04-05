import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDetallePage } from './pedido-detalle.page';

describe('PedidoDetallePage', () => {
  let component: PedidoDetallePage;
  let fixture: ComponentFixture<PedidoDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoDetallePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
