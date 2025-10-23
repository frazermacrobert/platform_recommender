(function(){
  const MULTIPLIERS = [1.4, 1.2, 1.1];
  const selects = [document.getElementById('priority1'), document.getElementById('priority2'), document.getElementById('priority3')];
  const submitBtn = document.getElementById('submitBtn');
  const restartBtn = document.getElementById('restartBtn');
  const resultsEl = document.getElementById('results');
  const topList = document.getElementById('topList');
  const winnerText = document.getElementById('winnerText');

  // Populate dropdowns
  function optionsFor(omitKeys){
    const frag = document.createDocumentFragment();
    frag.append(new Option('Choose…',''));
    window.CATEGORIES.forEach(c => {
      if(!omitKeys.has(c.key)){
        const opt = new Option(c.name, c.key);
        frag.append(opt);
      }
    });
    return frag;
  }

  function refreshSelects(){
    const chosen = new Set(selects.map(s => s.value).filter(Boolean));
    selects.forEach((sel, idx) => {
      const current = sel.value;
      sel.innerHTML = '';
      sel.append(optionsFor(chosen));
      sel.value = chosen.has(current) ? current : '';
      // enable based on previous completion
      if(idx === 0) sel.disabled = false;
      if(idx === 1) sel.disabled = !selects[0].value;
      if(idx === 2) sel.disabled = !selects[1].value;
    });
    submitBtn.disabled = !(selects.every(s => s.value));
    restartBtn.disabled = !(selects.some(s => s.value));
  }

  selects.forEach(sel => sel.addEventListener('change', refreshSelects));
  refreshSelects();

  // Compute recommendations
  function compute(priorities){
    // totals with weighting
    const totals = window.PLATFORMS.map(p => {
      const weighted = priorities.reduce((sum, key, idx) => sum + (p[key] ?? 0) * MULTIPLIERS[idx], 0);
      const tieBreakerAll = ['UX','Publishing','Community','Integrations','Search','Admin','Analytics','Mobile']
        .reduce((sum, k) => sum + (p[k] ?? 0), 0);
      const topPriorityScore = p[priorities[0]] ?? 0;
      return { name: p.name, weighted, tieBreakerAll, topPriorityScore };
    });

    // sort by weighted desc, tiebreak by all-sum, then name
    totals.sort((a,b) => {
      if(b.weighted !== a.weighted) return b.weighted - a.weighted;
      if(b.tieBreakerAll !== a.tieBreakerAll) return b.tieBreakerAll - a.tieBreakerAll;
      return a.name.localeCompare(b.name);
    });

    const top3 = totals.slice(0,3).map(t=>t.name);

    // Top priority winner: highest topPriorityScore; if tie, use weighted; then name
    const bestTop = [...totals].sort((a,b)=>{
      if(b.topPriorityScore !== a.topPriorityScore) return b.topPriorityScore - a.topPriorityScore;
      if(b.weighted !== a.weighted) return b.weighted - a.weighted;
      return a.name.localeCompare(b.name);
    })[0];

    return { top3, bestTop };
  }

  // Render results
  function renderResults({top3, bestTop}, priorities){
    topList.innerHTML = '';
    top3.forEach(name => {
      const li = document.createElement('li');
      li.textContent = name;
      topList.appendChild(li);
    });
    // Show winner
    const cat = window.CATEGORIES.find(c => c.key === priorities[0]);
    winnerText.textContent = `${bestTop.name} (best in “${cat?.name ?? priorities[0]}”)`;
    resultsEl.hidden = false;
    resultsEl.scrollIntoView({behavior:'smooth', block:'start'});
  }

  submitBtn.addEventListener('click', () => {
    const priorities = selects.map(s => s.value);
    if(priorities.some(v => !v)) return;
    const res = compute(priorities);
    renderResults(res, priorities);
  });

  restartBtn.addEventListener('click', () => {
    selects.forEach(s => s.value = '');
    refreshSelects();
    resultsEl.hidden = true;
    topList.innerHTML = '';
    winnerText.textContent = '';
  });

  // --- Explainer modal ---
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
    const p = document.createElement('p');
    c.description.split('\n').forEach(para => {
      if(!para.trim()) return;
      const pp = document.createElement('p');
      pp.textContent = para;
      explainerBody.appendChild(pp);
    });
    explainerBody.prepend(h);

    // dots
    dots.innerHTML = '';
    window.CATEGORIES.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'dot' + (i===idx ? ' active' : '');
      dots.appendChild(d);
    });

    prevBtn.disabled = (idx === 0);
    nextBtn.disabled = (idx === window.CATEGORIES.length - 1);
  }

  function openModal(){
    modal.setAttribute('aria-hidden','false');
    idx = 0;
    renderExplainer();
  }
  function closeModal(){ modal.setAttribute('aria-hidden','true'); }

  openExplainers.addEventListener('click', openModal);
  closeExplainers.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target.hasAttribute('data-close')) closeModal(); });
  prevBtn.addEventListener('click', ()=>{ if(idx>0){ idx--; renderExplainer(); } });
  nextBtn.addEventListener('click', ()=>{ if(idx<window.CATEGORIES.length-1){ idx++; renderExplainer(); } });

})();