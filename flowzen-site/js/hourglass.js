(function(){
  const svg=document.getElementById('hgSvg');
  const topSand=document.getElementById('topSand');
  const botSand=document.getElementById('botSand');
  const stream=document.getElementById('stream');
  const timer=document.getElementById('hgTimer');
  const stateEl=document.getElementById('hgState');
  const flipBtn=document.getElementById('hgFlip');
  const endBtn=document.getElementById('hgEnd');
  const breathe=document.getElementById('hgBreathe');
  const DURATION=5*60*1000;
  const TOP_Y0=24, TOP_Y1=148, BOT_Y0=276, BOT_Y1=152;
  let raf=null, startT=0, running=false, ended=false;
  function setSand(p){
    const surf=TOP_Y0+(TOP_Y1-TOP_Y0)*p;
    topSand.setAttribute('y',surf); topSand.setAttribute('height',TOP_Y1-surf);
    const bsurf=BOT_Y0+(BOT_Y1-BOT_Y0)*p;
    botSand.setAttribute('y',bsurf); botSand.setAttribute('height',BOT_Y0-bsurf);
  }
  function fmt(ms){const s=Math.max(0,Math.ceil(ms/1000));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');}
  function reset(){cancelAnimationFrame(raf);running=false;ended=false;setSand(0);stream.setAttribute('opacity',0);timer.textContent='5:00';stateEl.textContent='Flip to begin a 5-minute break';flipBtn.textContent='Flip the hourglass';flipBtn.hidden=false;endBtn.hidden=true;breathe.classList.remove('run');}
  function start(){running=true;ended=false;startT=performance.now();stream.setAttribute('opacity',1);breathe.classList.add('run');stateEl.textContent='Breathe with the sand — 4s in, 4s hold, 4s out';flipBtn.hidden=true;endBtn.hidden=false;function loop(t){const p=Math.min(1,(t-startT)/DURATION);setSand(p);timer.textContent=fmt(DURATION-(t-startT));if(p<1){raf=requestAnimationFrame(loop);}else{done();}}raf=requestAnimationFrame(loop);}
  function done(){running=false;ended=true;stream.setAttribute('opacity',0);breathe.classList.remove('run');timer.textContent='0:00';stateEl.textContent='Session complete — return calibrated';flipBtn.textContent='Begin again';flipBtn.hidden=false;endBtn.hidden=true;}
  if(flipBtn){flipBtn.addEventListener('click',()=>{if(!running){reset();start();}});}
  if(endBtn){endBtn.addEventListener('click',()=>{if(running){setSand(1);done();}});}
  if(svg){svg.addEventListener('click',()=>{if(!running){reset();start();}});}
  document.querySelectorAll('.faq').forEach(d=>d.addEventListener('toggle',()=>{const s=d.querySelector('.sign');if(s)s.textContent=d.open?'\u2212':'+';}));
  reset();
})();