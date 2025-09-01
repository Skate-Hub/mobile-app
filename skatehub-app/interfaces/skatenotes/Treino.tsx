import Manobra from "./Manobras";

export type Rotatividade = `${number}d` | null; // "1d", "3d" ou null

export interface SecaoTreino {
  manobras: (string | Manobra)[]; // pode vir só os IDs ou objetos populados
  rotatividade: Rotatividade;
  quantManobras: number;
}

export default interface Treino {
  _id: string;
  userId: string;
  plano: string;
  aprender: SecaoTreino;
  aprimorar: SecaoTreino;
  naBase: SecaoTreino;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
