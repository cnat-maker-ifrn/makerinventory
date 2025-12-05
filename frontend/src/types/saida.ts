export interface Saida {
  id: number;

  item: number | null;   
  item_nome: string | null;
  item_codigo: string | null;


  lote: number | null;   
  lote_nome: string | null;      
  lote_codigo: string | null;    

  quantidade: number;
  data_saida: string;
  responsavel: string;
  observacao?: string | null;
}
