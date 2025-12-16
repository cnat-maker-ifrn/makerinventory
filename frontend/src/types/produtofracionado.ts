import type { Subcategoria } from "./subcategoria";

export interface ProdutoFracionado {
    id: number;
    subcategoria: Subcategoria;        
    foto: string | null;
    nome: string;
    unidade_de_medida: "kg" | "g" | "l" | "ml" | "m" | "cm";
    quantidade_minima: number;
    quantidade_em_estoque: number | null;
}
