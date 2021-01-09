import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartAttackComponent } from './start-attack.component';

describe('StartAttackComponent', () => {
  let component: StartAttackComponent;
  let fixture: ComponentFixture<StartAttackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartAttackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartAttackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
