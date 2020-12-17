import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultComponent } from './result.component';
import { Location } from '@angular/common';
import { LengaburuService } from '@services/lengaburu.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let location: Location;
  const locationStub = {
    back: jasmine.createSpy('back')
}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultComponent],
      imports: [RouterTestingModule],
      providers: [
        LengaburuService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    location = TestBed.get(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display failure message when falcone is not found', () => {
    fixture.componentInstance.displayResult({ status: '', planet_name: '' });
    expect(fixture.componentInstance.status).toBe(false);
    expect(fixture.componentInstance.statusMsg).toContain('Could not find');
    expect(fixture.componentInstance.statusTitle).toContain('Failed');
    expect(fixture.componentInstance.newMissionMsg).toContain('Retry');
  });

  it('should display success message when falcone is found', () => {
    fixture.componentInstance.displayResult({
      status: 'success',
      planet_name: 'donlon',
    });
    expect(fixture.componentInstance.status).toBe(true);
    expect(fixture.componentInstance.statusMsg).toContain('Success');
    expect(fixture.componentInstance.statusTitle).toContain('Found');
    expect(fixture.componentInstance.newMissionMsg).toContain('Start Again');
  });

  it('should go to previous page on game restart', () => {
    fixture.componentInstance.restart();
    expect(location.path()).toBe('');
  });
});
