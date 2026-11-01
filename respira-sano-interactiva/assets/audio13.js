(function(global){'use strict';
 function mount(host,data,{before=null}={}){
  if(!host||!data?.src)return null;
  const root=document.createElement('section'),abort=new AbortController();let visible=true;
  root.className='rs13-audio';root.setAttribute('aria-label',data.title);
  const heading=document.createElement('h3'),length=document.createElement('span'),player=document.createElement('audio'),details=document.createElement('details'),summary=document.createElement('summary'),text=document.createElement('p');
  heading.textContent=data.title;length.textContent=data.durationLabel;player.controls=true;player.preload='metadata';player.src=data.src;player.setAttribute('aria-label',data.title);summary.textContent='Leer transcripción';text.textContent=data.transcript;details.append(summary,text);root.append(heading,length,player,details);
  if(before)before.before(root);else host.append(root);
  const pause=()=>player.pause();
  player.addEventListener('play',()=>{if(!visible||document.hidden){pause();return;}for(const other of document.querySelectorAll('audio,video'))if(other!==player&&!other.paused)other.pause();},{signal:abort.signal});
  document.addEventListener('play',event=>{if(event.target!==player&&event.target.matches?.('audio,video'))pause();},{capture:true,signal:abort.signal});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();},{signal:abort.signal});
  window.addEventListener('pagehide',pause,{signal:abort.signal});
  return{root,setVisible(value){visible=!!value;if(!visible)pause();},destroy(){pause();abort.abort();root.remove();}};
 }
 global.RespiraAudio13={mount};
})(window);
