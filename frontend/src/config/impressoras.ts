import { type Impressora } from "../types/calculadora3d";

export const IMPRESSORAS_DISPONIVEL: Record<string, Impressora> = {
  creality_ender_3_v3_se: {
    id: "creality_ender_3_v3_se",
    nome: "Creality Ender 3 V3 Se",
    precoCompra: 1500,
    consumoWatts: 220,
    vidaUtiHoras: 5000,
    custoManutencaoMensal: 50,
  },
  bambu_lab_a1_combo: {
    id: "bambu_lab_a1_combo",
    nome: "Bambu Lab A1 Combo",
    precoCompra: 6999,
    consumoWatts: 320,
    vidaUtiHoras: 8000,
    custoManutencaoMensal: 100,
  },
  creality_k1_series: {
    id: "creality_k1_series",
    nome: "Creality K1 Series",
    precoCompra: 8999,
    consumoWatts: 350,
    vidaUtiHoras: 8500,
    custoManutencaoMensal: 120,
  },
  flashforge_finder_2: {
    id: "flashforge_finder_2",
    nome: "Flashforge Finder 2 3d Printer",
    precoCompra: 2500,
    consumoWatts: 250,
    vidaUtiHoras: 5500,
    custoManutencaoMensal: 60,
  },
};

export const IMPRESSORAS_LISTA = Object.values(IMPRESSORAS_DISPONIVEL);