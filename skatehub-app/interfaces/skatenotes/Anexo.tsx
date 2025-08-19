export default interface Anexo {
  _id?: string; 
  url: string;
  caminhoFirebase: string;
  tipo: "imagem" | "video";
  nomeOriginal: string;
  tamanho: number;
  formato?: string;
  metadata?: {
    largura?: number;
    altura?: number;
    duracao?: number;
  };
}