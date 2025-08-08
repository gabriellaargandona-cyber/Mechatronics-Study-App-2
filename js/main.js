// js/main.js - shared helpers + progress rendering
(function(){
  function qs(s){return document.querySelector(s)}
  function qsa(s){return Array.from(document.querySelectorAll(s))}

  // active nav
  qsa('.nav a').forEach(a=>{
    try{
      const href = a.getAttribute('href');
      if(location.pathname.endsWith(href) || (location.pathname.endsWith('/') && href==='index.html')){
        a.classList.add('active');
      }
    }catch(e){}
  });

  // study log
  window.logStudy = function(minutes){
    try{
      const key='studyLog';
      const raw = localStorage.getItem(key);
      const arr = raw?JSON.parse(raw):[];
      const today = new Date().toISOString().slice(0,10);
      const idx = arr.findIndex(x=>x.date===today);
      if(idx>=0) arr[idx].minutes += minutes; else arr.push({date:today, minutes});
      localStorage.setItem(key, JSON.stringify(arr));
      window.renderProgress && window.renderProgress();
      window.updateToday && window.updateToday();
    }catch(e){}
  }

  window.renderProgress = function(){
    const raw = localStorage.getItem('studyLog');
    const log = raw?JSON.parse(raw):[];
    const today = new Date();
    let total = 0;
    for(let i=6;i>=0;i--){
      const d = new Date(today); d.setDate(today.getDate()-i);
      const key = d.toISOString().slice(0,10);
      const day = log.find(x=>x.date===key);
      if(day) total += day.minutes;
    }
    const pct = Math.min(100, Math.round((total/210)*100));
    const fill = qs('.progress-fill');
    if(fill) fill.style.width = pct + '%';
    const badge = qs('#progress-badge');
    if(badge) badge.innerText = `${total} min / week`;
  }

  window.updateToday = function(){
    const raw = localStorage.getItem('studyLog');
    const log = raw?JSON.parse(raw):[];
    const today = new Date().toISOString().slice(0,10);
    const obj = log.find(x=>x.date===today);
    const el = qs('#today-activity');
    if(el) el.innerText = obj ? `${obj.minutes} minutes logged today` : 'No study logged yet';
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    renderProgress();
    updateToday();
    qsa('[data-log-mins]').forEach(b=>b.addEventListener('click', ()=>{ logStudy(Number(b.getAttribute('data-log-mins'))) }));
  });
})();
