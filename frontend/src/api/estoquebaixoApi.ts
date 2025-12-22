import api from "./api";
import type { ProdutoBaixo } from "../types/produtobaixo";

export async function getProdutosBaixoEstoque(): Promise<ProdutoBaixo[]> {
  const [unitarios, fracionados] = await Promise.all([
    api.get("produtos-unitarios/estoque-baixo/"),
    api.get("produtos-fracionados/estoque-baixo/"),
  ]);

  // Lidar com respostas que podem ser arrays ou PaginatedResponse
  const unitariosData = Array.isArray(unitarios.data) 
    ? unitarios.data 
    : unitarios.data.results || [];
    
  const fracionadosData = Array.isArray(fracionados.data) 
    ? fracionados.data 
    : fracionados.data.results || [];

  return [...unitariosData, ...fracionadosData];
}
