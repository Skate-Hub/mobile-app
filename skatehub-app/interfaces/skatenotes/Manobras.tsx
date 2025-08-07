import Observacoes from "./Observacoes";

export default interface Manobra {
  id: number;
  nome: string;
  status: string;
  observacoes?: Observacoes[];
}
