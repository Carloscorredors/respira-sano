(()=>{'use strict';const audio=document.getElementById('rs-audio01-player');if(!audio)return;const screen=audio.closest('[data-m1-screen]');if(!screen)return;
 const pause=()=>audio.pause();
 const sync=()=>{if(screen.hidden||screen.inert||document.hidden)pause();};
 document.addEventListener('m1viewswitch',sync);
 document.addEventListener('visibilitychange',sync);
 window.addEventListener('pagehide',pause);
 audio.addEventListener('play',sync);
 sync();
})();
