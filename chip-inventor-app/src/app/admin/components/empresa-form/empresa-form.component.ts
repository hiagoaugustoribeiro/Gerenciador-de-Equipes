import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 
import { Observable } from 'rxjs';
import { Empresa } from '../../../shared/models/empresa.model';
import { MockDataService } from '../../../shared/services/mock-data.service';
import { CommonModule } from '@angular/common'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-empresa-form',
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
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css']
})
export class EmpresaFormComponent implements OnInit {
  empresaForm!: FormGroup;
  isEditMode = false;
  empresaId: number | null = null;
  pageTitle = 'Nova Empresa';

  constructor(
    private fb: FormBuilder,
    private mockDataService: MockDataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.empresaId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    this.isEditMode = !!this.empresaId;
    this.pageTitle = this.isEditMode ? 'Editar Empresa' : 'Nova Empresa';

    this.initForm();

    if (this.isEditMode && this.empresaId) {
      this.loadEmpresaData(this.empresaId);
    }
  }

  initForm(): void {
    this.empresaForm = this.fb.group({
      nome: ['', Validators.required],
      cnpj: ['', Validators.required],
      endereco: ['']
    });
  }

  loadEmpresaData(id: number): void {
    this.mockDataService.getEmpresaById(id).subscribe((empresa: Empresa | undefined) => {
      if (empresa) {
        this.empresaForm.patchValue(empresa);
      }
    });
  }

  onSubmit(): void {
    if (this.empresaForm.invalid) {
      this.empresaForm.markAllAsTouched();
      return;
    }

    const empresaData = this.empresaForm.value;
    let saveObservable: Observable<Empresa | undefined>;

    if (this.isEditMode && this.empresaId) {
      saveObservable = this.mockDataService.updateEmpresa({ ...empresaData, id: this.empresaId });
    } else {
      saveObservable = this.mockDataService.addEmpresa(empresaData);
    }

    saveObservable.subscribe(() => {
      this.router.navigate(['/admin']);
    });
  }

  cancel(): void {
    this.router.navigate(['/admin']);
  }
}

