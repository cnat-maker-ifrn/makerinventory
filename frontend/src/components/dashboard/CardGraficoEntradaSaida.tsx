import { useEffect, useRef, useState } from "react";

export default function CardGraficoEntradaSaida() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // MOCK – depois você troca pelo backend
  const dados = [
    { mes: "Jan", entradas: 10, saídas: 5 },
    { mes: "Fev", entradas: 14, saídas: 8 },
    { mes: "Mar", entradas: 9, saídas: 12 },
    { mes: "Abr", entradas: 20, saídas: 11 },
    { mes: "Mai", entradas: 17, saídas: 7 },
    { mes: "Jun", entradas: 13, saídas: 15 },
    { mes: "Jul", entradas: 22, saídas: 9 },
    { mes: "Ago", entradas: 19, saídas: 11 },
    { mes: "Set", entradas: 25, saídas: 16 },
    { mes: "Out", entradas: 21, saídas: 14 },
    { mes: "Nov", entradas: 18, saídas: 10 },
    { mes: "Dez", entradas: 30, saídas: 20 },
  ];

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [hoverType, setHoverType] = useState<"entrada" | "saida" | null>(null);

  useEffect(() => {
    desenhar();
  }, [hoverIndex, hoverType]);

  function desenhar() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement!.clientWidth - 20;
    canvas.height = 250;

    const largura = canvas.width;
    const altura = canvas.height;

    const margem = 40;
    const areaUtil = altura - margem * 2;

    const larguraBarra = 15;
    const espacamento = (largura - margem * 2) / dados.length;

    const maxValor = Math.max(
      ...dados.map((d) => Math.max(d.entradas, d.saídas))
    );

    // Limpa
    ctx.clearRect(0, 0, largura, altura);

    // Desenho barras
    dados.forEach((item, i) => {
      const xGrupo = margem + i * espacamento;

      const hEntrada = (item.entradas / maxValor) * areaUtil;
      const hSaida = (item.saídas / maxValor) * areaUtil;

      const barraEntrada = {
        x: xGrupo,
        y: altura - margem - hEntrada,
        w: larguraBarra,
        h: hEntrada,
      };

      const barraSaida = {
        x: xGrupo + larguraBarra + 6,
        y: altura - margem - hSaida,
        w: larguraBarra,
        h: hSaida,
      };

      // Hover animação
      if (hoverIndex === i && hoverType === "entrada") {
        barraEntrada.y -= 8;
        barraEntrada.h += 8;
      }
      if (hoverIndex === i && hoverType === "saida") {
        barraSaida.y -= 8;
        barraSaida.h += 8;
      }

      // Entrada (verde)
      ctx.fillStyle =
        hoverIndex === i && hoverType === "entrada"
          ? "#2EA05A"
          : "rgba(41,133,74,0.85)";
      ctx.fillRect(barraEntrada.x, barraEntrada.y, barraEntrada.w, barraEntrada.h);

      // Saída (vermelho)
      ctx.fillStyle =
        hoverIndex === i && hoverType === "saida"
          ? "#FF3A3A"
          : "rgba(223,10,10,0.85)";
      ctx.fillRect(barraSaida.x, barraSaida.y, barraSaida.w, barraSaida.h);

      // Nome do mês
      ctx.fillStyle = "#444";
      ctx.font = "12px Arial";
      ctx.fillText(item.mes, xGrupo, altura - 10);

      // Salvando posições para hitbox
      (canvas as any)._barras = (canvas as any)._barras || [];
      (canvas as any)._barras[i] = { barraEntrada, barraSaida, item };
    });
  }

  function handleMouseMove(e: React.MouseEvent) {
    const canvas = canvasRef.current;
    const tooltip = tooltipRef.current;
    if (!canvas || !tooltip) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const barras = (canvas as any)._barras || [];

    let found = false;

    barras.forEach((b: any, index: number) => {
      const { barraEntrada, barraSaida, item } = b;

      const hitEntrada =
        mouseX >= barraEntrada.x &&
        mouseX <= barraEntrada.x + barraEntrada.w &&
        mouseY >= barraEntrada.y &&
        mouseY <= barraEntrada.y + barraEntrada.h;

      const hitSaida =
        mouseX >= barraSaida.x &&
        mouseX <= barraSaida.x + barraSaida.w &&
        mouseY >= barraSaida.y &&
        mouseY <= barraSaida.y + barraSaida.h;

      if (hitEntrada) {
        found = true;
        setHoverIndex(index);
        setHoverType("entrada");

        tooltip.style.display = "block";
        tooltip.style.left = `${mouseX + 15}px`;
        tooltip.style.top = `${mouseY + 15}px`;
        tooltip.innerHTML = `
          <strong>${item.mes}</strong><br>
          Entradas: ${item.entradas}
        `;
      } else if (hitSaida) {
        found = true;
        setHoverIndex(index);
        setHoverType("saida");

        tooltip.style.display = "block";
        tooltip.style.left = `${mouseX + 15}px`;
        tooltip.style.top = `${mouseY + 15}px`;
        tooltip.innerHTML = `
          <strong>${item.mes}</strong><br>
          Saídas: ${item.saídas}
        `;
      }
    });

    if (!found) {
      setHoverIndex(null);
      setHoverType(null);
      tooltip.style.display = "none";
    }
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md w-[705px] h-[350px]">
      <h2 className="text-xl font-semibold mb-4 text-[#29854A]">
        Entradas x Saídas (Últimos 12 meses)
      </h2>

      <canvas
        ref={canvasRef}
        width={650}
        height={250}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setHoverIndex(null);
          setHoverType(null);
          if (tooltipRef.current) tooltipRef.current.style.display = "none";
        }}
        className="cursor-pointer"
      />

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="absolute bg-black text-white text-xs px-3 py-1 rounded-md pointer-events-none"
        style={{
          display: "none",
          position: "absolute",
          zIndex: 50,
          opacity: 0.9,
        }}
      />
    </div>
  );
}
