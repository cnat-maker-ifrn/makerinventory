import { useState } from "react";
import type { CalculadoraPrecosData, ResultadoCalculadora } from "../types/calculadora3d";
import { IMPRESSORAS_LISTA, IMPRESSORAS_DISPONIVEL } from "../config/impressoras";

const calcularPrecosFinais = (dados: CalculadoraPrecosData): ResultadoCalculadora => {
    const impressora = dados.impressoraSelecionada;

    // 1. Custo de Material
    let custoMaterial = 0;
    for (let i = 0; i < 4; i++) {
        const filamento = dados.filamentos[i];
        if (filamento) {
            const pesoComPerda = filamento.peso + (i === 0 ? dados.pesoPerdaMaterial : 0);
            const precoGramaFilamento = filamento.preco / 1000;
            custoMaterial += pesoComPerda * precoGramaFilamento;
        }
    }

    // 2. Custo de Energia
    const custoEnergia =
        (impressora.consumoWatts / 1000) * dados.tempoImpressaoHoras * dados.kWhValor;

    // 3. Depreciação da Máquina
    const custoDepreciacaoMaquina = (impressora.precoCompra / impressora.vidaUtiHoras) * dados.tempoImpressaoHoras;

    // 4. Manutenção da Máquina (por hora de impressão)
    const custoManutencaoMaquina = (impressora.custoManutencaoMensal / 160) * dados.tempoImpressaoHoras; // 160 horas/mês

    // 5. Mão de Obra
    const valorHoraTrabalho = 9.21;
    const tempoTotalMaoObra = dados.tempoModelagem + dados.tempoAcabamento;
    const custoMaoObra = tempoTotalMaoObra * valorHoraTrabalho;

    // Subtotal antes da taxa de falha
    const subtotalAntesDeTaxaFalha =
        custoMaterial + custoEnergia + custoDepreciacaoMaquina + custoManutencaoMaquina + custoMaoObra;

    // 6. Taxa de Falha (Risco)
    const custoPorFalha = subtotalAntesDeTaxaFalha * (dados.percentualTaxaFalha / 100);

    // 7. Custos Adicionais
    const taxaComissao = dados.comissaoPlatafirma / 100;
    const custosAdicionais = dados.custosEmbalagem;

    // Subtotal de custos
    const subtotalCustos =
        custoMaterial +
        custoEnergia +
        custoDepreciacaoMaquina +
        custoManutencaoMaquina +
        custoMaoObra +
        custoPorFalha +
        custosAdicionais;

    // Impostos
    const impostos = subtotalCustos * (dados.percentualImpostos / 100);

    // Margem de Lucro
    const margem = (subtotalCustos + impostos) * (dados.percentualMargemLucro / 100);

    // Preço Final
    const precoFinal = (subtotalCustos + impostos + margem) / (1 - taxaComissao);

    return {
        custoMaterial,
        custoEnergia,
        custoDepreciacaoMaquina,
        custoManutencaoMaquina,
        custoMaoObra,
        custoPorFalha,
        custosAdicionais,
        subtotalCustos,
        impostos,
        margem,
        precoFinal,
    };
};

export default function Calculadora3D() {
    const impressoraPadrao = IMPRESSORAS_LISTA[0];
    const [modoImpressora, setModoImpressora] = useState<"cadastrada" | "customizada">("cadastrada");
    const [impressoraCustomizada, setImpressoraCustomizada] = useState({
        precoCompra: 1500,
        consumoWatts: 220,
        vidaUtiHoras: 5000,
        custoManutencaoMensal: 50,
    });

    const [dados, setDados] = useState<CalculadoraPrecosData>({
        filamentos: [
            { peso: 0, preco: 0.12 },
            null,
            null,
            null,
        ],
        pesoPerdaMaterial: 5,
        tempoImpressaoHoras: 10,
        kWhValor: 0.8,
        impressoraSelecionada: impressoraPadrao,
        tempoModelagem: 0.5,
        tempoAcabamento: 1,
        percentualTaxaFalha: 15,
        custosEmbalagem: 10,
        comissaoPlatafirma: 0,
        percentualImpostos: 0,
        percentualMargemLucro: 30,
    });

    const [resultado, setResultado] = useState<ResultadoCalculadora | null>(null);

    const calcular = () => {
        const res = calcularPrecosFinais(dados);
        setResultado(res);
    };

    const handleInputChange = (
        field: keyof CalculadoraPrecosData,
        value: string | number
    ) => {
        const numValue = typeof value === "string" ? parseFloat(value) || 0 : value;
        setDados((prev) => ({
            ...prev,
            [field]: numValue,
        }));
    };

    const handleFilamentoChange = (
        index: number,
        field: "peso" | "preco",
        value: string
    ) => {
        const numValue = parseFloat(value) || 0;
        setDados((prev) => {
            const novoFilamentos = [...prev.filamentos] as [any, any, any, any];
            if (!novoFilamentos[index]) {
                novoFilamentos[index] = { peso: 0, preco: 0.12 };
            }
            novoFilamentos[index] = { ...novoFilamentos[index], [field]: numValue };
            return { ...prev, filamentos: novoFilamentos };
        });
    };

    const handleRemoverFilamento = (index: number) => {
        setDados((prev) => {
            const novoFilamentos = [...prev.filamentos] as [any, any, any, any];
            novoFilamentos[index] = null;
            return { ...prev, filamentos: novoFilamentos };
        });
    };

    const handleImpressoraChange = (impressoraId: string) => {
        const impressoraSelecionada = IMPRESSORAS_DISPONIVEL[impressoraId];
        if (impressoraSelecionada) {
            setDados((prev) => ({
                ...prev,
                impressoraSelecionada,
            }));
        }
    };

    const handleImpressoraCustomizadaChange = (field: keyof typeof impressoraCustomizada, value: string) => {
        const numValue = parseFloat(value) || 0;
        const novaCustomizada = { ...impressoraCustomizada, [field]: numValue };
        setImpressoraCustomizada(novaCustomizada);

        // Atualizar também o dados com a impressora customizada
        setDados((prev) => ({
            ...prev,
            impressoraSelecionada: {
                id: "customizada",
                nome: "Impressora Personalizada",
                ...novaCustomizada,
            },
        }));
    };

    const handleModoImpressoraChange = (modo: "cadastrada" | "customizada") => {
        setModoImpressora(modo);

        if (modo === "cadastrada") {
            // Voltar para impressora cadastrada
            const impressoraSelecionada = IMPRESSORAS_DISPONIVEL[impressoraPadrao.id];
            if (impressoraSelecionada) {
                setDados((prev) => ({
                    ...prev,
                    impressoraSelecionada,
                }));
            }
        } else {
            // Usar customizada
            setDados((prev) => ({
                ...prev,
                impressoraSelecionada: {
                    id: "customizada",
                    nome: "Impressora Personalizada",
                    ...impressoraCustomizada,
                },
            }));
        }
    }

    const formatarMoeda = (valor: number): string => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(valor);
    };

    return (
        <div className="w-full h-screen overflow-y-auto bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    Calculadora de Preços 3D
                </h1>
                <p className="text-gray-600 mb-8">
                    Calcule o preço final de suas impressões 3D considerando todos os custos envolvidos.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Formulário */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Seção 1: Custos de Materiais */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                                1. Custos de Materiais
                            </h2>
                            <div className="space-y-4">
                                {/* Filamentos */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Filamentos (até 4)
                                    </label>
                                    <div className="space-y-3">
                                        {[0, 1, 2, 3].map((index) => (
                                            <div key={index}>
                                                {dados.filamentos[index] ? (
                                                    <div className="flex gap-2 items-end">
                                                        <div className="flex-1">
                                                            <label className="block text-xs text-gray-600 mb-1">
                                                                Filamento {index + 1} - Peso da peça (g)
                                                            </label>
                                                            <input
                                                                type="number"
                                                                value={dados.filamentos[index]?.peso || ""}
                                                                onChange={(e) =>
                                                                    handleFilamentoChange(index, "peso", e.target.value)
                                                                }
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                                                step="0.1"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <label className="block text-xs text-gray-600 mb-1">
                                                                Preço do filamento (R$/kg)
                                                            </label>
                                                            <input
                                                                type="number"
                                                                value={dados.filamentos[index]?.preco || ""}
                                                                onChange={(e) =>
                                                                    handleFilamentoChange(index, "preco", e.target.value)
                                                                }
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                                                step="0.01"
                                                            />
                                                        </div>
                                                        <button
                                                            onClick={() => handleRemoverFilamento(index)}
                                                            className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ) : index === 0 || dados.filamentos[index - 1] ? (
                                                    <button
                                                        onClick={() =>
                                                            handleFilamentoChange(index, "peso", "0")
                                                        }
                                                        className="w-full py-2 px-3 border-2 border-dashed border-teal-300 rounded-lg text-teal-600 hover:bg-teal-50 transition-colors"
                                                    >
                                                        + Adicionar Filamento {index + 1}
                                                    </button>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Você pode adicionar até 4 filamentos para cálculos com múltiplas cores
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Perda de Material (g)
                                    </label>
                                    <input
                                        type="number"
                                        value={dados.pesoPerdaMaterial}
                                        onChange={(e) =>
                                            handleInputChange("pesoPerdaMaterial", e.target.value)
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                        step="0.1"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Caso for usar a Bambu
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Seção 2: Consumo de Energia */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                                2. Consumo de Energia Elétrica
                            </h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 items-end"> {/* items-end alinha as bases dos inputs */}

                                    {/* Coluna Tempo */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tempo de Impressão (Horas:Minutos)
                                        </label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    placeholder="HH"
                                                    value={Math.floor(dados.tempoImpressaoHoras) || ""}
                                                    onChange={(e) => {
                                                        const h = parseInt(e.target.value) || 0;
                                                        const m = (dados.tempoImpressaoHoras % 1) * 60;
                                                        handleInputChange("tempoImpressaoHoras", h + m / 60);
                                                    }}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-center"
                                                />
                                            </div>
                                            <span className="self-center font-bold text-gray-400">:</span>
                                            <div className="relative flex-1">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="59"
                                                    placeholder="MM"
                                                    value={Math.round((dados.tempoImpressaoHoras % 1) * 60) || ""}
                                                    onChange={(e) => {
                                                        const h = Math.floor(dados.tempoImpressaoHoras);
                                                        const m = parseInt(e.target.value) || 0;
                                                        handleInputChange("tempoImpressaoHoras", h + m / 60);
                                                    }}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-center"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Coluna kWh */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Valor do kWh (R$)
                                        </label>
                                        <input
                                            type="number"
                                            value={dados.kWhValor}
                                            onChange={(e) => handleInputChange("kWhValor", e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                            step="0.01"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500">
                                    * O consumo da máquina varia de acordo com a impressora selecionada
                                </p>
                            </div>
                        </div>

                        {/* Seção 3: Depreciação e Manutenção */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                                3. Impressora (Depreciação e Manutenção)
                            </h2>

                            {/* Seleção de Modo */}
                            <div className="mb-6 flex gap-2">
                                <button
                                    onClick={() => handleModoImpressoraChange("cadastrada")}
                                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${modoImpressora === "cadastrada"
                                        ? "bg-teal-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    Cadastrada
                                </button>
                                <button
                                    onClick={() => handleModoImpressoraChange("customizada")}
                                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${modoImpressora === "customizada"
                                        ? "bg-teal-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    Personalizada
                                </button>
                            </div>

                            <div className="space-y-4">
                                {modoImpressora === "cadastrada" ? (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Selecione a Impressora
                                            </label>
                                            <select
                                                value={dados.impressoraSelecionada.id}
                                                onChange={(e) => handleImpressoraChange(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                                            >
                                                {IMPRESSORAS_LISTA.map((imp) => (
                                                    <option key={imp.id} value={imp.id}>
                                                        {imp.nome}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                                            <p className="text-sm">
                                                <strong>Preço de Compra:</strong>{" "}
                                                {formatarMoeda(dados.impressoraSelecionada.precoCompra)}
                                            </p>
                                            <p className="text-sm">
                                                <strong>Consumo Elétrico:</strong> {dados.impressoraSelecionada.consumoWatts}W
                                            </p>
                                            <p className="text-sm">
                                                <strong>Vida Útil Estimada:</strong>{" "}
                                                {dados.impressoraSelecionada.vidaUtiHoras.toLocaleString("pt-BR")} horas
                                            </p>
                                            <p className="text-sm">
                                                <strong>Custo de Manutenção Mensal:</strong>{" "}
                                                {formatarMoeda(dados.impressoraSelecionada.custoManutencaoMensal)}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Preço de Compra (R$)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={impressoraCustomizada.precoCompra}
                                                    onChange={(e) =>
                                                        handleImpressoraCustomizadaChange("precoCompra", e.target.value)
                                                    }
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                                    step="100"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Consumo Elétrico (Watts)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={impressoraCustomizada.consumoWatts}
                                                    onChange={(e) =>
                                                        handleImpressoraCustomizadaChange("consumoWatts", e.target.value)
                                                    }
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                                    step="10"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Vida Útil Estimada (horas)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={impressoraCustomizada.vidaUtiHoras}
                                                    onChange={(e) =>
                                                        handleImpressoraCustomizadaChange("vidaUtiHoras", e.target.value)
                                                    }
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                                    step="100"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Custo Manutenção Mensal (R$)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={impressoraCustomizada.custoManutencaoMensal}
                                                    onChange={(e) =>
                                                        handleImpressoraCustomizadaChange("custoManutencaoMensal", e.target.value)
                                                    }
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                                    step="10"
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-teal-50 border border-teal-200 p-4 rounded-lg space-y-2">
                                            <p className="text-sm">
                                                <strong>Preço de Compra:</strong>{" "}
                                                {formatarMoeda(impressoraCustomizada.precoCompra)}
                                            </p>
                                            <p className="text-sm">
                                                <strong>Consumo Elétrico:</strong> {impressoraCustomizada.consumoWatts}W
                                            </p>
                                            <p className="text-sm">
                                                <strong>Vida Útil Estimada:</strong>{" "}
                                                {impressoraCustomizada.vidaUtiHoras.toLocaleString("pt-BR")} horas
                                            </p>
                                            <p className="text-sm">
                                                <strong>Custo de Manutenção Mensal:</strong>{" "}
                                                {formatarMoeda(impressoraCustomizada.custoManutencaoMensal)}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Seção 4: Mão de Obra */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                                4. Mão de Obra
                            </h2>
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4 items-start"> {/* items-start para alinhar pelo topo devido aos parágrafos explicativos */}

                                    {/* Campo: Modelagem */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Modelagem (H:M)
                                        </label>
                                        <div className="flex gap-2">
                                            <div className="flex-1">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    placeholder="HH"
                                                    value={Math.floor(dados.tempoModelagem) || ""}
                                                    onChange={(e) => {
                                                        const h = parseInt(e.target.value) || 0;
                                                        const m = (dados.tempoModelagem % 1) * 60;
                                                        handleInputChange("tempoModelagem", h + m / 60);
                                                    }}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-center"
                                                />
                                            </div>
                                            <span className="self-center font-bold text-gray-400">:</span>
                                            <div className="flex-1">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="59"
                                                    placeholder="MM"
                                                    value={Math.round((dados.tempoModelagem % 1) * 60) || ""}
                                                    onChange={(e) => {
                                                        const h = Math.floor(dados.tempoModelagem);
                                                        const m = parseInt(e.target.value) || 0;
                                                        handleInputChange("tempoModelagem", h + m / 60);
                                                    }}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-center"
                                                />
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Fatiamento, preparação
                                        </p>
                                    </div>

                                    {/* Campo: Acabamento */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Acabamento (H:M)
                                        </label>
                                        <div className="flex gap-2">
                                            <div className="flex-1">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    placeholder="HH"
                                                    value={Math.floor(dados.tempoAcabamento) || ""}
                                                    onChange={(e) => {
                                                        const h = parseInt(e.target.value) || 0;
                                                        const m = (dados.tempoAcabamento % 1) * 60;
                                                        handleInputChange("tempoAcabamento", h + m / 60);
                                                    }}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-center"
                                                />
                                            </div>
                                            <span className="self-center font-bold text-gray-400">:</span>
                                            <div className="flex-1">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="59"
                                                    placeholder="MM"
                                                    value={Math.round((dados.tempoAcabamento % 1) * 60) || ""}
                                                    onChange={(e) => {
                                                        const h = Math.floor(dados.tempoAcabamento);
                                                        const m = parseInt(e.target.value) || 0;
                                                        handleInputChange("tempoAcabamento", h + m / 60);
                                                    }}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-center"
                                                />
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Remoção de suportes, lixamento
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Seção 5: Taxa de Falha */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                                5. Taxa de Falha (Risco)
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Percentual de Risco (%)
                                    </label>
                                    <input
                                        type="number"
                                        value={dados.percentualTaxaFalha}
                                        onChange={(e) =>
                                            handleInputChange("percentualTaxaFalha", e.target.value)
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                        step="1"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Margem para cobrir impressões que deram errado (10-20% recomendado)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Seção 6: Custos Adicionais */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                                6. Custos Adicionais
                            </h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Acessórios (R$)
                                        </label>
                                        <input
                                            type="number"
                                            value={dados.custosEmbalagem}
                                            onChange={(e) =>
                                                handleInputChange("custosEmbalagem", e.target.value)
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                            step="1"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Embalagens, chaveiros e etc.
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Comissão Plataforma (%)
                                        </label>
                                        <input
                                            type="number"
                                            value={dados.comissaoPlatafirma}
                                            onChange={(e) =>
                                                handleInputChange("comissaoPlatafirma", e.target.value)
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                            step="1"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Impostos (%)
                                        </label>
                                        <input
                                            type="number"
                                            value={dados.percentualImpostos}
                                            onChange={(e) =>
                                                handleInputChange("percentualImpostos", e.target.value)
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                            step="0.1"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Margem de Lucro (%)
                                        </label>
                                        <input
                                            type="number"
                                            value={dados.percentualMargemLucro}
                                            onChange={(e) =>
                                                handleInputChange("percentualMargemLucro", e.target.value)
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                            step="1"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Botão Calcular */}
                        <button
                            onClick={calcular}
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                        >
                            Calcular Preço Final
                        </button>
                    </div>

                    {/* Resultado */}
                    {resultado && (
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                                    Resultado
                                </h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Material:</span>
                                        <span className="font-medium">
                                            {formatarMoeda(resultado.custoMaterial)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Energia:</span>
                                        <span className="font-medium">
                                            {formatarMoeda(resultado.custoEnergia)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Depreciação Máquina:</span>
                                        <span className="font-medium">
                                            {formatarMoeda(resultado.custoDepreciacaoMaquina)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Manutenção Máquina:</span>
                                        <span className="font-medium">
                                            {formatarMoeda(resultado.custoManutencaoMaquina)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Mão de Obra:</span>
                                        <span className="font-medium">
                                            {formatarMoeda(resultado.custoMaoObra)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Taxa de Falha:</span>
                                        <span className="font-medium">
                                            {formatarMoeda(resultado.custoPorFalha)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Custos Adicionais:</span>
                                        <span className="font-medium">
                                            {formatarMoeda(resultado.custosAdicionais)}
                                        </span>
                                    </div>

                                    <div className="border-t pt-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Subtotal:</span>
                                            <span className="font-semibold">
                                                {formatarMoeda(resultado.subtotalCustos)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Impostos:</span>
                                        <span className="font-medium">
                                            {formatarMoeda(resultado.impostos)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Margem de Lucro:</span>
                                        <span className="font-medium text-green-600">
                                            {formatarMoeda(resultado.margem)}
                                        </span>
                                    </div>

                                    <div className="border-t pt-3">
                                        <div className="flex justify-between">
                                            <span className="text-lg font-bold text-gray-800">
                                                Preço Final:
                                            </span>
                                            <span className="text-2xl font-bold text-teal-600">
                                                {formatarMoeda(resultado.precoFinal)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setResultado(null)}
                                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition-colors duration-200"
                                >
                                    Limpar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
