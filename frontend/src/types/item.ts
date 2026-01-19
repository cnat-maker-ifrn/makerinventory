import type { ProdutoUnitario } from "./produtounitario";

export interface Item {
    id: number;
    produto: number;
    produto_detalhes?: ProdutoUnitario | null;
    preco: number;
    codigo: string;
    foto: string | null;
    nome: string;
    eh_do_cnatmaker: boolean;
    disponibilidade: boolean;
    eh_quebrado: boolean;
    data_entrada: string;
    eh_emprestado: boolean;
    qrcode?: string | null;
}


