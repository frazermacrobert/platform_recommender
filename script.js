// Robust selects + hosting filter + pricing band display
(function(){
  const MULTIPLIERS = [1.4, 1.2, 1.1];
  const selects = [
    document.getElementById('priority1'),
    document.getElementById('priority2'),
    document.getElementById('priority3')
  ];
  const hostingSel = document.getElementById('hosting');
  const orgSizeSel = document.getElementById('orgSize');

  const submitBtn = document.getElementById('submitBtn');
  const restartBtn = document.getElementById('restartBtn');
  const resultsEl = document.getElementById('results');
  const topList = document.getElementById('topList');
  const winnerText = document.getElementById('winnerText');

  // Build options once and disable conflicts instead of rebuilding selects
  function buildAllSelectsOnce(){
    const makeOptions = () => {
      const frag = document.createDocumentFragment();
      frag.append(new Option('Choose…',''));
      window.CATEGORIES.forEach(c => frag.append(new Option(c.name, c.key)));
      return frag;
    };
    selects.forEach(sel => { sel.innerHTML=''; sel.append(makeOptions()); });
    selects[0].disabled = false;
    selects[1].disabled = true;
    selects[2].disabled = true;
    updateUIState();
  }

  function enforceUniqueness(){
    const chosen = new Set(selects.map(s => s.value).filter(Boolean));
    selects.forEach(sel => {
      const current = sel.value;
      for (const opt of sel.options) {
        if (!opt.value) { opt.disabled = false; continue; }
        const isChosenElsewhere = chosen.has(opt.value) && opt.value !== current;
        opt.disabled = isChosenElsewhere;
      }
      if (sel.selectedOptions[0] && sel.selectedOptions[0].disabled) {
        sel.value = '';
      }
    });
  }

  function updateUIState(){
    selects[1].disabled = !selects[0].value;
    selects[2].disabled = !selects[1].value;
    submitBtn.disabled = !(selects.every(s => s.value));
    restartBtn.disabled = !(selects.some(s => s.value));
  }

  selects.forEach(sel => sel.addEventListener('change', ()=>{enforceUniqueness(); updateUIState();}));

  function platformPassesHosting(p){
    const want = hostingSel.value; // 'either' | 'standalone' | 'sharepoint'
    if (want === 'either') return true;
    return p.hosting === want;
  }

  function compute(priorities){
    const pool = window.PLATFORMS.filter(platformPassesHosting);
    const totals = pool.map(p => {
      const weighted = priorities.reduce((sum, key, idx) => sum + (p[key] ?? 0) * MULTIPLIERS[idx], 0);
      const tieBreakerAll = ['UX','Publishing','Community','Integrations','Search','Admin','Analytics','Mobile']
        .reduce((sum, k) => sum + (p[k] ?? 0), 0);
      const topPriorityScore = p[priorities[0]] ?? 0;
      return { name: p.name, weighted, tieBreakerAll, topPriorityScore, p };
    });

    totals.sort((a,b) => {
      if (b.weighted !== a.weighted) return b.weighted - a.weighted;
      if (b.tieBreakerAll !== a.tieBreakerAll) return b.tieBreakerAll - a.tieBreakerAll;
      return a.name.localeCompare(b.name);
    });

    const top3 = totals.slice(0,3);

    const bestTop = [...totals].sort((a,b)=>{
      if (b.topPriorityScore !== a.topPriorityScore) return b.topPriorityScore - a.topPriorityScore;
      if (b.weighted !== a.weighted) return b.weighted - a.weighted;
      return a.name.localeCompare(b.name);
    })[0];

    return { top3, bestTop };
  }

  function renderResults({top3, bestTop}, priorities){
    const bandKey = orgSizeSel.value || 'u5000';
    topList.innerHTML = '';

    if (top3.length === 0) {
      const li = document.createElement('li');
      li.textContent = "No platforms match your hosting filter.";
      topList.appendChild(li);
    } else {
      top3.forEach(item => {
        const price = item.p.price?.[bandKey];
        const li = document.createElement('li');
        li.textContent = price ? `${item.name} (${price})` : item.name;
        topList.appendChild(li);
      });
    }

    const cat = window.CATEGORIES.find(c => c.key === priorities[0]);
    if (bestTop) {
      const winnerPrice = bestTop.p.price?.[bandKey];
      winnerText.textContent = `${bestTop.name}${winnerPrice?` (${winnerPrice})`:''} (best in “${cat?.name ?? priorities[0]}”)`;
    } else {
      winnerText.textContent = "—";
    }

    resultsEl.hidden = false;
    resultsEl.scrollIntoView({behavior:'smooth', block:'start'});
  }

  submitBtn.addEventListener('click', () => {
    const priorities = selects.map(s => s.value);
    if (priorities.some(v => !v)) return;
    const res = compute(priorities);
    renderResults(res, priorities);
  });

  restartBtn.addEventListener('click', () => {
    selects.forEach(s => s.value = '');
    enforceUniqueness();
    updateUIState();
    resultsEl.hidden = true;
    topList.innerHTML = '';
    winnerText.textContent = '';
    hostingSel.value = 'either';
    orgSizeSel.value = 'u5000';
  });

  // Explainer modal (unchanged)
  const openExplainers = document.getElementById('openExplainers');
  const modal = document.getElementById('explainerModal');
  const closeExplainers = document.getElementById('closeExplainers');
  const explainerBody = document.getElementById('explainerBody');
  const prevBtn = document.getElementById('prevExplain');
  const nextBtn = document.getElementById('nextExplain');
  const dots = document.getElementById('dots');

  let idx = 0;
  function renderExplainer(){
    const c = window.CATEGORIES[idx];
    if(!c) return;
    explainerBody.innerHTML = '';
    const h = document.createElement('h4');
    h.textContent = c.name;
    explainerBody.appendChild(h);
    (c.description||'').split('\n').forEach(para => {
      if(!para.trim()) return;
      const p = document.createElement('p');
      p.textContent = para;
      explainerBody.appendChild(p);
    });
    dots.innerHTML = '';
    window.CATEGORIES.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'dot' + (i===idx ? ' active' : '');
      dots.appendChild(d);
    });
    prevBtn.disabled = (idx === 0);
    nextBtn.disabled = (idx === window.CATEGORIES.length - 1);
  }

  function openModal(){ modal.setAttribute('aria-hidden','false'); idx = 0; renderExplainer(); }
  function closeModal(){ modal.setAttribute('aria-hidden','true'); }

  openExplainers.addEventListener('click', openModal);
  closeExplainers.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target.hasAttribute('data-close')) closeModal(); });
  prevBtn.addEventListener('click', ()=>{ if(idx>0){ idx--; renderExplainer(); } });
  nextBtn.addEventListener('click', ()=>{ if(idx<window.CATEGORIES.length-1){ idx++; renderExplainer(); } });

  // Init
  buildAllSelectsOnce();
  enforceUniqueness();
})();
