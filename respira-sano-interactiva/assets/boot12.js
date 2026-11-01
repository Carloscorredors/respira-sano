(function(){'use strict';
 const screen=id=>document.getElementById(id);let cases=null,routes=null,challenge=null,formsMedia=null;
 const m15=screen('m1-reconoce'),m16=screen('m1-vias'),m17=screen('m1-resuelve');
 // This adapter runs after the unchanged activities11 boot. Retire only nodes in these screens.
 if(m15&&window.RespiraCases12&&window.RespiraCases12Data?.cases?.length===11){
  cases=window.RespiraCases12.mount(m15.querySelector('.m1-content'),window.RespiraCases12Data);
 }
 if(m16&&window.RespiraRoutes12){
  const layout=m16.querySelector('.m5-way-layout'),practice=layout?.querySelector('[data-m4-question="ways"]'),bridge=layout?.querySelector('.m5-bridge');
  if(layout&&practice){const host=document.createElement('div'),quiz=document.createElement('section');host.className='rs12-m16-host';quiz.className='rs12-way-practice';quiz.setAttribute('aria-label','Contrasta las vías de ingreso');quiz.append(practice);if(bridge)quiz.append(bridge);layout.replaceWith(host,quiz);
   routes=window.RespiraRoutes12.mount(host,{onSelect(id){if(['respiratoria','piel-ojos','ingestion'].includes(id))window.RespiraExpedition?.view('way',id);}});
   const saved=window.RespiraExpedition?.get()?.view?.way;if(saved)routes.select(saved);
  }
 }
 if(m17&&window.RespiraChallengeVisual12)challenge=window.RespiraChallengeVisual12.mount({root:m17});
 const forms=screen('formas');if(forms&&window.RespiraMedia12&&window.RespiraFormsMedia12Data)formsMedia=window.RespiraMedia12.mount(forms.querySelector('.m1-content'),window.RespiraFormsMedia12Data);
 function visibility(){cases?.setVisible(!m15.hidden&&!m15.inert&&!document.hidden);routes?.setVisible(!m16.hidden&&!m16.inert&&!document.hidden);formsMedia?.setVisible(!forms.hidden&&!forms.inert&&!document.hidden);}
 document.addEventListener('m1viewswitch',visibility);document.addEventListener('visibilitychange',visibility);window.addEventListener('pagehide',()=>{cases?.setVisible(false);routes?.setVisible(false);formsMedia?.setVisible(false);});visibility();
 document.documentElement.dataset.rs12Adapters='ready';
})();
