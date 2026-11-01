/* Optional alternative inside the existing maintenance area. No new area or assessment gate. */
"use strict";
(()=>{
 const instances=new WeakMap();
 function mount(rootM15,variantData){
  const base=rootM15?.matches?.('.rs12-m15')?rootM15:rootM15?.querySelector?.('.rs12-m15'),content=base?.closest('.m1-content');
  if(!base||!content||base.parentElement!==content)throw new TypeError('Se requiere el caso base dentro de .m1-content.');
  if(instances.has(base))return instances.get(base);
  if(typeof window.RespiraCases12?.mount!=='function')throw new TypeError('RespiraCases12 debe estar listo antes de la variante.');
  const data=JSON.parse(JSON.stringify(variantData)),caseData=data?.cases?.[0],areaId=data?.baseAreaId||'mantenimiento-general';
  if(data?.cases?.length!==1||caseData?.id!=='mantenimiento-volatil'||areaId!=='mantenimiento-general')throw new TypeError('Se requiere una alternativa del área mantenimiento general.');
  const picker=base.querySelector('.rs12-case-picker'),area=picker?.querySelector('select'),article=base.querySelector('.rs12-case-open'),library=base.querySelector('.rs12-case-browser');
  if(!picker||!area||!article||!library)throw new TypeError('Falta el selector o la escena del caso base.');
  const doc=base.ownerDocument,variantHost=doc.createElement('section');variantHost.className='rs14-maint-variant';variantHost.hidden=true;variantHost.inert=true;variantHost.setAttribute('aria-label','Alternativa opcional: producto volátil de mantenimiento');
  base.after(variantHost);let variant;
  try{variant=window.RespiraCases12.mount(variantHost,{cases:data.cases,initialId:caseData.id});}catch(error){variantHost.remove();throw error;}
  variant.setVisible(false);
  const toolbar=doc.createElement('div');toolbar.className='rs14-maint-toolbar';toolbar.setAttribute('role','group');toolbar.setAttribute('aria-label','Alternativas de mantenimiento general');
  const label=doc.createElement('span');label.className='rs14-maint-label';label.textContent='En mantenimiento general';toolbar.append(label);
  for(const [mode,text]of [['base','Material fibroso'],['volatile','Producto volátil']]){const button=doc.createElement('button');button.type='button';button.dataset.maintMode=mode;button.textContent=text;button.setAttribute('aria-pressed',String(mode==='base'));toolbar.append(button);}
  picker.after(toolbar);let mode='base',visible=true,destroyed=false,saved=[],queued=false;
  const isMaintenance=()=>String(base.dataset.case||area.value)===areaId;
  const pauseBase=()=>{for(const media of base.querySelectorAll('audio,video'))media.pause();};
  function restoreBase(restoreHidden=true){for(const item of saved){if(base.contains(item.node)){if(restoreHidden)item.node.hidden=item.hidden;item.node.inert=item.inert;}}saved=[];}
  function render(){toolbar.hidden=!visible||!isMaintenance();toolbar.inert=toolbar.hidden;toolbar.querySelectorAll('[data-maint-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.maintMode===mode)));const show=visible&&mode==='volatile'&&isMaintenance();variantHost.hidden=!show;variantHost.inert=!show;variant.setVisible(show);}
  function setMode(value,{restoreHidden=true}={}){if(destroyed||!['base','volatile'].includes(value))return false;
   if(value==='volatile'&&!isMaintenance())return false;
   if(value===mode){render();return true;}
   if(value==='volatile'){pauseBase();saved=[article,library].map(node=>({node,hidden:node.hidden,inert:node.inert}));for(const item of saved){item.node.hidden=true;item.node.inert=true;}mode='volatile';}
   else{variant.setVisible(false);restoreBase(restoreHidden);mode='base';}
   render();return true;
  }
  function syncArea(){if(destroyed)return;/* Baseline chooseCase already owns fresh hidden flags. */if(mode==='volatile')setMode('base',{restoreHidden:false});render();}
  function scheduleArea(){if(queued||destroyed)return;queued=true;queueMicrotask(()=>{queued=false;syncArea();});}
  function onToolbar(event){const button=event.target.closest('[data-maint-mode]');if(button&&toolbar.contains(button))setMode(button.dataset.maintMode);}
  function beforeBaseClick(event){/* Restore before baseline browse()/chooseCase() handlers run. */if(mode==='volatile'&&event.target.closest('[data-cases-browse],[data-cases-return],[data-case-open]'))setMode('base');}
  function beforeBaseChange(event){if(event.target===area){if(mode==='volatile')setMode('base');scheduleArea();}}
  toolbar.addEventListener('click',onToolbar);base.addEventListener('click',beforeBaseClick,true);base.addEventListener('change',beforeBaseChange,true);
  const observer=new MutationObserver(scheduleArea);observer.observe(base,{attributes:true,attributeFilter:['data-case']});
  const api={root:variantHost,toolbar,setVisible(value){if(destroyed)return;visible=!!value;if(!visible)pauseBase();render();},cleanup(){if(destroyed)return;if(mode==='volatile')setMode('base');destroyed=true;observer.disconnect();toolbar.removeEventListener('click',onToolbar);base.removeEventListener('click',beforeBaseClick,true);base.removeEventListener('change',beforeBaseChange,true);variant.setVisible(false);variant.destroy();variantHost.remove();toolbar.remove();instances.delete(base);},snapshot(){return{mode,visible,area:base.dataset.case||area.value,variant:variant.snapshot?.()||null};}};
  instances.set(base,api);render();return api;
 }
 window.RespiraMaintenance14=Object.freeze({mount});
})();
