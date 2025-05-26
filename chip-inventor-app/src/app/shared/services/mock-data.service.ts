import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Empresa } from '../models/empresa.model';
import { Projetista } from '../models/projetista.model';
import { Equipe } from '../models/equipe.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  private empresas: Empresa[] = [
    { id: 1, nome: 'Empresa Alpha', cnpj: '11.111.111/0001-11', endereco: 'Rua A, 123' },
    { id: 2, nome: 'Empresa Beta', cnpj: '22.222.222/0001-22', endereco: 'Av. B, 456' },
  ];

  private projetistas: Projetista[] = [
    { id: 101, nome: 'Carlos Silva', email: 'carlos.silva@alpha.com', cargo: 'Engenheiro', empresaId: 1 },
    { id: 102, nome: 'Ana Souza', email: 'ana.souza@alpha.com', cargo: 'Designer', empresaId: 1 },
    { id: 103, nome: 'Pedro Lima', email: 'pedro.lima@beta.com', cargo: 'Desenvolvedor', empresaId: 2 },
  ];

  private equipes: Equipe[] = [
    { id: 201, nome: 'Equipe Inovação', descricao: 'Focada em novos produtos', projetistas: [this.projetistas[0], this.projetistas[1]], empresaId: 1 },
    { id: 202, nome: 'Equipe Desenvolvimento Core', descricao: 'Manutenção do sistema principal', projetistas: [this.projetistas[2]], empresaId: 2 },
  ];

  private empresas$ = new BehaviorSubject<Empresa[]>([...this.empresas]);
  private projetistas$ = new BehaviorSubject<Projetista[]>([...this.projetistas]);
  private equipes$ = new BehaviorSubject<Equipe[]>([...this.equipes]);

  private nextEmpresaId = 3;
  private nextProjetistaId = 104;
  private nextEquipeId = 203;

  constructor() { }

  // --- Empresa CRUD ---
  getEmpresas(): Observable<Empresa[]> {
    return this.empresas$.asObservable();
  }

  getEmpresaById(id: number): Observable<Empresa | undefined> {
    return this.empresas$.pipe(
      map(empresas => empresas.find(e => e.id === id))
    );
  }

  addEmpresa(empresa: Omit<Empresa, 'id'>): Observable<Empresa> {
    const novaEmpresa: Empresa = { ...empresa, id: this.nextEmpresaId++ };
    this.empresas.push(novaEmpresa);
    this.empresas$.next([...this.empresas]);
    return of(novaEmpresa);
  }

  updateEmpresa(empresaAtualizada: Empresa): Observable<Empresa | undefined> {
    const index = this.empresas.findIndex(e => e.id === empresaAtualizada.id);
    if (index !== -1) {
      this.empresas[index] = empresaAtualizada;
      this.empresas$.next([...this.empresas]);
      return of(empresaAtualizada);
    }
    return of(undefined); // Ou lançar erro
  }

  deleteEmpresa(id: number): Observable<boolean> {
    const initialLength = this.empresas.length;
    this.empresas = this.empresas.filter(e => e.id !== id);
    if (this.empresas.length < initialLength) {
      this.empresas$.next([...this.empresas]);
      // Opcional: remover projetistas e equipes associadas
      this.projetistas = this.projetistas.filter(p => p.empresaId !== id);
      this.projetistas$.next([...this.projetistas]);
      this.equipes = this.equipes.filter(eq => eq.empresaId !== id);
      this.equipes$.next([...this.equipes]);
      return of(true);
    }
    return of(false);
  }

  // --- Projetista CRUD (Assume que é gerenciado por uma Empresa específica) ---
  getProjetistas(empresaId?: number): Observable<Projetista[]> {
    if (empresaId) {
        return this.projetistas$.pipe(
            map(projetistas => projetistas.filter(p => p.empresaId === empresaId))
        );
    }
    return this.projetistas$.asObservable();
  }

  getProjetistaById(id: number): Observable<Projetista | undefined> {
    return this.projetistas$.pipe(
      map(projetistas => projetistas.find(p => p.id === id))
    );
  }

  addProjetista(projetista: Omit<Projetista, 'id'>): Observable<Projetista> {
    const novoProjetista: Projetista = { ...projetista, id: this.nextProjetistaId++ };
    this.projetistas.push(novoProjetista);
    this.projetistas$.next([...this.projetistas]);
    return of(novoProjetista);
  }

  updateProjetista(projetistaAtualizado: Projetista): Observable<Projetista | undefined> {
    const index = this.projetistas.findIndex(p => p.id === projetistaAtualizado.id);
    if (index !== -1) {
      this.projetistas[index] = projetistaAtualizado;
      this.projetistas$.next([...this.projetistas]);
      // Atualizar projetista dentro das equipes
      this.equipes.forEach(equipe => {
        const projIndex = equipe.projetistas.findIndex(p => p.id === projetistaAtualizado.id);
        if (projIndex !== -1) {
          equipe.projetistas[projIndex] = projetistaAtualizado;
        }
      });
      this.equipes$.next([...this.equipes]);
      return of(projetistaAtualizado);
    }
    return of(undefined);
  }

  deleteProjetista(id: number): Observable<boolean> {
    const initialLength = this.projetistas.length;
    this.projetistas = this.projetistas.filter(p => p.id !== id);
    if (this.projetistas.length < initialLength) {
      this.projetistas$.next([...this.projetistas]);
      // Remover projetista das equipes
      this.equipes.forEach(equipe => {
        equipe.projetistas = equipe.projetistas.filter(p => p.id !== id);
      });
      this.equipes$.next([...this.equipes]);
      return of(true);
    }
    return of(false);
  }

  // --- Equipe CRUD (Assume que é gerenciado por uma Empresa específica) ---
  getEquipes(empresaId?: number): Observable<Equipe[]> {
     if (empresaId) {
        return this.equipes$.pipe(
            map(equipes => equipes.filter(eq => eq.empresaId === empresaId))
        );
    }
    return this.equipes$.asObservable();
  }

  getEquipeById(id: number): Observable<Equipe | undefined> {
    return this.equipes$.pipe(
      map(equipes => equipes.find(eq => eq.id === id))
    );
  }

  addEquipe(equipe: Omit<Equipe, 'id'>): Observable<Equipe> {
    const novaEquipe: Equipe = { ...equipe, id: this.nextEquipeId++ };
    this.equipes.push(novaEquipe);
    this.equipes$.next([...this.equipes]);
    return of(novaEquipe);
  }

  updateEquipe(equipeAtualizada: Equipe): Observable<Equipe | undefined> {
    const index = this.equipes.findIndex(eq => eq.id === equipeAtualizada.id);
    if (index !== -1) {
      this.equipes[index] = equipeAtualizada;
      this.equipes$.next([...this.equipes]);
      return of(equipeAtualizada);
    }
    return of(undefined);
  }

  deleteEquipe(id: number): Observable<boolean> {
    const initialLength = this.equipes.length;
    this.equipes = this.equipes.filter(eq => eq.id !== id);
    if (this.equipes.length < initialLength) {
      this.equipes$.next([...this.equipes]);
      return of(true);
    }
    return of(false);
  }

  // Helper para obter projetistas por ID (usado no form de equipe)
  getProjetistasByIds(ids: number[]): Observable<Projetista[]> {
    return this.projetistas$.pipe(
      map(projetistas => projetistas.filter(p => ids.includes(p.id)))
    );
  }
}

