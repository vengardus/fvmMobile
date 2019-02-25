import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesInfoPage } from './clientes-info.page';

describe('ClientesInfoPage', () => {
  let component: ClientesInfoPage;
  let fixture: ComponentFixture<ClientesInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
