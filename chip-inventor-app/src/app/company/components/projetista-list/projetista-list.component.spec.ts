import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetistaListComponent } from './projetista-list.component';

describe('ProjetistaListComponent', () => {
  let component: ProjetistaListComponent;
  let fixture: ComponentFixture<ProjetistaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetistaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetistaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
