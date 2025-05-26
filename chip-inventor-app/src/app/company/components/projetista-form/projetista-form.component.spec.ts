import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetistaFormComponent } from './projetista-form.component';

describe('ProjetistaFormComponent', () => {
  let component: ProjetistaFormComponent;
  let fixture: ComponentFixture<ProjetistaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetistaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetistaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
