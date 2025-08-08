// js/quiz.js - lightweight quiz renderer
(async function(){
  const root = document.getElementById('quiz-root') || document.getElementById('quiz-container');
  if(!root) return;
  const res = await fetch('./data/quizzes.json');
  const data = await res.json();
  let idx = 0, score = 0;

  function renderQuestion(){
    if(idx >= data.length){
      root.innerHTML = `<div class="card"><h2>Quiz complete</h2><p>Your score: ${score}/${data.length}</p><button class="btn btn-primary" id="retake">Retake</button></div>`;
      document.getElementById('retake').onclick = ()=>{ idx=0; score=0; renderQuestion() };
      return;
    }
    const q = data[idx];
    const choicesHtml = q.choices.map((c,i)=>`<div class="choice" data-i="${i}">${c}</div>`).join('');
    root.innerHTML = `<div class="card"><h3 style="margin:0 0 6px 0">${q.q}</h3><div id="choices">${choicesHtml}</div></div>`;
    document.querySelectorAll('.choice').forEach(el=>{
      el.onclick = ()=>{
        const i = Number(el.getAttribute('data-i'));
        if(i === q.a){ el.style.background='#dcfce7'; el.innerText = '✅ '+el.innerText; score++; }
        else { el.style.background='#fee2e2'; el.innerText = '✖️ '+el.innerText; }
        setTimeout(()=>{ idx++; renderQuestion() }, 700);
      }
    })
  }

  renderQuestion();
})();
