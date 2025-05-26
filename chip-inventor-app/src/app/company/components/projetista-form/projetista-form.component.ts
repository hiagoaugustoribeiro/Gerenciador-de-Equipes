import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 
import { Observable } from 'rxjs';
import { Projetista } from '../../../shared/models/projetista.model';
import { MockDataService } from '../../../shared/services/mock-data.service';
import { CommonModule } from '@angular/common'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-projetista-form',
  standalone: true, 
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './projetista-form.component.html',
  styleUrls: ['./projetista-form.component.css']
})
export class ProjetistaFormComponent implements OnInit {
  projetistaForm!: FormGroup;
  isEditMode = false;
  projetistaId: number | null = null;
  pageTitle = 'Novo Projetista';
  empresaIdLogada = 1;

  constructor(
    private fb: FormBuilder,
    private mockDataService: MockDataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projetistaId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    this.isEditMode = !!this.projetistaId;
    this.pageTitle = this.isEditMode ? 'Editar Projetista' : 'Novo Projetista';

    this.initForm();

    if (this.isEditMode && this.projetistaId) {
      this.loadProjetistaData(this.projetistaId);
    }
  }

  initForm(): void {
    this.projetistaForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cargo: [''],
      empresaId: [this.empresaIdLogada]
    });
  }

  loadProjetistaData(id: number): void {
    this.mockDataService.getProjetistaById(id).subscribe((projetista: Projetista | undefined) => {
      if (projetista) {
        this.projetistaForm.patchValue(projetista);
      }
    });
  }

  onSubmit(): void {
    if (this.projetistaForm.invalid) {
      this.projetistaForm.markAllAsTouched();
      return;
    }

    const projetistaData = this.projetistaForm.value;
    let saveObservable: Observable<Projetista | undefined>;

    if (this.isEditMode && this.projetistaId) {
      saveObservable = this.mockDataService.updateProjetista({ ...projetistaData, id: this.projetistaId });
    } else {
      projetistaData.empresaId = this.empresaIdLogada;
      saveObservable = this.mockDataService.addProjetista(projetistaData);
    }

    saveObservable.subscribe(() => {
      this.router.navigate(['/company/projetistas']);
    });
  }

  cancel(): void {
    this.router.navigate(['/company/projetistas']);
  }
}

