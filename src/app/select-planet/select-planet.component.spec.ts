import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPlanetComponent } from './select-planet.component';

describe('SelectPlanetComponent', () => {
  let component: SelectPlanetComponent;
  let fixture: ComponentFixture<SelectPlanetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPlanetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
