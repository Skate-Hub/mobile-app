import Manobra from "./Manobras";

export default interface Obstaculo {
  _id: string;
  nome: string;
  manobras: Manobra[]
}