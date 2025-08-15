import Observacoes from "./Observacoes";

type StatusManobra = "Na Base" | "Aprimorar" | "Aprender";

export default interface Manobra {
  _id: string;
  nome: string;
  status: StatusManobra;
  observacoes?: Observacoes[];
}
