/* Layout-only adapter for M1.3 and M1.4. Existing nodes and controllers are retained. */
"use strict";
(()=>{
 if(window.RespiraLayout15)return;
 let instance=null;
 function mount(){
  if(instance)return instance;
  const configs=[{id:'m1-intercambio',group:'.rsa8-alveolar-parts',stage:'.rsdm-stage'},{id:'formas',group:'.rsg-steps',stage:'.rsg-stage'}],regions=new Map(),moves=[],moved=new WeakSet();let destroyed=false,queued=false;
  function moveBefore(scope,config){const group=scope.querySelector(config.group),stage=scope.querySelector(config.stage);if(!group||!stage||!stage.parentNode||group.contains(stage))return;
   if(group.parentNode===stage.parentNode&&group.nextElementSibling===stage)return;
   if(!moved.has(group)){moves.push({node:group,parent:group.parentNode,next:group.nextSibling,target:stage.parentNode,stage});moved.add(group);}
   stage.parentNode.insertBefore(group,stage);
  }
  function schedule(){if(queued||destroyed)return;queued=true;queueMicrotask(()=>{queued=false;if(!destroyed)refresh();});}
  function structural(node){return node.nodeType===1&&configs.some(config=>[config.group,config.stage].some(selector=>node.matches?.(selector)||node.querySelector?.(selector)));}
  function observe(scope){if(regions.has(scope))return;const previous=scope.getAttribute('data-rs15-layout'),observer=new MutationObserver(records=>{if(records.some(record=>record.type==='childList'&&[...record.addedNodes,...record.removedNodes].some(structural)))schedule();});regions.set(scope,{previous,observer});scope.setAttribute('data-rs15-layout','active');observer.observe(scope,{childList:true,subtree:true});}
  function refresh(){if(destroyed)return;for(const config of configs){const scope=document.getElementById(config.id);if(!scope)continue;observe(scope);moveBefore(scope,config);}}
  document.addEventListener('m1viewswitch',schedule);document.addEventListener('DOMContentLoaded',schedule);
  const api={refresh,cleanup(){if(destroyed)return;destroyed=true;document.removeEventListener('m1viewswitch',schedule);document.removeEventListener('DOMContentLoaded',schedule);for(const {observer}of regions.values())observer.disconnect();
    for(const item of [...moves].reverse()){const {node,parent,next,target,stage}=item;if(!node.isConnected||!parent?.isConnected||node.parentNode!==target||node.nextElementSibling!==stage)continue;parent.insertBefore(node,next?.parentNode===parent?next:null);}
    for(const [scope,{previous}]of regions){if(scope.getAttribute('data-rs15-layout')!=='active')continue;if(previous===null)scope.removeAttribute('data-rs15-layout');else scope.setAttribute('data-rs15-layout',previous);}regions.clear();if(instance===api)instance=null;
   }};instance=api;refresh();return api;
 }
 window.RespiraLayout15=Object.freeze({mount,refresh(){instance?.refresh();},cleanup(){instance?.cleanup();}});
 mount();
})();
