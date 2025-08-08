// js/flashcards.js - flip-style flashcards with local add
(async function(){
  const root = document.getElementById('flash-root') || document.getElementById('flashcard-container');
  if(!root) return;
  const res = await fetch('./data/flashcards.json');
  const base = await res.json();
  const localKey = 'userFlashcards';
  const localRaw = localStorage.getItem(localKey);
  const userCards = localRaw ? JSON.parse(localRaw) : [];
  let cards = [...base, ...userCards];
  let idx = 0, showingBack=false;

  function render(){
    const c = cards[idx] || {front:'No cards', back:''};
    root.innerHTML = `
      <div class="card flashcard flip-card" id="card" style="position:relative;overflow:hidden">
        <div class="flip-inner ${showingBack? 'flipped':''}">
          <div class="flip-front">${c.front}</div>
          <div class="flip-back">${c.back}</div>
        </div>
      </div>
      <div style="margin-top:10px;display:flex;gap:8px">
        <button class="btn btn-ghost" id="prev">Prev</button>
        <button class="btn btn-primary" id="flip">Flip</button>
        <button class="btn btn-ghost" id="next">Next</button>
      </div>
      <hr style="margin:12px 0">
      <div>
        <h4>Add card</h4>
        <input id="ffront" placeholder="Front (question)" style="width:100%;padding:8px;margin-top:6px;border-radius:8px;border:1px solid #eee">
        <input id="fback" placeholder="Back (answer)" style="width:100%;padding:8px;margin-top:6px;border-radius:8px;border:1px solid #eee">
        <button class="btn btn-primary" id="add" style="margin-top:8px">Add card</button>
      </div>
    `;
    document.getElementById('flip').onclick = ()=>{ showingBack = !showingBack; document.querySelector('.flip-inner').classList.toggle('flipped') };
    document.getElementById('prev').onclick = ()=>{ idx = Math.max(0, idx-1); showingBack=false; render() };
    document.getElementById('next').onclick = ()=>{ idx = Math.min(cards.length-1, idx+1); showingBack=false; render() };
    document.getElementById('add').onclick = ()=>{
      const f = document.getElementById('ffront').value.trim();
      const b = document.getElementById('fback').value.trim();
      if(!f||!b) return alert('Please add front and back');
      userCards.push({front:f, back:b});
      localStorage.setItem(localKey, JSON.stringify(userCards));
      cards = [...base, ...userCards];
      idx = cards.length-1;
      document.getElementById('ffront').value=''; document.getElementById('fback').value='';
      render();
    };
  }

  render();
})();
