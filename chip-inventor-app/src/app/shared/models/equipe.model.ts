import { Projetista } from './projetista.model';

export interface Equipe {
  id: number;
  nome: string;
  descricao?: string;
  projetistas: Projetista[]; // Array de projetistas na equipe
  empresaId?: number; // Para vincular à empresa
}

