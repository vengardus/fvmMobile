import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoCabeceraPage } from './pedido-cabecera.page';

describe('PedidoCabeceraPage', () => {
  let component: PedidoCabeceraPage;
  let fixture: ComponentFixture<PedidoCabeceraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoCabeceraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoCabeceraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
