(()=>{'use strict';let viewer=null;const host=document.getElementById('m4-form-diagram'),screen=document.getElementById('formas');if(!host||!screen||!screen.contains(host)||!window.RespiraGenerationModels)return;
 const visible=()=>!screen.hidden&&!screen.inert;
 function sync(){if(!viewer&&visible()){viewer=RespiraGenerationModels.mount(host,{form:host.dataset.form||'gas',visible:true});}if(viewer){if(viewer.snapshot().form!==host.dataset.form)viewer.setForm(host.dataset.form||'gas');viewer.setVisible(visible());}}
 // Existing form handlers retain the same persistence contract; only their diagram is replaced.
 document.querySelector('.m4-form-buttons')?.addEventListener('click',e=>{if(e.target.closest('[data-m4-form]'))sync();});
 // The wizard dispatches this after updating hidden/inert; no DOM observer is needed.
 document.addEventListener('m1viewswitch',sync);sync();
})();
