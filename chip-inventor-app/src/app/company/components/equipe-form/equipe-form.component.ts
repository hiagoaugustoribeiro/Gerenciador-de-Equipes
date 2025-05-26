import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 
import { Observable } from 'rxjs';
import { Equipe } from '../../../shared/models/equipe.model';
import { Projetista } from '../../../shared/models/projetista.model';
import { MockDataService } from '../../../shared/services/mock-data.service';
import { CommonModule } from '@angular/common'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select'; 

@Component({
  selector: 'app-equipe-form',
  standalone: true, 
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule 
  ],
  templateUrl: './equipe-form.component.html',
  styleUrls: ['./equipe-form.component.css']
})
export class EquipeFormComponent implements OnInit {
  equipeForm!: FormGroup;
  projetistasDisponiveis$!: Observable<Projetista[]>;
  isEditMode = false;
  equipeId: number | null = null;
  pageTitle = 'Nova Equipe';
  empresaIdLogada = 1;

  constructor(
    private fb: FormBuilder,
    private mockDataService: MockDataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.equipeId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    this.isEditMode = !!this.equipeId;
    this.pageTitle = this.isEditMode ? 'Editar Equipe' : 'Nova Equipe';
    this.projetistasDisponiveis$ = this.mockDataService.getProjetistas();
    this.initForm();
    if (this.isEditMode && this.equipeId) {
      this.loadEquipeData(this.equipeId);
    }
  }

  initForm(): void {
    this.equipeForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      projetistaIds: [[], Validators.required],
      empresaId: [this.empresaIdLogada]
    });
  }

  loadEquipeData(id: number): void {
    this.mockDataService.getEquipeById(id).subscribe((equipe: Equipe | undefined) => {
      if (equipe) {
        this.equipeForm.patchValue({
          nome: equipe.nome,
          descricao: equipe.descricao,
          projetistaIds: equipe.projetistas ? equipe.projetistas.map(p => p.id) : [],
          empresaId: equipe.empresaId
        });
      }
    });
  }

  onSubmit(): void {
    if (this.equipeForm.invalid) {
      this.equipeForm.markAllAsTouched();
      return;
    }
    const formValue = this.equipeForm.value;
    const projetistaIds: number[] = formValue.projetistaIds;
    this.mockDataService.getProjetistasByIds(projetistaIds).subscribe((projetistasSelecionados: Projetista[]) => {
      const equipeData: Omit<Equipe, 'id'> = {
        nome: formValue.nome,
        descricao: formValue.descricao,
        projetistas: projetistasSelecionados,
        empresaId: formValue.empresaId
      };
      let saveObservable: Observable<Equipe | undefined>;
      if (this.isEditMode && this.equipeId) {
        saveObservable = this.mockDataService.updateEquipe({ ...equipeData, id: this.equipeId });
      } else {
        saveObservable = this.mockDataService.addEquipe(equipeData);
      }
      saveObservable.subscribe(() => {
        this.router.navigate(['/company/equipes']);
      });
    });
  }

  cancel(): void {
    this.router.navigate(['/company/equipes']);
  }
}

