import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigSetupPage } from './config-setup.page';

describe('ConfigSetupPage', () => {
  let component: ConfigSetupPage;
  let fixture: ComponentFixture<ConfigSetupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigSetupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigSetupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
