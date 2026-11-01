(function(){'use strict';
 const D=window.RespiraMedia13Data;if(!D||!window.RespiraAudio13)return;
 const m13=document.getElementById('m1-intercambio'),m16=document.getElementById('m1-vias');let alveolar=null,routes=null,m2=null;
 function mountAlveolar(){
  if(alveolar||!m13||m13.hidden||m13.inert)return;
  const description=m13.querySelector('#m1-alveolar-detailed .rsdm-detail');
  if(description)alveolar=window.RespiraAudio13.mount(description.parentElement,D.alveolar,{before:description});
 }
 if(m16){const host=m16.querySelector('.rs12-way-practice');if(host)routes=window.RespiraAudio13.mount(host,D.routes,{before:host.firstElementChild});}
 if(document.body.dataset.page==='gases-vapores'&&window.RespiraMedia12){const host=document.querySelector('[data-gv-stage="1"]');if(host){m2=window.RespiraMedia12.mount(host,D.mechanisms);m2.root.classList.add('rs13-m2-media');}}
 function visible(){mountAlveolar();alveolar?.setVisible(!document.hidden&&!m13.hidden&&!m13.inert);routes?.setVisible(!document.hidden&&!m16.hidden&&!m16.inert);const host=document.querySelector('[data-gv-stage="1"]');m2?.setVisible(!!host&&!host.hidden&&!document.hidden);}
 document.addEventListener('m1viewswitch',visible);document.addEventListener('visibilitychange',visible);
 // The original M2 controller changes stage.hidden; observe that one attribute only.
 const stage=document.querySelector('[data-gv-stage="1"]');if(stage){const observer=new MutationObserver(visible);observer.observe(stage,{attributes:true,attributeFilter:['hidden']});window.addEventListener('pagehide',()=>observer.disconnect(),{once:true});}
 window.addEventListener('pagehide',()=>{alveolar?.setVisible(false);routes?.setVisible(false);m2?.setVisible(false);});visible();
})();
