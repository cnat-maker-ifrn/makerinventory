export interface Mov {
    id: number;
    produto_nome: string;
    tipo_movimentacao: string;
    quantidade: number;
    data_movimentacao: string;
    origem: string;
}

interface ListMovimentacaoProps {
    dados: Mov[];
}

export default function ListMovimentacao({ dados }: ListMovimentacaoProps) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-[#29854A] text-white text-[18px]">
                    <tr>
                        <th className="p-4">Produto</th>
                        <th className="p-4">Tipo</th>
                        <th className="p-4">Quantidade</th>
                        <th className="p-4">Data</th>
                        <th className="p-4">Origem</th>
                    </tr>
                </thead>

                <tbody>
                    {dados.map((m) => (
                        <tr key={m.id} className="hover:bg-gray-100 transition">
                            <td className="p-4">{m.produto_nome}</td>
                            <td className="p-4">{m.tipo_movimentacao}</td>
                            <td className="p-4">{m.quantidade}</td>
                            <td className="p-4">
                                {new Date(m.data_movimentacao).toLocaleString()}
                            </td>
                            <td className="p-4">{m.origem}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {dados.length === 0 && (
                <p className="text-center p-6 text-gray-600">
                    Nenhuma movimentação.
                </p>
            )}
        </div>
    );
}
