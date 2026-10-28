/* stawix.dev — navegação por cenas, parallax, estudos de caso e formulário.
   Sem dependências. Sem JavaScript, o site funciona como página de rolagem normal. */
(function () {
  'use strict';

  const raiz = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const WHATSAPP = '5541997505605';
  const EMAIL = 'vinicius.stawicki07@gmail.com';

  const app = $('#app');
  const palco = $('#palco');
  const trilho = $('#conteudo');
  const cenas = $$('.cena', trilho);
  const ids = cenas.map((c) => c.dataset.cena);
  const nomes = cenas.map((c) => c.dataset.nome);
  const N = cenas.length;
  palco.style.setProperty('--n', N);
  trilho.style.setProperty('--n', N);

  const el = {
    heroi: $('#heroi'), brilho: $('#brilho'), rio: $('#rio'),
    fluidoA: $('#fluidoA'), camadaA: $('#camadaA'), fluidoB: $('#fluidoB'),
    gota1: $('#gota1'), gota2: $('#gota2'),
    pct: $('#pct'), nomeCena: $('#nome-cena'), barra: $('#barra'), contador: $('#contador'),
    anuncio: $('#anuncio'), dica: $('#dica'), alternar: $('#alternar-leitura'),
    menu: $('#menu'), casoFundo: $('#caso-fundo'), ampliar: $('#ampliar'),
    ampliarImg: $('#ampliar-img'), ampliarLeg: $('#ampliar-legenda'),
    carregador: $('#carregador'), liquido: $('#liquido'), carregadorPct: $('#carregador-pct'),
    form: $('#form-orcamento'), linkEmail: $('#link-email')
  };

  /* Posição dos fluidos em cada cena: [x, y, rotação, escala] */
  const A = [[230, 150, 0, .85], [520, -300, -30, .45], [-560, -320, -30, .5], [-470, 220, 38, .7], [480, -260, 70, .5], [470, -150, 15, .75], [620, -330, 16, .5]];
  const B = [[430, 700, 0, .5], [-560, 330, 20, .55], [470, 140, 0, .8], [-520, -280, 52, .5], [-560, 250, -16, .6], [-560, 320, 12, .5], [40, 420, 12, 1.3]];
  const RIO = [[260, 6], [600, -6], [-40, -8], [140, 6], [-110, -5], [380, 4], [0, 0]];
  const G1 = [[-580, 280, 0, 1], [-200, -480, 0, .8], [-220, -500, 0, .8], [580, -140, 0, 1.1], [-620, 330, 0, .9], [-600, -300, 0, 1], [640, 220, 0, 1.2]];
  const G2 = [[600, -300, 0, 1], [620, 280, 0, 1], [540, 320, 0, 1.1], [-600, 300, 0, .9], [580, -330, 0, 1.2], [600, 330, 0, 1], [-620, -300, 0, 1]];
  const GL = [[0, 0], [120, -80], [-160, 90], [180, -60], [-140, -110], [-120, 60], [0, 160]];
  const PARALLAX = [70, 150, 250];
  const T = (v) => `translate3d(${v[0]}px, ${v[1]}px, 0) rotate(${v[2]}deg) scale(${v[3]})`;

  let i = 0;
  let usou = false;
  let carregado = false;
  let ultimaTroca = 0;
  let leitura = false;
  try { leitura = localStorage.getItem('stawix-leitura') === '1'; } catch (e) { /* sem armazenamento */ }

  const mqPequeno = window.matchMedia('(max-width: 1024px), (max-height: 640px)');
  const mqReduz = window.matchMedia('(prefers-reduced-motion: reduce)');
  const modoLista = () => leitura || mqPequeno.matches || mqReduz.matches;

  /* ------------------------------------------------------------ desenho */
  function render() {
    const lista = modoLista();
    const j = lista ? 0 : i;

    cenas.forEach((c, k) => {
      const rel = k - i;
      c.classList.toggle('ativa', lista || (rel === 0 && carregado));
      c.inert = !lista && rel !== 0;
      $$('[data-p]', c).forEach((n) => {
        if (lista) { n.style.transform = ''; return; }
        const p = Number(n.dataset.p);
        if (p === 3) {
          const lado = Number(n.dataset.lado || 1);
          n.style.transform = `translate3d(0, ${rel * 340}px, 0) rotateY(${lado * 16}deg) rotateX(${8 - rel * 22}deg) rotateZ(${lado * -1.5}deg)`;
        } else {
          n.style.transform = `translate3d(0, ${rel * PARALLAX[p]}px, 0)`;
        }
      });
    });

    trilho.style.transform = lista ? '' : `translate3d(0, ${-i * 100 / N}%, 0)`;
    el.heroi.style.transform = lista ? '' : `translate3d(0, ${-i * 100}%, 0)`;
    el.brilho.style.transform = `translate3d(${GL[j][0]}px, ${GL[j][1]}px, 0)`;
    el.rio.style.transform = `translate3d(${RIO[j][0]}px, ${-j * 4}%, 0) rotate(${RIO[j][1]}deg)`;
    el.fluidoA.style.transform = T(A[j]);
    el.camadaA.style.zIndex = j === 0 ? 15 : 6;
    el.fluidoB.style.transform = T(B[j]);
    el.fluidoB.style.opacity = j === 0 ? 0 : .9;
    el.fluidoB.classList.toggle('pausa', j === 0);
    el.gota1.style.transform = T(G1[j]);
    el.gota2.style.transform = T(G2[j]);

    el.pct.textContent = Math.round(i / (N - 1) * 100) + '%';
    el.nomeCena.textContent = nomes[i];
    el.barra.style.transform = `scaleX(${Math.max(0.03, i / (N - 1))})`;
    el.contador.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(N).padStart(2, '0');
    $$('.dot').forEach((d) => {
      if (d.dataset.ir === ids[i]) d.setAttribute('aria-current', 'step');
      else d.removeAttribute('aria-current');
    });
    el.dica.classList.toggle('mostra', !usou && carregado && i === 0 && !lista);
  }

  function aplicarModo() {
    const lista = modoLista();
    const eraLista = raiz.classList.contains('lista');
    raiz.classList.toggle('imersivo', !lista);
    raiz.classList.toggle('lista', lista);
    raiz.classList.toggle('anima', !mqReduz.matches);
    el.alternar.textContent = leitura ? 'Modo imersivo' : 'Modo leitura';
    el.alternar.setAttribute('aria-pressed', String(leitura));
    if (!lista && eraLista) window.scrollTo(0, 0);
    render();
    if (lista && eraLista === false && i > 0) cenas[i].scrollIntoView({ behavior: 'auto', block: 'start' });
  }

  /* ------------------------------------------------------------ navegação */
  function ir(k, opcoes = {}) {
    const n = Math.max(0, Math.min(N - 1, k));
    fecharTudo();
    if (modoLista()) {
      cenas[n].scrollIntoView({ behavior: mqReduz.matches ? 'auto' : 'smooth', block: 'start' });
    }
    if (n !== i || modoLista()) {
      i = n;
      ultimaTroca = performance.now();
      if (!opcoes.semHistorico) {
        try { history.pushState({ cena: ids[n] }, '', '#' + ids[n]); } catch (e) { /* ignorado */ }
      }
    }
    usou = true;
    el.anuncio.textContent = `Cena ${i + 1} de ${N}: ${nomes[i]}`;
    render();
  }

  /* roda do mouse / trackpad: um gesto contínuo troca no máximo uma cena */
  let acumulado = 0;
  let gesto = false;
  let fimGesto = null;
  palco.addEventListener('wheel', (e) => {
    if (modoLista() || algoAberto()) return;
    e.preventDefault();
    clearTimeout(fimGesto);
    fimGesto = setTimeout(() => { gesto = false; acumulado = 0; }, 220);
    if (gesto) return;
    if (performance.now() - ultimaTroca < 1500) { gesto = true; return; }
    acumulado += e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    if (Math.abs(acumulado) > 40) {
      const d = acumulado > 0 ? 1 : -1;
      gesto = true;
      acumulado = 0;
      ir(i + d);
    }
  }, { passive: false });

  /* toque */
  let y0 = null;
  palco.addEventListener('touchstart', (e) => {
    if (e.target.closest('input, textarea, select')) { y0 = null; return; }
    y0 = e.touches[0] ? e.touches[0].clientY : null;
  }, { passive: true });
  palco.addEventListener('touchend', (e) => {
    if (modoLista() || algoAberto() || y0 === null || !e.changedTouches[0]) return;
    const dy = y0 - e.changedTouches[0].clientY;
    y0 = null;
    if (Math.abs(dy) > 50 && performance.now() - ultimaTroca > 1200) ir(i + (dy > 0 ? 1 : -1));
  }, { passive: true });

  /* teclado */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (el.ampliar.classList.contains('aberto')) fecharAmpliar();
      else if (casoAberto) fecharCaso();
      else if (el.menu.classList.contains('aberto')) fecharMenu();
      return;
    }
    if (modoLista() || algoAberto()) return;
    const alvo = e.target;
    if (alvo.closest && alvo.closest('input, textarea, select, [contenteditable="true"]')) return;
    const k = e.key;
    if (k === ' ' && alvo.closest && alvo.closest('button, a')) return;
    if (k === 'ArrowDown' || k === 'PageDown' || k === ' ') { e.preventDefault(); ir(i + 1); }
    else if (k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); ir(i - 1); }
    else if (k === 'Home') { e.preventDefault(); ir(0); }
    else if (k === 'End') { e.preventDefault(); ir(N - 1); }
  });

  /* parallax pelo mouse e cursor em gota */
  let quadro = null;
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' || quadro) return;
    const x = e.clientX;
    const y = e.clientY;
    quadro = requestAnimationFrame(() => {
      quadro = null;
      raiz.style.setProperty('--mx', ((x / window.innerWidth) * 2 - 1).toFixed(3));
      raiz.style.setProperty('--my', ((y / window.innerHeight) * 2 - 1).toFixed(3));
      raiz.style.setProperty('--cx', x + 'px');
      raiz.style.setProperty('--cy', y + 'px');
    });
  }, { passive: true });

  /* ------------------------------------------------------------ menu, estudos de caso, ampliação */
  let focoAnterior = null;
  let casoAberto = null;
  const algoAberto = () => el.menu.classList.contains('aberto') || !!casoAberto || el.ampliar.classList.contains('aberto');

  function abrirMenu() {
    focoAnterior = document.activeElement;
    el.menu.inert = false;
    el.menu.classList.add('aberto');
    app.inert = true;
    $('[data-fechar-menu]', el.menu).focus();
  }
  function fecharMenu(restaurar = true) {
    if (!el.menu.classList.contains('aberto')) return;
    el.menu.classList.remove('aberto');
    el.menu.inert = true;
    app.inert = false;
    if (restaurar && focoAnterior && focoAnterior.focus) focoAnterior.focus();
  }

  function abrirCaso(slug) {
    const aside = $('#caso-' + slug);
    if (!aside) return;
    focoAnterior = document.activeElement;
    casoAberto = aside;
    aside.inert = false;
    aside.scrollTop = 0;
    aside.classList.add('aberto');
    el.casoFundo.classList.add('aberto');
    app.inert = true;
    $('[data-fechar-caso]', aside).focus();
  }
  function fecharCaso(restaurar = true) {
    if (!casoAberto) return;
    casoAberto.classList.remove('aberto');
    casoAberto.inert = true;
    el.casoFundo.classList.remove('aberto');
    casoAberto = null;
    app.inert = false;
    if (restaurar && focoAnterior && focoAnterior.focus) focoAnterior.focus();
  }

  let focoAmpliar = null;
  function abrirAmpliar(botao) {
    const img = $('img', botao);
    focoAmpliar = botao;
    el.ampliarImg.src = botao.dataset.src;
    el.ampliarImg.alt = img ? img.alt : '';
    el.ampliarLeg.textContent = botao.dataset.legenda || '';
    el.ampliar.inert = false;
    el.ampliar.classList.add('aberto');
    if (casoAberto) casoAberto.inert = true;
    $('[data-fechar-ampliar]', el.ampliar).focus();
  }
  function fecharAmpliar() {
    if (!el.ampliar.classList.contains('aberto')) return;
    el.ampliar.classList.remove('aberto');
    el.ampliar.inert = true;
    if (casoAberto) casoAberto.inert = false;
    if (focoAmpliar) focoAmpliar.focus();
  }

  function fecharTudo() {
    fecharAmpliar();
    fecharCaso(false);
    fecharMenu(false);
  }

  document.addEventListener('click', (e) => {
    const alvo = e.target.closest('[data-ir], [data-abrir-menu], [data-fechar-menu], [data-abrir-caso], [data-fechar-caso], [data-ampliar], [data-fechar-ampliar], #caso-fundo, #alternar-leitura');
    if (!alvo) {
      if (e.target === el.ampliar) fecharAmpliar();
      return;
    }
    if (alvo.dataset.ir) { const k = ids.indexOf(alvo.dataset.ir); if (k >= 0) ir(k); }
    else if (alvo.hasAttribute('data-abrir-menu')) abrirMenu();
    else if (alvo.hasAttribute('data-fechar-menu')) fecharMenu();
    else if (alvo.dataset.abrirCaso) abrirCaso(alvo.dataset.abrirCaso);
    else if (alvo.hasAttribute('data-fechar-caso') || alvo.id === 'caso-fundo') fecharCaso();
    else if (alvo.hasAttribute('data-ampliar')) abrirAmpliar(alvo);
    else if (alvo.hasAttribute('data-fechar-ampliar')) fecharAmpliar();
    else if (alvo.id === 'alternar-leitura') {
      leitura = !leitura;
      try { localStorage.setItem('stawix-leitura', leitura ? '1' : '0'); } catch (err) { /* ignorado */ }
      aplicarModo();
    }
  });

  /* ------------------------------------------------------------ formulário de orçamento */
  function mensagem() {
    const f = new FormData(el.form);
    const nome = String(f.get('nome') || '').trim();
    const msg = String(f.get('mensagem') || '').trim();
    return `Olá, Vinicius! Sou ${nome || '[seu nome]'}. Preciso de: ${f.get('servico')}. Prazo: ${f.get('prazo')}.${msg ? ' ' + msg : ''}`;
  }
  function atualizarEmail() {
    const f = new FormData(el.form);
    el.linkEmail.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Orçamento — ' + f.get('servico'))}&body=${encodeURIComponent(mensagem())}`;
  }
  el.form.addEventListener('input', atualizarEmail);
  el.form.addEventListener('change', atualizarEmail);
  el.form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem())}`, '_blank', 'noopener');
  });
  atualizarEmail();

  /* ------------------------------------------------------------ endereço por cena */
  function cenaDoEndereco() {
    return ids.indexOf((window.location.hash || '').slice(1));
  }
  window.addEventListener('popstate', () => {
    const k = cenaDoEndereco();
    ir(k >= 0 ? k : 0, { semHistorico: true });
  });

  /* ------------------------------------------------------------ modos */
  const aoMudar = () => aplicarModo();
  [mqPequeno, mqReduz].forEach((mq) => {
    if (mq.addEventListener) mq.addEventListener('change', aoMudar);
    else if (mq.addListener) mq.addListener(aoMudar);
  });

  const inicial = cenaDoEndereco();
  if (inicial > 0) { i = inicial; usou = true; }
  aplicarModo();
  if (inicial > 0 && modoLista()) cenas[inicial].scrollIntoView({ behavior: 'auto', block: 'start' });

  /* ------------------------------------------------------------ carregamento */
  const essenciais = [
    'assets/img/fluidos/blob_a.webp', 'assets/img/fluidos/blob_b.webp', 'assets/img/fluidos/rio.webp', 'assets/img/fluidos/grao.png',
    'assets/img/projetos/skyle/00-heroi-desktop-escuro.webp', 'assets/img/projetos/skyle/01-kanban-desktop-escuro.webp',
    'assets/img/projetos/simplifinance/00-heroi-inicio-mobile-escuro.webp', 'assets/img/projetos/simplifinance/05-analises-mobile-escuro.webp',
    'assets/img/projetos/teklog/01-relatorios-mobile-escuro.webp', 'assets/img/projetos/teklog/05-checklists-tablet-escuro.webp'
  ];
  let prontas = 0;
  function concluir() {
    if (carregado) return;
    carregado = true;
    el.carregador.classList.add('pronto');
    el.carregador.setAttribute('aria-hidden', 'true');
    render();
  }
  function progresso() {
    prontas += 1;
    const p = Math.round(prontas / essenciais.length * 100);
    el.liquido.style.height = p + '%';
    el.carregadorPct.textContent = p;
    if (prontas >= essenciais.length) setTimeout(concluir, 500);
  }
  essenciais.forEach((src) => {
    const im = new Image();
    im.onload = progresso;
    im.onerror = progresso;
    im.src = src;
  });
  setTimeout(concluir, 6000);
})();
