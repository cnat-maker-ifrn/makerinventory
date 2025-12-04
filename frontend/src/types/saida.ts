export interface Saida {
  id: number;
  item: {
    id: number;
    nome: string;
    codigo: string;
  } | null;

  lote: {
    id: number;
    nome: string;
    codigo: string;
  } | null;

  quantidade: number;
  responsavel: string;
  data_saida: string;
}
