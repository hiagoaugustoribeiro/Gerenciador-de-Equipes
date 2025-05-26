export interface Projetista {
  id: number;
  nome: string;
  email: string;
  cargo?: string;
  empresaId?: number; // Para vincular à empresa, se necessário
}

