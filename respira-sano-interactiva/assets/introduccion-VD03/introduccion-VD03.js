"use strict";
(()=>{
 const video=document.getElementById('pilot-video'),out=document.getElementById('m1-story-cue'),button=document.getElementById('m1-story-caption-toggle');
 if(!video||!out||!button||!video.addTextTrack||typeof VTTCue==='undefined')return;
 const cues=[{"start":0.555,"end":4.655,"text":"Antes de limpiar un equipo, Camila revisa la información del producto."},{"start":5.595,"end":7.995,"text":"Aquí aparece una advertencia por inhalación."},{"start":8.875,"end":11.515,"text":"Necesito entender qué significa para esta tarea."},{"start":12.395,"end":15.715,"text":"Si una sustancia de este producto llega al aire y la respiramos,"},{"start":15.995,"end":17.675,"text":"¿por dónde entra y qué puede producir?"},{"start":18.515,"end":21.45,"text":"Al inhalar, el aire entra por la nariz o la boca"},{"start":21.475,"end":24.315,"text":"y recorre las vías respiratorias hasta los pulmones."},{"start":25.215,"end":30.11,"text":"Si transporta sustancias químicas, su comportamiento dependerá de sus propiedades"},{"start":30.135,"end":31.975,"text":"y de las condiciones de exposición."},{"start":32.735,"end":36.015,"text":"Algunas sustancias pueden irritar las vías respiratorias."},{"start":36.935,"end":40.335,"text":"Otras pueden alcanzar zonas más profundas o absorberse."},{"start":41.115,"end":45.17,"text":"Los posibles efectos dependen del agente, de la cantidad inhalada"},{"start":45.195,"end":46.795,"text":"y del tiempo de exposición."},{"start":47.555,"end":52.475,"text":"Entonces, empecemos por comprender cómo respiramos y qué puede acompañar al aire."},{"start":53.375,"end":57.83,"text":"En esta actividad reconocerás las principales estructuras del sistema respiratorio"},{"start":57.855,"end":62.27,"text":"y relacionarás las sustancias presentes en una tarea con su ingreso por inhalación"},{"start":62.295,"end":64.415,"text":"y sus posibles efectos en la salud."}];
 // Cues incorporados: funcionan también sin peticiones VTT desde file://.
 for(const existing of Array.from(video.textTracks))existing.mode='disabled';
 const track=video.addTextTrack('captions','Español','es');
 for(const cue of cues)track.addCue(new VTTCue(cue.start,cue.end,cue.text));
 let enabled=true,nativeFullscreen=false;
 function fullscreen(){const root=document.fullscreenElement;return nativeFullscreen||root===video||Boolean(root&&root.contains(video));}
 function update(){const active=track.activeCues;out.textContent=!enabled?'Subtítulos desactivados.':active&&active.length?Array.from(active,c=>c.text).join(' '):video.ended?'Fin de la introducción.':video.currentTime===0?'Pulsa Reproducir para comenzar.':'…';}
 function mode(){track.mode=enabled?(fullscreen()?'showing':'hidden'):'disabled';update();}
 button.addEventListener('click',()=>{enabled=!enabled;button.setAttribute('aria-pressed',String(enabled));button.textContent='Subtítulos: '+(enabled?'activados':'desactivados');mode();});
 track.addEventListener('cuechange',update);video.addEventListener('seeked',update);video.addEventListener('ended',update);video.addEventListener('loadedmetadata',mode);
 document.addEventListener('fullscreenchange',mode);
 video.addEventListener('webkitbeginfullscreen',()=>{nativeFullscreen=true;mode();});
 video.addEventListener('webkitendfullscreen',()=>{nativeFullscreen=false;mode();});
 mode();
})();
