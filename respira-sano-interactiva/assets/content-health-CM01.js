"use strict";
(() => {
 function mount(){
  if(document.body.dataset.page!=="gases-vapores")return;
  const D=window.RespiraGasesVapores;if(!D)return;
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function refresh(){
   const host=document.querySelector("#gv-agent-detail");if(!host)return;
   const id=document.querySelector('[data-gv-agent][aria-pressed="true"]')?.dataset.gvAgent;
   const c=D.cases.find(item=>item.id===id)||D.cases[0],h=c?.health_detail;if(!h)return;
   let panel=host.querySelector("[data-cm01-health]");
   if(panel?.dataset.agent===c.id)return;
   panel?.remove();panel=document.createElement("section");panel.className="cm01-content cm01-agent-health";panel.dataset.cm01Health="";panel.dataset.agent=c.id;
   panel.innerHTML='<span class="cm01-kicker">Del agente al efecto</span><h3>Cómo puede afectar al organismo</h3><p><strong>Cómo actúa:</strong> '+esc(h.mechanism)+'</p><p><strong>Zonas u órganos diana:</strong> '+esc(h.targets)+'</p><div class="cm01-grid"><details><summary>Efectos de aparición aguda</summary><p>'+esc(h.acute)+'</p></details><details><summary>Repetición, largo plazo o persistencia</summary><p>'+esc(h.repeated)+'</p></details></div><p class="cm01-source">'+h.source_ids.map(id=>{const s=D.sources[id];return '<a href="'+esc(s.url)+'" target="_blank" rel="noopener">'+esc(s.title)+'</a>';}).join(' · ')+'</p>';
   host.append(panel);
  }
  refresh();
  document.addEventListener("click",event=>{
   if(event.target.closest('[data-gv-agent],[data-gv-filter],#gv-filter-reset'))queueMicrotask(refresh);
   if(event.target.closest('[data-cm01-go="mixes"]')){
    document.querySelector('[data-gv-go="3"]')?.click();
    const target=document.querySelector("#cm01-mixes");target?.scrollIntoView({block:"start"});
    const heading=target?.querySelector("h3");heading?.setAttribute("tabindex","-1");heading?.focus({preventScroll:true});
   }
  });
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount,{once:true});else mount();
})();
