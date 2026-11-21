// Céu estrelado do topo, com o Cruzeiro do Sul em destaque (como na bandeira).
// Pausa quando sai da tela e fica estático para quem prefere menos movimento.
(() => {
  const canvas = document.getElementById("ceu");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const parado = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Cruzeiro do Sul, coordenadas relativas: Gacrux, Mimosa, Intrometida, Imai, Acrux
  const CRUZEIRO = [[0.52, 0], [0.12, 0.44], [0.66, 0.66], [0.86, 0.36], [0.45, 1]];
  const LINHAS = [[0, 4], [1, 3]];

  let w, h, dpr, estrelas = [], cadente = null, rodando = false, alvoX = 0, alvoY = 0, px = 0, py = 0;

  function montar() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // ponytail: quantidade proporcional à área, limitada para celulares fracos
    const n = Math.min(260, Math.round((w * h) / 5500));
    estrelas = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h * 0.85,
      r: Math.random() * 1.2 + 0.2, fase: Math.random() * Math.PI * 2,
      vel: 0.6 + Math.random() * 1.6, prof: 0.2 + Math.random() * 0.8,
    }));
    desenhar(0);
  }

  function cruzeiro(t) {
    const largo = w > 760, tam = Math.min(w, h) * (largo ? 0.32 : 0.2);
    const ox = w * (largo ? 0.8 : 0.82) - tam / 2 + px * 6, oy = h * (largo ? 0.12 : 0.09) + py * 6;
    const pts = CRUZEIRO.map(([x, y]) => [ox + x * tam * 0.7, oy + y * tam]);
    ctx.strokeStyle = "rgba(255,223,0,.18)"; ctx.lineWidth = 1;
    for (const [a, b] of LINHAS) { ctx.beginPath(); ctx.moveTo(...pts[a]); ctx.lineTo(...pts[b]); ctx.stroke(); }
    pts.forEach(([x, y], i) => {
      const r = (i === 2 ? 1.6 : 2.6) + Math.sin(t * 1.5 + i) * 0.4;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
      g.addColorStop(0, "rgba(255,245,200,.9)"); g.addColorStop(1, "rgba(255,223,0,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    });
  }

  function desenhar(t) {
    ctx.clearRect(0, 0, w, h);
    for (const s of estrelas) {
      const a = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.vel + s.fase));
      ctx.fillStyle = `rgba(255,255,255,${a * s.prof})`;
      ctx.beginPath(); ctx.arc(s.x + px * 14 * s.prof, s.y + py * 14 * s.prof, s.r, 0, Math.PI * 2); ctx.fill();
    }
    cruzeiro(t);
    if (cadente) {
      const c = cadente, g = ctx.createLinearGradient(c.x, c.y, c.x - c.vx * 14, c.y - c.vy * 14);
      g.addColorStop(0, `rgba(255,255,255,${c.vida})`); g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = g; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.lineTo(c.x - c.vx * 14, c.y - c.vy * 14); ctx.stroke();
      c.x += c.vx; c.y += c.vy; c.vida -= 0.012;
      if (c.vida <= 0) cadente = null;
    } else if (Math.random() < 0.003) {
      cadente = { x: Math.random() * w * 0.7, y: Math.random() * h * 0.3, vx: 7, vy: 3, vida: 1 };
    }
  }

  function quadro(ms) {
    if (!rodando) return;
    px += (alvoX - px) * 0.05; py += (alvoY - py) * 0.05;
    desenhar(ms / 1000);
    requestAnimationFrame(quadro);
  }

  montar();
  addEventListener("resize", montar);
  if (parado) return;

  addEventListener("pointermove", (e) => { alvoX = e.clientX / innerWidth - 0.5; alvoY = e.clientY / innerHeight - 0.5; }, { passive: true });
  new IntersectionObserver(([e]) => {
    const antes = rodando;
    rodando = e.isIntersecting;
    if (rodando && !antes) requestAnimationFrame(quadro);
  }).observe(canvas);
})();
