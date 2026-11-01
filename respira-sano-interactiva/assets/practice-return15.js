/* Optional-practice return only. Original bridge owns navigation and records. */
(function(global){
 'use strict';
 if(global.RespiraPracticeReturn15 && typeof global.RespiraPracticeReturn15.refresh==='function'){global.RespiraPracticeReturn15.refresh();return;}
 const doc=global.document,marker='data-rs15-practice-return',footerClass='rs15-practice-footer';
 const pages=Object.freeze({1:'recorrido',2:'gases-vapores',3:'hospital',4:'hospital',5:'respiradores',6:'respiradores'});
 const screens=Object.freeze(['m1-intercambio','formas','m1-reconoce']);let disposed=false;
 function visible(node){
  if(!node || !node.isConnected || node.closest('[hidden],[inert]'))return false;
  if(typeof global.getComputedStyle==='function')for(let n=node;n && n.nodeType===1;n=n.parentElement){const css=global.getComputedStyle(n);if(css.display==='none' || css.visibility==='hidden')return false;}
  return true;
 }
 function request(){
  const values=new URLSearchParams(global.location.search).getAll('rs-practice');
  if(values.length!==1 || !/^[1-6]$/.test(values[0]))return null;
  const value=values[0];
  if(!doc.body || doc.body.dataset.page!==pages[value] || doc.documentElement.dataset.rsMission!==value)return null;
  if(value==='1'){
   const active=screens.map(id=>doc.getElementById(id)).filter(visible);
   if(active.length!==1)return null;const footer=active[0].querySelector('.m1-bottom');
   return visible(footer)?{value,target:footer,mode:'m1'}:null;
  }
  const main=doc.getElementById('main');return visible(main)?{value,target:main,mode:'band'}:null;
 }
 function clear(){
  doc.querySelectorAll('['+marker+']').forEach(node=>node.remove());
  doc.querySelectorAll('.'+footerClass).forEach(node=>node.classList.remove(footerClass));
 }
 function refresh(){
  if(disposed)return;const item=request();if(!item){clear();return;}
  const href='herramientas/ampliacion-opcional.html#ampliacion-m'+item.value;
  const existing=doc.querySelector('['+marker+']');
  if(existing && existing.parentElement===item.target && existing.dataset.practiceBlock===item.value && existing.dataset.practiceMode===item.mode)return;
  clear();
  const wrapper=doc.createElement(item.mode==='band'?'nav':'div');wrapper.setAttribute(marker,'');wrapper.dataset.practiceBlock=item.value;wrapper.dataset.practiceMode=item.mode;
  wrapper.className=item.mode==='band'?'rs15-practice-band':'rs15-practice-foot-link';
  if(item.mode==='band')wrapper.setAttribute('aria-label','Retorno a la práctica opcional');
  const link=doc.createElement('a');link.className='rs15-practice-return';link.href=href;link.textContent='Volver a mi práctica';
  if(item.mode==='band'){
   const label=doc.createElement('span');label.className='rs15-practice-context';label.textContent='Práctica opcional · M'+item.value;wrapper.append(label,link);item.target.prepend(wrapper);
  }else{wrapper.append(link);item.target.classList.add(footerClass);item.target.append(wrapper);}
 }
 function cleanup(){if(disposed)return;disposed=true;global.removeEventListener('hashchange',refresh);doc.removeEventListener('rsmissioncontext',refresh);doc.removeEventListener('m1viewswitch',refresh);doc.removeEventListener('DOMContentLoaded',refresh);clear();if(global.RespiraPracticeReturn15===api)delete global.RespiraPracticeReturn15;}
 const api=Object.freeze({refresh,cleanup});global.RespiraPracticeReturn15=api;
 global.addEventListener('hashchange',refresh);doc.addEventListener('rsmissioncontext',refresh);doc.addEventListener('m1viewswitch',refresh);if(doc.readyState==='loading')doc.addEventListener('DOMContentLoaded',refresh,{once:true});refresh();
})(window);
