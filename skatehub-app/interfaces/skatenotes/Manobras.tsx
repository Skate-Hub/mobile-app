import Anexo from "./Anexo";

type StatusManobra = "Na Base" | "Aprimorar" | "Aprender";

export default interface Manobra {
  _id: string;
  nome: string;
  status: StatusManobra;
  observacoes?: string;
  anexos?: Anexo
}
