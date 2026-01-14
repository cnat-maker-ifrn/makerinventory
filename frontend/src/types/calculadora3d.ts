export interface Impressora {
  id: string;
  nome: string;
  precoCompra: number;
  consumoWatts: number;
  vidaUtiHoras: number;
  custoManutencaoMensal: number;
}

export interface CalculadoraPrecosData {
  // Materiais
  pesoGramas: number;
  precoGramaMateria: number;
  percentualPerdaMateria: number;

  // Energia
  tempoImpressaoHoras: number;
  kWhValor: number;

  // Máquina
  impressoraSelecionada: Impressora;

  // Mão de obra
  tempoModelagem: number; // em horas
  tempoAcabamento: number; // em horas

  // Taxa de falha
  percentualTaxaFalha: number;

  // Custos adicionais
  custosEmbalagem: number;
  comissaoPlatafirma: number;
  percentualImpostos: number;
  percentualMargemLucro: number;
}

export interface ResultadoCalculadora {
  custoMaterial: number;
  custoEnergia: number;
  custoDepreciacaoMaquina: number;
  custoManutencaoMaquina: number;
  custoMaoObra: number;
  custoPorFalha: number;
  custosAdicionais: number;
  subtotalCustos: number;
  impostos: number;
  margem: number;
  precoFinal: number;
}
