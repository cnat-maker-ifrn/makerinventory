export interface ProdutoUnificado {
    id: number;
    nome: string;
    tipo: "unitario" | "fracionado" | string;
    subcategoria: string;
    foto: string | null;
    quantidade: number;
    quantidade_minima: number;
}