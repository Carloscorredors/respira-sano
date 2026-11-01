"use strict";
(() => {
 const data=window.RespiraHospital12Scenes;
 if(!data)return;
 const controls=['eliminacion','encerramiento','extraccion','ventilacion','procedimiento','proteccion'];
 const caseOrder=['patologia','endoscopia','limpieza'];
 const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
 let active=null;
 function mount(options={}){
  if(active)return active;
  const doc=options.document||document;
  const preview=options.preview===true;
  if(!preview&&doc.body?.dataset.page!=='hospital')return null;
  const find=s=>doc.querySelector(s);
  const originalM3=find('svg[aria-labelledby="scene-title scene-desc"]');
  const originalM4=find('svg[aria-labelledby="mission-scene-title mission-scene-desc"]');
  if(!originalM3||!originalM4)return null;
  const abort=new AbortController(),signal=abort.signal,cluePresentation=new Map();let clueObserver=null;
  let caseId=readCase(),selectedClue=null,lastControls=readControls(),lastFocusedControl='';
  const views=[make(originalM3,'m3'),make(originalM4,'m4')];
  function readCase(){const value=find('#mission-case')?.value;if(data.cases[value])return value;const index=Number(find('#case-buttons [data-case][aria-pressed="true"]')?.dataset.case);return caseOrder[index]||'endoscopia';}
  function readControls(){return [...doc.querySelectorAll('#control-buttons [data-control][aria-pressed="true"]')].map(b=>b.dataset.control).filter(x=>controls.includes(x));}
  function make(svg,mode){
   const wrap=doc.createElement('div');wrap.className='rs12-hospital';wrap.dataset.rs12Mode=mode;
   wrap.innerHTML='<div class="rs12-scene-heading"><span class="rs12-scene-kind">'+(mode==='m3'?'Investiga cinco pistas':'Compara dónde actúan las medidas')+'</span><span class="rs12-scene-case"></span></div><div class="rs12-viewport"></div><div class="rs12-scene-tools" role="group" aria-label="Vista de la escena"><button type="button" class="rs12-tool" data-rs12-zoom="in" aria-label="Acercar la escena">＋ Acercar</button><button type="button" class="rs12-tool" data-rs12-zoom="out" aria-label="Alejar la escena">− Alejar</button><button type="button" class="rs12-tool" data-rs12-reset>Ver puesto completo</button></div><p class="rs12-scene-status" role="status"></p>';
   svg.replaceWith(wrap);
   const evidence=doc.createElement('div');evidence.className='rs12-evidence';evidence.hidden=true;wrap.append(evidence);
   const view={mode,wrap,viewport:wrap.querySelector('.rs12-viewport'),status:wrap.querySelector('.rs12-scene-status'),evidence,box:[0,0,880,520],svg:null};
   wrap.addEventListener('click',event=>{
    const clue=event.target.closest('[data-rs12-clue]'),control=event.target.closest('[data-rs12-control]'),zoom=event.target.closest('[data-rs12-zoom]');
    if(clue){const index=Number(clue.dataset.rs12Clue);if(preview){selectClue(index);options.onClue?.(index);}else find('#clue-buttons [data-clue-button="'+index+'"]')?.click();}
    if(control){const key=control.dataset.rs12Control;if(preview){const next=lastControls.includes(key)?lastControls.filter(x=>x!==key):[...lastControls,key];setContext({caseId,controls:next});options.onControl?.(key,next);}else find('#control-buttons [data-control="'+key+'"]')?.click();}
    if(zoom)zoomBy(view,zoom.dataset.rs12Zoom==='in'?.8:1.25);
    if(event.target.closest('[data-rs12-reset]'))reset(view);
   },{signal});
   wrap.addEventListener('keydown',event=>{const target=event.target.closest('[data-rs12-clue],[data-rs12-control]');if(target&&['Enter',' '].includes(event.key)){event.preventDefault();target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}if(event.key==='Escape'){reset(view);wrap.querySelector('[data-rs12-reset]').focus({preventScroll:true});}},{signal});
   return view;
  }
  function render(view){
   const focusKey=doc.activeElement?.closest?.('[data-rs12-clue],[data-rs12-control]');const attribute=focusKey?.hasAttribute('data-rs12-clue')?'data-rs12-clue':focusKey?'data-rs12-control':'';const focusValue=attribute?focusKey.getAttribute(attribute):'';
   view.viewport.innerHTML=data.scenes[caseId][view.mode];view.svg=view.viewport.querySelector('svg');
   view.wrap.querySelector('.rs12-scene-case').textContent=data.cases[caseId].name;
   view.box=[0,0,880,520];applyBox(view);syncHighlights(view);view.evidence.hidden=true;view.evidence.replaceChildren();if(view.mode==='m3')syncCluePresentation();
   view.status.textContent=view.mode==='m3'?'Elige un punto o una pista para acercarte a esa parte de la tarea.':'Activa una medida en la escena o en los controles. Las medidas activas se conservan en el expediente.';
   if(attribute&&focusKey&&view.wrap.contains(focusKey))view.svg.querySelector('['+attribute+'="'+focusValue+'"]')?.focus();
  }
  function applyBox(view){view.svg?.setAttribute('viewBox',view.box.map(n=>Number(n.toFixed(3))).join(' '));const scale=880/view.box[2];view.wrap.dataset.zoom=scale.toFixed(2);view.wrap.querySelector('[data-rs12-zoom="in"]').disabled=scale>=3.9;view.wrap.querySelector('[data-rs12-zoom="out"]').disabled=scale<=1.01;}
  function zoomBy(view,factor){const old=view.box,width=clamp(old[2]*factor,220,880),height=width*520/880;view.box=[clamp(old[0]+(old[2]-width)/2,0,880-width),clamp(old[1]+(old[3]-height)/2,0,520-height),width,height];applyBox(view);view.status.textContent='Vista de '+data.cases[caseId].name+' · Acercamiento '+(880/width).toFixed(1)+'×. Usa «Ver puesto completo» para volver.';}
  function focusPoint(view,point,area,label){
   // Static viewBox changes are immediate and independent of animation clocks.
   const minWidth=300;let x=area[0],y=area[1],width=Math.max(area[2],minWidth),height=width*520/880;
   const cx=area[0]+area[2]/2,cy=area[1]+area[3]/2;x=clamp(cx-width/2,0,880-width);y=clamp(cy-height/2,0,520-height);
   if(point){x=clamp(point[0]-width/2,0,880-width);y=clamp(point[1]-height/2,0,520-height);}
   view.box=[x,y,width,height];applyBox(view);view.status.textContent=label+' · '+data.cases[caseId].name+'. «Ver puesto completo» recupera el contexto.';
  }
  function reset(view){view.box=[0,0,880,520];applyBox(view);view.status.textContent='Puesto completo · '+data.cases[caseId].name+'. La selección y las medidas del expediente se conservan.';}
  function syncHighlights(view){
   for(const el of view.svg.querySelectorAll('[data-rs12-clue]'))el.setAttribute('aria-pressed',String(Number(el.dataset.rs12Clue)===selectedClue));
   for(const el of view.svg.querySelectorAll('[data-rs12-control]'))el.setAttribute('aria-pressed',String(lastControls.includes(el.dataset.rs12Control)));
   const on=id=>lastControls.includes(id),prefix=view.mode==='m4'?'mission-':'';
   view.svg.querySelector('#'+prefix+'lid')?.setAttribute('opacity',on('encerramiento')?'1':'.22');
   view.svg.querySelector('#'+prefix+'hood')?.setAttribute('opacity',on('extraccion')?'1':'.28');
   view.svg.querySelector('#'+prefix+'capture-flow')?.setAttribute('visibility',on('extraccion')?'visible':'hidden');
   if(view.mode==='m4')for(const [id,key]of [['mission-room-ventilation','ventilacion'],['mission-source-alternative','eliminacion'],['mission-procedure','procedimiento'],['mission-ppe','proteccion']])view.svg.querySelector('#'+id)?.setAttribute('visibility',on(key)?'visible':'hidden');
  }
  function showEvidence(view,observed,pending){
   view.evidence.replaceChildren();
   for(const [label,text] of [['Observado en esta escena simulada',observed],['Información por confirmar en la tarea real',pending]]){const item=doc.createElement('div'),heading=doc.createElement('strong'),body=doc.createElement('p');heading.textContent=label;body.textContent=text;item.append(heading,body);view.evidence.append(item);}
   view.evidence.hidden=false;if(view.mode==='m3')syncCluePresentation();
  }
  function syncCluePresentation(){
   const legacy=find('#clue-detail'),view=views[0];if(!legacy)return;
   const pending=view.evidence.querySelector(':scope > div:last-child > p')?.textContent.trim()||'';
   const visible=!view.evidence.hidden&&!view.wrap.closest('[hidden],[inert]');
   for(const p of legacy.querySelectorAll(':scope > p'))if(!cluePresentation.has(p))cluePresentation.set(p,p.hidden);
   for(const [p,priorHidden] of cluePresentation){if(!legacy.contains(p)){p.hidden=priorHidden;cluePresentation.delete(p);continue;}const duplicate=visible&&pending!==''&&p.textContent.trim()===pending;p.hidden=priorHidden||duplicate;}
  }
  function selectClue(index){if(!Number.isInteger(index)||index<0||index>4)return;selectedClue=index;const view=views[0],c=data.cases[caseId];syncHighlights(view);focusPoint(view,c.points[index],c.focus[index],'Pista '+(index+1)+' · '+data.clue_labels[index]);
   const clue=data.evidence?.cases.find(c=>c.id===caseId)?.clues[index];if(clue)showEvidence(view,data.evidence.scene_observations[caseId][index],clue[1]);
  }
  function focusControl(key){
   const view=views[1],c=data.cases[caseId];const areas={eliminacion:[43,38,360,170],encerramiento:[c.source[0]-150,c.source[1]-94,320,189],extraccion:c.focus[2],ventilacion:[560,25,320,190],procedimiento:[43,327,360,190],proteccion:[22,225,320,190]};
   if(!areas[key])return;const label=find('#control-buttons [data-control="'+key+'"]')?.textContent?.trim()||key;focusPoint(view,null,areas[key],label);
   const definition=data.evidence?.control_definitions.find(d=>d[0]===key);if(definition)showEvidence(view,'Medida activada en el esquema: '+definition[1]+'.',definition[2]);
  }
  function setContext(context={}){
   const next=data.cases[context.caseId]?context.caseId:readCase();const changed=next!==caseId;const nextControls=Array.isArray(context.controls)?context.controls.filter(x=>controls.includes(x)):readControls();const newlyOn=nextControls.filter(key=>!lastControls.includes(key));
   caseId=next;lastControls=[...nextControls];
   if(changed){selectedClue=null;lastFocusedControl='';views.forEach(render);}else views.forEach(syncHighlights);
   const focused=newlyOn.at(-1);if(focused&&!changed){focusControl(focused);lastFocusedControl=focused;}
   if(lastFocusedControl&&!lastControls.includes(lastFocusedControl)){lastFocusedControl='';views[1].evidence.hidden=true;reset(views[1]);}
  }
  doc.addEventListener('respiracasechange',event=>setContext(event.detail),{signal});
  doc.addEventListener('click',event=>{const button=event.target.closest?.('#clue-buttons [data-clue-button]');if(button)selectClue(Number(button.dataset.clueButton));},{signal});
  doc.addEventListener('rsmissioncontext',syncCluePresentation,{signal});
  views.forEach(render);
  const clueDetail=find('#clue-detail');if(clueDetail){clueObserver=new MutationObserver(syncCluePresentation);clueObserver.observe(clueDetail,{childList:true,subtree:true,characterData:true});}
  // This component changes drawing/view only. Legacy remains the sole writer of cases/notes/proof.
  const note=views[0].wrap.closest('.lab')?.querySelector('.lab-note');if(note)note.textContent='Escena didáctica del caso seleccionado. Los cinco puntos abren las mismas pistas del expediente. Las flechas muestran una intención de control; no miden flujo, concentración ni eficacia.';
  active={setContext,selectClue,reset(){views.forEach(reset);},snapshot(){return{caseId,selectedClue,controls:[...lastControls],views:views.map(v=>({mode:v.mode,viewBox:[...v.box]}))};},destroy(){abort.abort();clueObserver?.disconnect();for(const [p,priorHidden] of cluePresentation)p.hidden=priorHidden;for(const view of views)view.wrap.replaceWith(view.mode==='m3'?originalM3:originalM4);active=null;}};
  return active;
 }
 window.RespiraHospital12={mount};
 if(document.body?.dataset.page==='hospital')mount();
})();
