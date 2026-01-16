# Guia de Uso - Calculadora de Preços 3D

## Sobre a Calculadora

A Calculadora de Preços 3D é uma ferramenta completa para calcular o preço final de impressões 3D considerando todos os custos envolvidos na operação.

## Como Usar

### 1. Acessar a Calculadora
- No menu lateral (Aside), clique em "Calculadora 3D" para acessar a ferramenta

### 2. Preencher os Campos
A calculadora está organizada em 6 seções:

#### 1. Custos de Materiais
- **Peso da Peça (gramas)**: Peso total incluindo suportes e brim/raft
- **Preço por Grama**: Divida o valor do carretel pelo peso (ex: R$ 120,00 / 1000g = R$ 0,12)
- **Perda de Material (%)**: Margem para purgas e sobras (recomendado: 5%)

#### 2. Consumo de Energia Elétrica
- **Tempo de Impressão (horas)**: Tempo total que a máquina ficará ligada
- **Valor do kWh**: Consulte sua conta de luz

#### 3. Impressora (Depreciação e Manutenção)
- **Selecione a Impressora**: Dropdown com modelos pré-configurados
- Os valores de consumo, vida útil e manutenção são preenchidos automaticamente

#### 4. Mão de Obra
- **Tempo de Setup (horas)**: Tempo gasto fatiando e preparando
- **Tempo de Pós-Processamento (horas)**: Remoção de suportes, lixamento, etc
- **Taxa Horária**: Quanto você quer ganhar por hora de trabalho

#### 5. Taxa de Falha (Risco)
- **Percentual de Risco (%)**: Margem para cobrir impressões que deram errado (recomendado: 10-20%)

#### 6. Custos Adicionais
- **Embalagem**: Caixas, plástico bolha, fita, etiquetas
- **Comissão Plataforma**: Se vender em Mercado Livre, Shopee, etc
- **Impostos (%)**: ICMS, IPI ou outros impostos da operação
- **Margem de Lucro (%)**: Lucro desejado sobre os custos (recomendado: 25-35%)

### 3. Ver Resultado
Após preencher todos os campos, clique em "Calcular Preço Final" para ver o resultado detalhado com:
- Custo de cada componente
- Subtotal de custos
- Impostos
- Margem de lucro
- **Preço Final** (em destaque)

---

## Adicionar Novas Impressoras

### Localização do Arquivo
`frontend/src/config/impressoras.ts`

### Como Adicionar

1. Abra o arquivo `impressoras.ts`

2. Adicione uma nova entrada no objeto `IMPRESSORAS_DISPONIVEL`:

```typescript
export const IMPRESSORAS_DISPONIVEL: Record<string, Impressora> = {
  creality_ender_3_v3_se: {
    id: "creality_ender_3_v3_se",
    nome: "Creality Ender 3 V3 Se",
    precoCompra: 1500,        // Preço em reais
    consumoWatts: 220,        // Potência elétrica
    vidaUtiHoras: 5000,       // Horas estimadas até falha
    custoManutencaoMensal: 50, // Custo mensal de manutenção
  },
  
  // ADICIONE AQUI:
  nova_impressora: {
    id: "nova_impressora",
    nome: "Nome da Impressora",
    precoCompra: 3000,        // Seu preço de compra
    consumoWatts: 300,        // Watts
    vidaUtiHoras: 6000,       // Horas
    custoManutencaoMensal: 75, // Custo mensal
  },
};
```

3. Salve o arquivo

4. A nova impressora aparecerá automaticamente no dropdown da calculadora

### Campos Explicados

- **id**: Identificador único (use snake_case, sem espaços)
- **nome**: Nome que aparecerá no dropdown
- **precoCompra**: Quanto você pagou/pagará pela máquina (em reais)
- **consumoWatts**: Potência elétrica da máquina (verifique na especificação)
- **vidaUtiHoras**: Quantas horas você estima que a máquina durará (ex: 5.000 horas)
- **custoManutencaoMensal**: Gasto estimado com bicos, correias, etc por mês

---

## Editar Impressoras Existentes

1. Abra `frontend/src/config/impressoras.ts`
2. Localize a impressora desejada
3. Modifique os valores conforme necessário
4. Salve o arquivo

As alterações serão refletidas automaticamente na calculadora.

---

## Fórmula de Cálculo

```
Custo de Material = (Peso + Perda%) × Preço/grama
Custo de Energia = (Watts / 1000) × Horas × kWh
Custo Depreciação = (Preço Máquina / Vida Útil) × Horas Impressão
Custo Manutenção = (Custo Mensal / 160) × Horas Impressão
Custo Mão de Obra = (Setup + Pós-Processamento) × Taxa Horária
Custo Falha = Subtotal × Percentual Falha%
Subtotal = Todos os custos acima + Embalagem + Comissão

PREÇO FINAL = Subtotal + (Subtotal × Impostos%) + (Subtotal × Lucro%)
```

---

## Dicas Úteis

### Taxa Horária de Mão de Obra
- Principiante: R$ 30-50/hora
- Intermediário: R$ 50-80/hora
- Profissional: R$ 80-150/hora

### Taxa de Falha
- Máquinas novas e confiáveis: 10%
- Máquinas com histórico de problemas: 15-20%
- Impressões complexas: aumentar para 20%

### Margem de Lucro
- Lucro mínimo viável: 20%
- Recomendado: 30-40%
- Premium (peças especializadas): 50%+

### Valor de kWh
- Verifique sua conta de luz
- Brasil: geralmente entre R$ 0,70 e R$ 1,50 por kWh
- Pode variar conforme bandeira tarifária (verão/inverno)
