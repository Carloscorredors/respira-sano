(function(){'use strict';
 const D=window.RespiraMedia14Data;if(!D)return;const audio=[],m15=document.getElementById('m1-reconoce');let mask=null,use=null,fds=null,maintenance=null,cleaning=null;
 if(document.body.dataset.page==='hospital')for(const [mode,key,mission]of [['m3','exposure',3],['m4','controls',4]]){
  const graphic=document.querySelector('.rs12-hospital[data-rs12-mode="'+mode+'"]');if(graphic){const host=document.createElement('div');graphic.after(host);const api=window.RespiraAudio13.mount(host,D[key]);if(api)audio.push({api,mission});}
 }
 if(document.body.dataset.page==='respiradores'){
  mask=window.RespiraMaskFunction12?.mount();use=window.RespiraUseScenes12?.mount(document);
  for(const [mission,key]of [[5,'selection'],[6,'care']]){const region=document.querySelector('[data-mission-region="'+mission+'"]');if(region){const target=mission===5?document.getElementById('respirator-lab'):document.getElementById('inspection-buttons')?.closest('.world-inspection');const host=document.createElement('div');if(target)target.before(host);else region.append(host);host.dataset.rs14AudioMission=String(mission);if(mission===5)region.append(host);const api=window.RespiraAudio13.mount(host,D[key]);if(api)audio.push({api,mission,region});}}
 }
 if(m15){
  const content=m15.querySelector('.m1-content'),base=content?.querySelector('.rs12-m15');
  if(content&&window.RespiraFDS13){const host=document.createElement('div');host.className='rs14-fds-host';content.append(host);fds=window.RespiraFDS13.mount(host,window.RespiraFDS13Data);}
  if(base&&window.RespiraMaintenance14)maintenance=window.RespiraMaintenance14.mount(base,window.RespiraMaintenance14Data);
  function updateCleaning(){
   cleaning?.destroy();cleaning=null;
   if(base?.dataset.case==='servicios-generales'){const prior=base.querySelector('.rs12-case-audio');if(prior){const host=document.createElement('div');prior.before(host);cleaning=window.RespiraMedia12.mount(host,D.cleaning);prior.remove();cleaning.setVisible(!m15.hidden&&!m15.inert&&!document.hidden);}}
  }
  if(base){const observer=new MutationObserver(updateCleaning);observer.observe(base,{attributes:true,attributeFilter:['data-case']});window.addEventListener('pagehide',()=>observer.disconnect(),{once:true});updateCleaning();}
 }
 function visible(){const mission=Number(document.documentElement.dataset.rsMission);for(const item of audio){const regionVisible=!item.region||(!item.region.hidden&&!item.region.inert&&item.region.getClientRects().length>0);const show=mission===item.mission&&!document.hidden&&regionVisible;item.api.root.parentElement.hidden=mission!==item.mission;item.api.setVisible(show);}use?.setVisible(mission===6&&!document.hidden);maintenance?.setVisible(!!m15&&!m15.hidden&&!m15.inert&&!document.hidden);cleaning?.setVisible(!!m15&&!m15.hidden&&!m15.inert&&!document.hidden);}
 document.addEventListener('rsmissioncontext',visible);document.addEventListener('m1viewswitch',visible);document.addEventListener('visibilitychange',visible);window.addEventListener('pagehide',()=>{audio.forEach(x=>x.api.setVisible(false));use?.setVisible(false);maintenance?.setVisible(false);cleaning?.setVisible(false);});visible();
})();
