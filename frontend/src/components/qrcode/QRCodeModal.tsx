import { useState, useEffect } from "react";
import { MdClose, MdDownload } from "react-icons/md";
import api from "../../api/api";
import { downloadQRCodeItem, downloadQRCodeLote } from "../../api/qrcodeApi";

function buildImageUrl(imagePath: string | undefined | null): string | null {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;
  // Remover '/api/' da baseURL do axios para construir URL da mídia
  const baseUrl = api.defaults.baseURL?.replace('/api/', '') || "http://localhost:8000";
  return `${baseUrl}${imagePath}`;
}

interface QRCodeModalProps {
  open: boolean;
  onClose: () => void;
  item?: {
    id: number;
    nome: string;
    codigo: string;
    foto?: string | null;
    qrcode?: string | null;
  } | null;
  type: "item" | "lote";
  onGenerateQR?: (id: number) => Promise<string | null>;
}

export default function QRCodeModal({
  open,
  onClose,
  item,
  type,
  onGenerateQR,
}: QRCodeModalProps) {
  const [qrcodeUrl, setQrcodeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && item) {
      if (item.qrcode) {
        setQrcodeUrl(buildImageUrl(item.qrcode));
      } else if (onGenerateQR) {
        handleGenerateQR();
      }
    }
  }, [open, item]);

  const handleGenerateQR = async () => {
    if (!item || !onGenerateQR) return;

    setLoading(true);
    try {
      const url = await onGenerateQR(item.id);
      if (url) {
        setQrcodeUrl(url);
      }
    } catch (err) {
      console.error("Erro ao gerar QR code:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadQR = async () => {
    if (!item || !qrcodeUrl) return;

    try {
      if (type === "item") {
        await downloadQRCodeItem(item.id);
      } else {
        await downloadQRCodeLote(item.id);
      }
    } catch (err) {
      console.error("Erro ao baixar QR code:", err);
      alert("Erro ao baixar o QR code");
    }
  };

  if (!item) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center px-4 z-50 transition ${
        open ? "bg-black/40 visible" : "invisible"
      }`}
    >
      {open && (
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              QR Code - {type === "item" ? "Item" : "Lote"}
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-200 rounded-full"
            >
              <MdClose size={24} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Foto */}
            {item.foto && (
              <div className="flex justify-center">
                <img
                  src={buildImageUrl(item.foto) || ""}
                  alt={item.nome}
                  className="w-32 h-32 object-cover rounded-md"
                  onError={(e) => {
                    console.error("Erro ao carregar imagem:", e);
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}

            {/* Informações */}
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="mb-3">
                <div className="text-sm text-gray-600">Nome:</div>
                <div className="font-semibold">{item.nome}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Código:</div>
                <div className="font-mono font-semibold text-lg">{item.codigo}</div>
              </div>
            </div>

            {/* QR Code */}
            {loading ? (
              <div className="flex justify-center p-8">
                <div className="text-gray-500">Gerando QR code...</div>
              </div>
            ) : qrcodeUrl ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="border-4 border-gray-200 p-4 rounded-lg">
                  <img
                    src={qrcodeUrl}
                    alt="QR Code"
                    className="w-40 h-40"
                  />
                </div>
                <button
                  onClick={handleDownloadQR}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <MdDownload size={20} />
                  Baixar QR Code
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                Nenhum QR code disponível
              </div>
            )}
          </div>

          {/* Botão Fechar */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
