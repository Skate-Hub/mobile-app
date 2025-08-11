import Observacoes from "./Observacoes";

export default interface Manobra {
  _id: number;
  nome: string;
  status: string;
  observacoes?: Observacoes[];
}
