import api from "../api/api";

function buildImageUrl(imagePath: string | undefined | null): string | null {
  if (!imagePath) return null;
  // Se já começa com http/https, retorna como está
  if (imagePath.startsWith("http")) return imagePath;
  // Remover '/api/' da baseURL do axios para construir URL da mídia
  const baseUrl = api.defaults.baseURL?.replace('/api/', '') || "http://localhost:8000";
  return `${baseUrl}${imagePath}`;
}

export async function gerarQRCodeItem(itemId: number): Promise<string | null> {
  try {
    const response = await api.post(`/itens/${itemId}/gerar-qrcode/`);
    return buildImageUrl(response.data.qrcode_url);
  } catch (error) {
    console.error("Erro ao gerar QR code do item:", error);
    return null;
  }
}

export async function gerarQRCodeLote(loteId: number): Promise<string | null> {
  try {
    const response = await api.post(`/lotes/${loteId}/gerar-qrcode/`);
    return buildImageUrl(response.data.qrcode_url);
  } catch (error) {
    console.error("Erro ao gerar QR code do lote:", error);
    return null;
  }
}

export async function buscarItemPorCodigo(codigo: string): Promise<any | null> {
  try {
    // Busca sem paginação para pegar todos os resultados
    const response = await api.get(`/itens/?search=${codigo}`);
    
    let itens = response.data;
    if (response.data.results) {
      itens = response.data.results;
    }
    
    // Garante que é um array
    if (!Array.isArray(itens)) {
      itens = [itens];
    }
    
    // Busca exato por código
    const item = itens.find((i: any) => i.codigo === codigo);
    
    if (item) {
      console.log("Item encontrado:", item);
      // Constrói URLs completas para fotos e QR codes
      return {
        ...item,
        foto: item.foto ? buildImageUrl(item.foto) : null,
        qrcode: item.qrcode ? buildImageUrl(item.qrcode) : null,
      };
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar item:", error);
    return null;
  }
}

export async function buscarLotePorCodigo(codigo: string): Promise<any | null> {
  try {
    // Busca sem paginação para pegar todos os resultados
    const response = await api.get(`/lotes/?search=${codigo}`);
    
    let lotes = response.data;
    if (response.data.results) {
      lotes = response.data.results;
    }
    
    // Garante que é um array
    if (!Array.isArray(lotes)) {
      lotes = [lotes];
    }
    
    // Busca exato por código
    const lote = lotes.find((l: any) => l.codigo === codigo);
    
    if (lote) {
      console.log("Lote encontrado:", lote);
      // Constrói URLs completas para fotos e QR codes
      return {
        ...lote,
        foto: lote.foto ? buildImageUrl(lote.foto) : null,
        qrcode: lote.qrcode ? buildImageUrl(lote.qrcode) : null,
      };
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar lote:", error);
    return null;
  }
}

export async function downloadQRCodeItem(itemId: number): Promise<void> {
  try {
    const response = await api.get(`/itens/${itemId}/download-qrcode/`, {
      responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `qrcode_item_${itemId}.png`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Erro ao baixar QR code do item:", error);
    throw error;
  }
}

export async function downloadQRCodeLote(loteId: number): Promise<void> {
  try {
    const response = await api.get(`/lotes/${loteId}/download-qrcode/`, {
      responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `qrcode_lote_${loteId}.png`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Erro ao baixar QR code do lote:", error);
    throw error;
  }
}