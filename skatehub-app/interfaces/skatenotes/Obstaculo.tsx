import Manobra from "./Manobras";

export default interface Obstaculo {
  id: number;
  nome: string;
  manobras: Manobra[]
}