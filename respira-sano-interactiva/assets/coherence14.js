(function(){'use strict';
 function align(){
  const filter=document.querySelector('#gv-filters [data-gv-filter="longterm"]');if(filter&&filter.textContent!=='Peligro carcinogénico')filter.textContent='Peligro carcinogénico';
  const formal=document.querySelector('#gv-agent-list [data-gv-agent="formaldehyde"] small');if(formal&&formal.textContent.includes('Efectos a largo plazo'))formal.textContent=formal.textContent.replace('Efectos a largo plazo','Peligro carcinogénico');
  if(document.querySelector('[data-gv-agent="formaldehyde"][aria-pressed="true"]'))for(const tag of document.querySelectorAll('#gv-agent-detail .gv-tags span'))if(tag.textContent==='Efectos a largo plazo')tag.textContent='Peligro carcinogénico';
  const links=document.getElementById('case-model-links');if(links){for(const a of links.querySelectorAll('a'))if(a.textContent.includes('Explorar formaldehído en 3D'))a.textContent='Comparar formas en el aire';const heading=links.querySelector('.detail-label');if(heading&&heading.textContent==='Conecta con el cuerpo')heading.textContent='Compara ejemplos y formas';}
 }
 const observer=new MutationObserver(align);for(const id of ['gv-agent-list','gv-agent-detail','case-model-links']){const node=document.getElementById(id);if(node)observer.observe(node,{childList:true,subtree:true});}align();window.addEventListener('pagehide',()=>observer.disconnect(),{once:true});
})();
