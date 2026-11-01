/* EC01: encuadre del explorador de M2. No lee ni escribe respuestas o progreso. */
(()=>{'use strict';
 const section=document.querySelector('#rm02-explore');if(!section)return;
 const shell=section.querySelector('#rm02-shell'),toggle=section.querySelector('[data-rm02-toggle]'),entry=document.querySelector('[data-rm02-open]');
 let frame=null,guideObserver=null,lastHeight=null;
 function clearance(){
  const guide=document.querySelector('.rg-mission-guide');
  return guide&&!guide.hidden&&['sticky','fixed'].includes(getComputedStyle(guide).position)?Math.ceil(guide.getBoundingClientRect().height)+16:16;
 }
 function sendViewport(){
  if(!frame)return;
  const height=Math.max(220,Math.min(500,window.innerHeight-clearance()-20));
  if(height===lastHeight)return;
  lastHeight=height;
  frame.contentWindow.postMessage({type:'respira-m2-models-viewport',maxHeight:height},location.origin);
 }
 function setOpen(open){
  shell.hidden=!open;toggle.textContent=open?'Cerrar explorador':'Abrir explorador';
  for(const b of [toggle,entry])if(b)b.setAttribute('aria-expanded',String(open));
  if(open&&!frame){
   frame=document.createElement('iframe');
   frame.title='Explorador de efectos: mucosa, órganos, tiempos, dosis, mezclas y N95';
   frame.src='assets/m2-modelos-RM02/index.html?v=PM01-2';frame.className='rm02-frame';frame.height='1180';
   frame.addEventListener('load',()=>{lastHeight=null;sendViewport();});shell.append(frame);
   const guide=document.querySelector('.rg-mission-guide');
   if(guide){guideObserver=new ResizeObserver(sendViewport);guideObserver.observe(guide);}
  }
  if(!open&&frame){guideObserver?.disconnect();guideObserver=null;frame.remove();frame=null;lastHeight=null;}
 }
 toggle.addEventListener('click',()=>setOpen(shell.hidden));
 entry?.addEventListener('click',()=>{setOpen(true);section.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
 window.addEventListener('resize',sendViewport);
 window.addEventListener('message',event=>{
  if(!frame||event.source!==frame.contentWindow||event.origin!==location.origin)return;
  if(event.data?.type==='respira-m2-models-height'){
   const h=Number(event.data.height);
   if(Number.isFinite(h))frame.height=String(Math.min(6500,Math.max(650,Math.ceil(h)+4)));
  }
  if(event.data?.type==='respira-m2-models-focus'){
   const top=Number(event.data.top);if(!Number.isFinite(top)||top<0||top>6500)return;
   sendViewport();
   requestAnimationFrame(()=>requestAnimationFrame(()=>{if(!frame)return;const target=Math.max(0,window.scrollY+frame.getBoundingClientRect().top+top-clearance());window.scrollTo({top:target,behavior:'instant'});const host=frame.contentDocument?.querySelector('#canvas-host'),rect=host?.getBoundingClientRect();if(rect)section.dataset.ec01Viewport=JSON.stringify({top:frame.getBoundingClientRect().top+rect.top,bottom:frame.getBoundingClientRect().top+rect.bottom,guide:clearance()-16,viewport:window.innerHeight});}));
  }
 });
})();
