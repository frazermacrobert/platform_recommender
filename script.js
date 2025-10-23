<!-- script.js -->
<script>
(function(){
  const MULTIPLIERS = [1.4, 1.2, 1.1];
  const selects = [document.getElementById('priority1'), document.getElementById('priority2'), document.getElementById('priority3')];
  const submitBtn = document.getElementById('submitBtn');
  const restartBtn = document.getElementById('restartBtn');
  const resultsEl = document.getElementById('results');
  const topList = document.getElementById('topList');
  const winnerText = document.getElementById('winnerText');

  // --- helpers ---
  function buildOptions(omitKeys) {
    const frag = document.createDocumentFragment();
    frag.append(new Option('Choose…',''));
    window.CATEGORIES.forEach(c => {
      if (!omitKeys.has(c.key)) {
        frag.append(new Option(c.name, c.key));
      }
    });
    return frag;
  }

  function refreshSelects(){
    // current chosen values across all selects
    const chosen = new Set(selects.map(s => s.value).filter(Boolean));

    selects.forEach((sel, idx) => {
      const current = sel.value;               // remember this select's current choice

      // Build an omit set that EXCLUDES others' choices, but ALLOWS this select's current value
      const omit = new Set(chosen);
      omit.delete(current);

      // Rebuild options
      sel.innerHTML = '';
      sel.append(buildOptions(omit));

      // Restore current value (now guaranteed to be present)
      sel.value = current || '';

      // Enablement rules
      if (idx === 0) sel.disabled = false;
      if (idx === 1) sel.disabled = !selects[0].value;
      if (idx === 2) sel.disabled = !selects[1].value;
    });

    submitBtn.disabled = !(selects.every(s => s.value));
    restartBtn.disabled = !(selects.some(s => s.value));
  }

  selects.forEach(sel => sel.addEventListener('change', refreshSelects));
  refreshSelects();

  // --- scoring ---
  function compute(priorities){
    const totals = window.PLATFORMS.map(p => {
      const weighted = priorities.reduce((sum, key, idx) => sum + (p[key] ?? 0) * MULTIPLIERS[idx], 0);
      const tieBreakerAll = ['UX','Publishing','Community','Integrations','Search','Admin','Analytics','Mobile']
        .reduce((sum, k) => sum + (p[k] ?? 0), 0);
      const topPriorityScore = p[priorities[0]] ?? 0;
      return { name: p.name, weighted, tieBreakerAll, topPriorityScore };
    });

    totals.sort((a,b) => {
      if (b.weighted !== a.weighted) return b.weighted - a.weighted;
      if (b.tieBreakerAll !== a.tieBreakerAll) return b.tieBreakerAll - a.tieBreakerAll;
      return a.name.localeCompare(b.name);
    });

    const top3 = totals.slice(0,3).map(t=>t.name);

    const bestTop = [...totals].sort((a,b)=>{
      if (b.topPriorityScore !== a.topPriorityScore) return b.topPriorityScore - a.topPriorityScore;
      if (b.weighted !== a.weighted) return b.weighted - a.weighted;
      return a.name.localeCompare(b.name);
    })[0];

    return { top3, bestTop };
  }

  function renderResults({top3, bestTop}, priorities){
    topList.innerHTML = '';
    top3.forEach(name => {
      const li = document.createElement('li');
      li.textContent = name;
      topList.appendChild(li);
    });
    const cat = window.CATEGORIES.find(c => c.key === priorities[0]);
    winnerText.textContent = `${bestTop.name} (best in “${cat?.name ?? priorities[0]}”)`;
    resultsEl.hidden = false;
    resultsEl.scrollIntoView({behavior:'smooth', block:'start'});
  }

  document.getElementById('submitBtn').addEventListener('click', () => {
    const priorities = selects.map(s => s.value);
    if (priorities.some(v => !v)) return;
    const res = compute(priorities);
    renderResults(res, priorities);
  });

  document.getElementById('restartBtn').addEventListener('click', () => {
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
    explainerBody.appendChild(h);
    c.description.split('\\n').forEach(para => {
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

})();
</script>
