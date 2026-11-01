"use strict";
(() => {
 if(window.RespiraFeedback15){window.RespiraFeedback15.mount();return;}
 const PAGE_TARGETS={
  'gases-vapores':[
   ...['GV-MITO','GV-TIEMPO','GV-DECISION'].map(id=>({key:id,root:'[data-gv-question="'+id+'"]',native:'#gv-feedback-'+id,name:id,review:'[data-gv-review="'+id+'"]',yes:'Decisión fundamentada.',no:'Vuelve a contrastar tu respuesta.'}))
  ],
  hospital:[
   ...['exposure','controls-verification'].map(id=>({key:id,native:'#feedback-'+id,name:id,review:'[data-check="'+id+'"]',yes:'Decisión fundamentada.',no:'Vuelve a explorar.'}))
  ],
  respiradores:[
   ...['unknown','fit'].map(id=>({key:id,native:'#feedback-'+id,name:id,review:'[data-check="'+id+'"]',yes:'Decisión fundamentada.',no:'Vuelve a explorar.'})),
   {key:'care',root:'#care-question',native:'#care-feedback',care:true,review:'#care-check',yes:'Decisión fundamentada.',no:'Revisa el criterio.'},
   {key:'use-order',root:'#use-order',native:'#use-order-feedback',order:true,review:'#use-check-order',yes:'Orden conceptual coherente:',no:'Revisa la relación entre preparación, colocación, sello y decisión.'}
  ]
 };
 const CARE_NAMES=['care-face','care-filters','care-storage','care-change','care-abnormal'];
 const ORDER_IDS=['prepare','don','seal','decide'];
 const TOKENS=['rs15-option','rs15-answer-selected','rs15-correct','rs15-incorrect','rs15-pending','rs15-sequence'];
 const prefix=(text,value)=>text===value||text.startsWith(value+' ')||text.startsWith(value+'\n')||text.startsWith(value+'\r')||text.startsWith(value+'\t');
 function classify(config,{text,hidden,selectionCount,complete}){
  if(hidden||!(config.order?complete:selectionCount===1))return 'pending';
  if(prefix(text,config.yes))return 'correct';
  if(prefix(text,config.no))return 'incorrect';
  return 'pending';
 }
 let active=null;
 function mount(){
  if(active)return active;
  const doc=document,configs=PAGE_TARGETS[doc.body?.dataset.page];if(!configs)return null;
  const abort=new AbortController(),signal=abort.signal,controllers=[];
  function controller(config){
   const initialNative=doc.querySelector(config.native);
   const root=config.root?doc.querySelector(config.root):initialNative?.closest('.question');
   if(!root)return null;
   const observer=new MutationObserver(schedule);let scheduled=false,destroyed=false,native=null,nativeMarkerBefore=false,mirror=null,heading=null,icon=null,body=null,lastSignature='',lastLabels=[],state='pending',renderCount=0;
   const originals=new Map();
   function remember(element){if(!originals.has(element))originals.set(element,Object.fromEntries(TOKENS.map(name=>[name,element.classList.contains(name)])));}
   function restore(element,values){for(const name of TOKENS)element.classList.toggle(name,values[name]);}
   function clearOptions(){for(const [element,values]of originals)restore(element,values);originals.clear();lastLabels=[];}
   function observe(){if(destroyed)return;const settings={subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['hidden','checked']};observer.observe(root,settings);if(config.order){const feedback=doc.querySelector(config.native);if(feedback)observer.observe(feedback,settings);}}
   function release(){if(native&&!nativeMarkerBefore)native.classList.remove('rs15-native');mirror?.remove();native=null;mirror=null;lastSignature='';clearOptions();}
   function build(source){
    if(source===native&&mirror?.isConnected)return;
    release();native=source;nativeMarkerBefore=native.classList.contains('rs15-native');
    mirror=doc.createElement('div');mirror.className='rs15-result';mirror.dataset.rs15Owner=config.key;mirror.setAttribute('role','status');mirror.setAttribute('aria-live','polite');mirror.setAttribute('aria-atomic','true');
    const title=doc.createElement('p');title.className='rs15-result-title';icon=doc.createElement('span');icon.className='rs15-result-icon';icon.setAttribute('aria-hidden','true');heading=doc.createElement('strong');title.append(icon,heading);body=doc.createElement('div');body.className='rs15-result-body';mirror.append(title,body);
    native.insertAdjacentElement('afterend',mirror);
   }
   function read(){
    const source=doc.querySelector(config.native);if(!source||(!config.order&&!root.contains(source)))return null;
    if(config.order){const steps=[...root.querySelectorAll('[data-use-step]')].map(el=>el.dataset.useStep);return{source,labels:[],selected:null,text:source.textContent,hidden:source.hidden,selectionCount:0,complete:steps.length===4&&new Set(steps).size===4&&steps.every(id=>ORDER_IDS.includes(id)),choice:steps.join('|')};}
    const inputs=[...root.querySelectorAll('input[type="radio"]')].filter(el=>config.care?CARE_NAMES.includes(el.name):el.name===config.name);
    const selected=inputs.filter(el=>el.checked);const labels=[...new Set(inputs.map(el=>el.closest('label.option')).filter(Boolean))];
    return{source,labels,selected:selected.length===1?selected[0].closest('label.option'):null,text:source.textContent,hidden:source.hidden,selectionCount:selected.length,complete:false,choice:selected.map(el=>el.name+':'+el.value).join('|')};
   }
   function render(){
    if(destroyed)return;observer.disconnect();
    try{
     const reading=read();if(!reading){release();return;}
     build(reading.source);state=classify(config,reading);
     const signature=[state,reading.hidden,reading.choice,reading.text].join('\u0001');
     const sameLabels=reading.labels.length===lastLabels.length&&reading.labels.every((el,i)=>el===lastLabels[i]);
     if(signature===lastSignature&&sameLabels&&native.classList.contains('rs15-native'))return;
     clearOptions();lastLabels=[...reading.labels];
     for(const label of reading.labels){remember(label);label.classList.add('rs15-option');label.classList.toggle('rs15-answer-selected',label===reading.selected);for(const grade of ['correct','incorrect','pending'])label.classList.toggle('rs15-'+grade,label===reading.selected&&grade===state);}
     if(config.order){remember(root);root.classList.add('rs15-sequence');for(const grade of ['correct','incorrect','pending'])root.classList.toggle('rs15-'+grade,grade===state);}
     mirror.className='rs15-result rs15-'+state;mirror.dataset.rs15State=state;
     icon.textContent=state==='correct'?'✓':state==='incorrect'?'✕':'○';heading.textContent=state==='correct'?'Correcto':state==='incorrect'?'Incorrecto':'Pendiente';
     body.textContent=!reading.hidden&&reading.text?reading.text:config.order?'Ordena y revisa la secuencia completa.':reading.selectionCount===1?'Respuesta seleccionada, pendiente de revisión.':'Elige una opción y revisa tu decisión.';
     // Hide only the successfully mounted presentation source; its hidden/text/ARIA stay engine-owned.
     if(mirror.isConnected)native.classList.add('rs15-native');
     lastSignature=signature;renderCount++;
    }catch(error){release();console.warn('Respira Sano: presentación C015 no disponible para '+config.key+'.',error);}
    finally{observe();}
   }
   function schedule(){if(destroyed||scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;render();});}
   function onChange(event){if(config.order||event.target.matches('input[type="radio"]'))schedule();}
   function onClick(event){if(event.target.closest(config.order?'[data-use-move]':config.review)||event.target.matches('input[type="radio"]'))schedule();}
   root.addEventListener('change',onChange,{signal});root.addEventListener('click',onClick,{signal});
   if(config.order)for(const selector of ['#use-check-order','#use-reset-order'])doc.querySelector(selector)?.addEventListener('click',schedule,{signal});
   render();
   return{refresh:schedule,snapshot(){return{key:config.key,state,nativeId:native?.id||null,renderCount,mirrorCount:root.querySelectorAll('[data-rs15-owner="'+config.key+'"]').length+(config.order&&mirror?.isConnected?1:0)};},destroy(){destroyed=true;observer.disconnect();release();}};
  }
  for(const config of configs){const target=controller(config);if(target)controllers.push(target);}
  if(doc.body.dataset.page==='hospital')doc.addEventListener('rs-case-context',()=>controllers.forEach(c=>c.refresh()),{signal});
  active={snapshot(){return controllers.map(c=>c.snapshot());},refresh(){controllers.forEach(c=>c.refresh());},destroy(){abort.abort();controllers.forEach(c=>c.destroy());active=null;}};
  return active;
 }
 window.RespiraFeedback15={mount};mount();
})();
