// js/game.js - small matching game
(function(){
  const root = document.getElementById('game-root') || document.getElementById('game-container');
  if(!root) return;
  const pairs = [
    ['Encoder','A device that converts position to electrical signals'],
    ['PWM','Pulse width modulation for motor control'],
    ['PLC','Programmable logic controller'],
    ['IMU','Inertial measurement unit']
  ];
  let cards = [];
  pairs.forEach((p,i)=>{ cards.push({id:i, label:p[0], kind:'t', flipped:false, matched:false}); cards.push({id:i, label:p[1], kind:'d', flipped:false, matched:false})});
  cards = cards.sort(()=>Math.random()-0.5);
  let last = null;

  function render(){
    root.innerHTML = `<div class="card"><div class="game-grid" id="grid">${cards.map((c,idx)=>`<div class="game-card" data-idx="${idx}">${c.flipped||c.matched? c.label : 'Flip'}</div>`).join('')}</div></div>
      <div style="margin-top:10px"><button class="btn btn-primary" id="restart">Restart</button></div>`;
    document.getElementById('restart').onclick = ()=>{ cards = cards.sort(()=>Math.random()-0.5); cards.forEach(c=>{c.matched=false;c.flipped=false}); last=null; render(); }
    document.querySelectorAll('.game-card').forEach(el=>{
      el.onclick = ()=>{
        const i = Number(el.getAttribute('data-idx'));
        if(cards[i].flipped||cards[i].matched) return;
        cards[i].flipped = true; render();
        if(last===null) last=i;
        else {
          const a=cards[last], b=cards[i];
          if(a.id===b.id){ a.matched=true; b.matched=true; last=null; render(); }
          else { setTimeout(()=>{ a.flipped=false; b.flipped=false; last=null; render(); }, 700); }
        }
      }
    });
  }
  render();
})();
