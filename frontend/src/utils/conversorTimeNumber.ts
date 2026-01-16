// Converte de decimal (2.5) para string de relógio ("02:30")
export const decimalParaTime = (decimal: number): string => {
  if (isNaN(decimal) || decimal < 0) return "00:00";
  const horas = Math.floor(decimal);
  const minutos = Math.round((decimal - horas) * 60);
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
};

// Converte de string de relógio ("02:30") para decimal (2.5)
export const timeParaDecimal = (time: string): number => {
  const [horas, minutos] = time.split(':').map(Number);
  return horas + (minutos / 60);
}; 