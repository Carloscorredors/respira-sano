(function(global){'use strict';
 function mount(host,data){
  const root=document.createElement('section');root.className='rs12-media';root.setAttribute('aria-label',data.title);let visible=true;const cleanup=[];
  root.innerHTML='<div class="rs12-media-heading"><h3></h3><span></span></div><div class="rs12-media-modes" role="group" aria-label="Formato de la explicación"><button type="button" data-media-kind="audio" aria-pressed="true">Escuchar</button><button type="button" data-media-kind="video" aria-pressed="false">Ver animación</button></div><div data-media-slot="audio"><audio controls preload="metadata"></audio></div><div data-media-slot="video" hidden><video controls playsinline preload="none"></video></div><details><summary>Leer transcripción</summary><div data-media-transcript></div></details>';
  root.querySelector('h3').textContent=data.title;root.querySelector('.rs12-media-heading span').textContent=data.durationLabel;const audio=root.querySelector('audio'),video=root.querySelector('video');audio.src=data.mp3;video.src=data.mp4;if(data.poster)video.poster=data.poster;for(const para of data.transcript.split(/\n\s*\n/)){const p=document.createElement('p');p.textContent=para;root.querySelector('[data-media-transcript]').append(p);}
  host.prepend(root);const pause=()=>{audio.pause();video.pause();},on=(el,type,fn,opts)=>{el.addEventListener(type,fn,opts);cleanup.push(()=>el.removeEventListener(type,fn,opts));};
  on(root,'click',e=>{const b=e.target.closest('[data-media-kind]');if(!b)return;pause();root.querySelectorAll('[data-media-slot]').forEach(s=>s.hidden=s.dataset.mediaSlot!==b.dataset.mediaKind);root.querySelectorAll('[data-media-kind]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));});
  on(root,'play',e=>{if(!e.target.matches('audio,video'))return;if(!visible||document.hidden){e.target.pause();return;}for(const other of document.querySelectorAll('audio,video'))if(other!==e.target&&!other.paused)other.pause();},true);
  return{root,setVisible(value){visible=!!value;if(!visible)pause();},destroy(){pause();cleanup.forEach(fn=>fn());root.remove();}};
 }
 global.RespiraMedia12={mount};
})(window);
