// Monta a página a partir de js/data.js (MENTES e AREAS).
(() => {
  const $ = (s) => document.querySelector(s);
  const parado = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ANO_ATUAL = new Date().getFullYear();
  const ordenadas = [...MENTES].sort((a, b) => a.nascimento - b.nascimento);
  const porId = new Map(ordenadas.map((p) => [p.id, p]));
  const normalizar = (s) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  const iniciais = (p) => (p.apelido || p.nome).split(/\s+/).filter((w) => !/^(d[aeo]s?|e)$/i.test(w)).slice(0, 2).map((w) => w[0]).join("");
  const cor = (p) => AREAS[p.areas[0]].cor;
  const anos = (p) => `${p.nascimento} – ${p.morte}`;
  const romano = (n) => ({ 17: "XVII", 18: "XVIII", 19: "XIX", 20: "XX", 21: "XXI" })[n] || n;
  const tags = (p) => p.areas.map((a) => `<span class="tag" style="--c:${AREAS[a].cor}">${AREAS[a].nome}</span>`).join("");

  // ---------- Revelar ao rolar ----------
  const revelador = new IntersectionObserver((itens) => {
    for (const e of itens) if (e.isIntersecting) { e.target.classList.add("visivel"); revelador.unobserve(e.target); }
  }, { rootMargin: "0px 0px -8% 0px" });
  const revelar = (raiz = document) => raiz.querySelectorAll(".revelar:not(.visivel)").forEach((el) => revelador.observe(el));

  // ---------- Filtros e busca ----------
  let area = "todas", termo = "";
  const chips = $("#chips");
  chips.innerHTML = [["todas", { nome: "Todas", cor: "" }], ...Object.entries(AREAS)]
    .map(([id, a]) => `<button type="button" class="chip" data-area="${id}" aria-pressed="${id === "todas"}" style="--c:${a.cor || "var(--destaque)"}">${a.nome}</button>`)
    .join("");
  chips.addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    area = b.dataset.area;
    chips.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", c === b));
    renderCards();
  });
  $("#busca").addEventListener("input", (e) => { termo = normalizar(e.target.value.trim()); renderCards(); });

  const combina = (p) =>
    (area === "todas" || p.areas.includes(area)) &&
    (!termo || normalizar([p.nome, p.apelido, p.local, p.resumo, ...p.historia].join(" ")).includes(termo));

  // ---------- Cards ----------
  function renderCards() {
    const lista = ordenadas.filter(combina);
    $("#cards").innerHTML = lista.map((p, i) => `
      <li class="card revelar" style="--c:${cor(p)};--atraso:${(i % 3) * 80}ms">
        <button type="button" data-abrir="${p.id}">
          <div class="card-topo">
            <div class="monograma" aria-hidden="true">${iniciais(p)}</div>
            <div>
              ${p.apelido ? `<div class="apelido">${p.apelido}</div>` : ""}
              <h3>${p.apelido ? p.nome.replace(/^(\S+).*\s(\S+)$/, "$1 $2") : p.nome}</h3>
              <div class="anos">${anos(p)} · ${p.local.split(",")[0]}</div>
            </div>
          </div>
          <p class="resumo">${p.resumo}</p>
          <div class="tags">${tags(p)}</div>
          <span class="ler">Ler a história <span aria-hidden="true">→</span></span>
        </button>
      </li>`).join("");
    $("#vazio").hidden = lista.length > 0;
    $("#contagem").textContent = `Mostrando ${lista.length} de ${MENTES.length} histórias`;
    revelar($("#cards"));
  }

  // ---------- Linha do tempo ----------
  function renderTempo() {
    let seculo = 0, lado = 0, html = "";
    for (const p of ordenadas) {
      const s = Math.floor((p.nascimento - 1) / 100) + 1;
      if (s !== seculo) { seculo = s; html += `<li class="seculo revelar" aria-hidden="true"><span>Século ${romano(s)}</span></li>`; }
      html += `<li class="ponto revelar${lado++ % 2 ? " dir" : ""}" style="--c:${cor(p)}">
        <button type="button" data-abrir="${p.id}">
          <span class="ano">${p.nascimento}</span>
          <span class="nome">${p.apelido || p.nome}</span>
          <span class="frase">${p.resumo}</span>
        </button></li>`;
    }
    $("#tempo").innerHTML = html;
  }

  // ---------- Contadores ----------
  const totais = {
    "n-pessoas": MENTES.length,
    "n-seculos": Math.ceil((ANO_ATUAL - ordenadas[0].nascimento) / 100),
    "n-areas": Object.keys(AREAS).length,
  };
  const contador = new IntersectionObserver((itens) => {
    for (const e of itens) {
      if (!e.isIntersecting) continue;
      contador.unobserve(e.target);
      const fim = totais[e.target.id], inicio = performance.now(), dur = parado ? 0 : 1400;
      const passo = (t) => {
        const k = dur ? Math.min(1, (t - inicio) / dur) : 1;
        e.target.textContent = Math.round(fim * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(passo);
      };
      requestAnimationFrame(passo);
    }
  });
  document.querySelectorAll("[data-contar]").forEach((el) => contador.observe(el));

  // ---------- História (diálogo) ----------
  const dlg = $("#historia");
  let atual = null;

  function abrir(id) {
    const p = porId.get(id);
    if (!p) return;
    atual = p;
    dlg.style.setProperty("--c", cor(p));
    $("#h-mono").textContent = iniciais(p);
    $("#h-apelido").textContent = p.apelido || "";
    $("#h-nome").textContent = p.nome;
    $("#h-meta").textContent = `${anos(p)} · ${p.local}`;
    $("#h-tags").innerHTML = tags(p);
    const c = $("#h-citacao");
    c.hidden = !p.citacao;
    if (p.citacao) c.innerHTML = `“${p.citacao.texto}”<cite>${p.citacao.fonte}</cite>`;
    $("#h-texto").innerHTML = p.historia.map((t) => `<p>${t}</p>`).join("");
    $("#h-marcos").innerHTML = p.marcos.map((m) => `<li><b>${m.ano}</b>${m.texto}</li>`).join("");
    $("#h-legado").textContent = p.legado;
    const i = ordenadas.indexOf(p);
    $("#h-ant").textContent = `← ${(ordenadas[i - 1] || ordenadas.at(-1)).apelido || (ordenadas[i - 1] || ordenadas.at(-1)).nome}`;
    $("#h-prox").textContent = `${(ordenadas[i + 1] || ordenadas[0]).apelido || (ordenadas[i + 1] || ordenadas[0]).nome} →`;
    document.title = `${p.apelido || p.nome} · Mentes do Brasil`;
    if (!dlg.open) dlg.showModal();
    dlg.scrollTop = 0;
  }

  const irPara = (id) => { location.hash = `historia/${id}`; };
  const vizinho = (d) => {
    const i = ordenadas.indexOf(atual), n = ordenadas.length;
    const p = ordenadas[(i + d + n) % n];
    history.replaceState(null, "", `#historia/${p.id}`);
    abrir(p.id);
  };

  function rota() {
    const m = location.hash.match(/^#historia\/([\w-]+)$/);
    if (m) abrir(m[1]);
    else if (dlg.open) dlg.close();
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-abrir]");
    if (b) irPara(b.dataset.abrir);
  });
  $("#aleatorio").addEventListener("click", () => irPara(ordenadas[Math.floor(Math.random() * ordenadas.length)].id));
  $("#h-ant").addEventListener("click", () => vizinho(-1));
  $("#h-prox").addEventListener("click", () => vizinho(1));
  dlg.querySelector("[data-fechar]").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); }); // clique fora fecha
  dlg.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") vizinho(1);
    if (e.key === "ArrowLeft") vizinho(-1);
  });
  dlg.addEventListener("close", () => {
    document.title = "Mentes do Brasil";
    if (location.hash.startsWith("#historia/")) history.replaceState(null, "", location.pathname + location.search);
  });
  addEventListener("hashchange", rota);

  // ---------- Inclinação 3D dos cards ----------
  if (!parado && matchMedia("(pointer: fine)").matches) {
    const cards = $("#cards");
    cards.addEventListener("pointermove", (e) => {
      const b = e.target.closest(".card button");
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`);
      b.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * 8}deg`);
    });
    cards.addEventListener("pointerout", (e) => {
      const b = e.target.closest(".card button");
      if (b && !b.contains(e.relatedTarget)) { b.style.removeProperty("--rx"); b.style.removeProperty("--ry"); }
    });
  }

  // ---------- Topo sólido depois do hero ----------
  new IntersectionObserver(([e]) => $(".topo").classList.toggle("solido", !e.isIntersecting), { rootMargin: "-80px 0px 0px 0px" })
    .observe($(".hero"));

  renderCards();
  renderTempo();
  revelar();
  rota();
})();
