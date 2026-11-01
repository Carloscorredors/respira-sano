"use strict";
(()=>{
 let sdkPromise;
 function sdk(){if(window.Sketchfab)return Promise.resolve(window.Sketchfab);if(!sdkPromise)sdkPromise=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';script.onload=()=>window.Sketchfab?resolve(window.Sketchfab):reject(Error('sdk'));script.onerror=()=>reject(Error('network'));document.head.append(script);}).catch(e=>{sdkPromise=null;throw e;});return sdkPromise;}
 const annotations=[
  ['Tráquea','Conduce el aire hacia el tórax. Compara su recorrido con el explorador didáctico.'],
  ['Bronquios principales','Una rama principal conduce hacia cada pulmón. Observa su división en esta reconstrucción.'],
  ['Lóbulo superior derecho','Vista del lóbulo superior del pulmón derecho. Los colores distinguen regiones; no representan efectos químicos.'],
  ['Lóbulo medio derecho','Vista del lóbulo medio del pulmón derecho. Explora su relación con las demás regiones.'],
  ['Lóbulo inferior derecho','Vista del lóbulo inferior del pulmón derecho. La reconstrucción corresponde a datos de una tomografía.'],
  ['Lóbulo superior izquierdo','Vista del lóbulo superior del pulmón izquierdo. Gira el modelo para observarlo.'],
  ['Lóbulo inferior izquierdo','Vista del lóbulo inferior del pulmón izquierdo. Para estudiar el intercambio gaseoso, vuelve al detalle alveolar didáctico.']
 ];
 for(const box of document.querySelectorAll('[data-external-model]')){
  if(box.dataset.independent==='true')continue;
  const type=box.dataset.externalModel,lab=box.closest('.lab'),layout=box.closest('.anatomy-layout'),mount=box.querySelector('.external-frame'),status=box.querySelector('.external-status'),load=box.querySelector('.external-load'),back=box.querySelector('.external-native'),side=type==='lungs'?document.querySelector('.external-context'):null;
  const fit=box.querySelector('.external-fit');let api=null,serial=0,timer=null,active=false;
  function native(message='Explorador local activo. No necesita conexión.'){
   serial++;clearTimeout(timer);try{api?.stop();}catch{}api=null;active=false;mount.replaceChildren();mount.hidden=true;fit.hidden=true;lab.classList.remove('external-active');layout?.classList.remove('external-anatomy-active');if(side)side.hidden=true;load.setAttribute('aria-pressed','false');back.setAttribute('aria-pressed','true');load.disabled=false;status.textContent=message;box.dataset.state='native';box.dispatchEvent(new CustomEvent('modelviewernative'));
  }
  function explain(index){if(!side||!annotations[index])return;side.querySelector('.external-explanation').textContent=annotations[index][1];side.querySelector('.external-part-title').textContent=annotations[index][0];for(const button of side.querySelectorAll('[data-ext-annotation]'))button.setAttribute('aria-pressed',Number(button.dataset.extAnnotation)===index?'true':'false');}
  back.addEventListener('click',()=>native());
  fit.addEventListener('click',()=>{if(api&&active)api.recenterCamera();});
  load.addEventListener('click',async()=>{
   if(active)return;
   if(navigator.onLine===false){native('Sin conexión: el modelo de Sketchfab necesita internet. Puedes continuar con el explorador local.');return;}
   const attempt=++serial;load.disabled=true;box.dataset.state='loading';status.textContent='Conectando con Sketchfab… Si la red no lo permite, puedes continuar con la vista local.';
   timer=setTimeout(()=>{if(attempt===serial)native('Sketchfab no respondió a tiempo. La vista local sigue disponible; puedes reintentar o abrir la ficha del autor.');},25000);
   try{
    const Sketchfab=await sdk();if(attempt!==serial)return;
    const frame=document.createElement('iframe');frame.title=box.dataset.frameTitle;frame.allow='autoplay; fullscreen; xr-spatial-tracking';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';mount.replaceChildren(frame);mount.hidden=false;
    const client=new Sketchfab('1.12.1',frame);
    client.init(box.dataset.modelUid,{autostart:1,animation_autoplay:0,camera:0,dnt:1,preload:0,max_texture_size:1024,
     success(instance){if(attempt!==serial)return;api=instance;api.start();api.addEventListener('viewerready',()=>{
      if(attempt!==serial)return;clearTimeout(timer);active=true;load.disabled=false;load.setAttribute('aria-pressed','true');back.setAttribute('aria-pressed','false');lab.classList.add('external-active');layout?.classList.add('external-anatomy-active');if(side)side.hidden=false;box.dataset.state='ready';status.textContent='Modelo en línea listo. Arrastra para girar; utiliza la rueda o el gesto de acercamiento. La vista local continúa disponible.';
      fit.hidden=false;const announce=()=>box.dispatchEvent(new CustomEvent('modelviewerready',{detail:{api,type}}));if(type==='mask'||mount.clientWidth/mount.clientHeight<1.1)api.recenterCamera(announce);else announce();
      if(type==='lungs')api.getAnnotationList((error,list)=>{if(error||!list||list.length<7||attempt!==serial)return;annotations.forEach((a,i)=>api.updateAnnotation(i,{title:a[0],content:a[1]}));for(const button of side.querySelectorAll('[data-ext-annotation]'))button.disabled=false;explain(0);});
      if(type==='lungs')api.addEventListener('annotationSelect',index=>{if(attempt===serial)explain(index);});
     });},
     error(){if(attempt===serial)native('No fue posible cargar Sketchfab. Conservas la vista y las actividades locales.');}
    });
   }catch{if(attempt===serial)native('No fue posible conectar con Sketchfab. Conservas la vista y las actividades locales.');}
  });
  if(side){
   for(const button of side.querySelectorAll('[data-ext-annotation]'))button.addEventListener('click',()=>{if(!api||!active)return;const index=Number(button.dataset.extAnnotation);explain(index);api.gotoAnnotation(index,{preventCameraAnimation:matchMedia('(prefers-reduced-motion: reduce)').matches});});
   side.querySelector('[data-return-alveoli]').addEventListener('click',()=>{native();document.querySelector('[data-explorer-mode="anatomy"]').click();const alveolus=document.querySelector('#alveolus');if(alveolus.getAttribute('aria-pressed')!=='true')alveolus.click();document.querySelector('#respiratory-3d').scrollIntoView({block:'center'});});
   side.querySelector('[data-return-chemical]').addEventListener('click',()=>{native();document.querySelector('[data-explorer-mode="chemical"]').click();document.querySelector('#chemical-controls').scrollIntoView({block:'center'});});
  }
  for(const button of document.querySelectorAll(type==='lungs'?'[data-part],#alveolus,#follow-air,[data-explorer-mode]':'#leak'))button.addEventListener('click',()=>{if(active||box.dataset.state==='loading')native();},true);
  addEventListener('offline',()=>{if(active||box.dataset.state==='loading')native('Se perdió la conexión. Puedes seguir con la vista local.');});
  native();
 }
})();
