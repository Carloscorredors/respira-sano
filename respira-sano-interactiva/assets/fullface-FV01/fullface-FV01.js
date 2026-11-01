/* FV01: solo el reproductor nuevo; mismo ciclo de visibilidad y exclusividad que Audio13. */
(()=>{'use strict';
 const video=document.querySelector('[data-fullface-fv01-player]');
 if(!video||video.dataset.fv01Ready)return;
 video.dataset.fv01Ready='true';
 const region=video.closest('[data-mission-region="6"]');
 const nativeTrack=video.querySelector('track[data-fv01-captions]');
 const fallbackCues=[{"start":0.0,"end":3.29,"text":"Este es un respirador reutilizable de cara\ncompleta o full face."},{"start":3.86,"end":7.765,"text":"Su función es ayudar a reducir la inhalación\nde contaminantes cuando se usa con"},{"start":7.8,"end":9.43,"text":"filtros o cartuchos adecuados."},{"start":10.1,"end":15.29,"text":"Sus partes principales son el visor, el\nsello facial, el arnés, las conexiones,"},{"start":15.68,"end":18.59,"text":"la copa nasal y las válvulas de inhalación y\nexhalación."},{"start":19.26,"end":21.73,"text":"Antes de usarlo, revisa sus piezas."},{"start":22.66,"end":25.51,"text":"Deben estar completas, limpias y en buen\nestado."},{"start":26.26,"end":29.37,"text":"Confirma su compatibilidad y sigue el manual\ndel fabricante."},{"start":30.06,"end":31.99,"text":"Los filtros retienen partículas."},{"start":32.82,"end":36.99,"text":"Los cartuchos para gases y vapores actúan\nsobre contaminantes específicos."},{"start":37.74,"end":39.89,"text":"Algunos conjuntos combinan ambas funciones."},{"start":40.76,"end":44.565,"text":"Al inhalar, el aire del ambiente atraviesa\nlos filtros o cartuchos instalados"},{"start":44.6,"end":46.35,"text":"antes de llegar a la nariz y la boca."},{"start":47.22,"end":50.91,"text":"Al exhalar, el aire sale al exterior a\ntravés de la válvula de exhalación."},{"start":51.78,"end":55.865,"text":"En esta configuración con filtros o\ncartuchos, el respirador no suministra"},{"start":55.9,"end":56.9,"text":"oxígeno."},{"start":57.02,"end":61.025,"text":"No lo uses en atmósferas con deficiencia de\noxígeno ni inmediatamente peligrosas"},{"start":61.06,"end":62.27,"text":"para la vida o la salud."},{"start":63.2,"end":67.165,"text":"Selecciona con personal competente el modelo\ny la talla del respirador, teniendo"},{"start":67.2,"end":69.47,"text":"en cuenta tu rostro y las condiciones de la\ntarea."},{"start":70.3,"end":72.85,"text":"Coloca el respirador y ajusta el arnés según\nel manual."},{"start":73.78,"end":77.305,"text":"El sello debe contactar con la piel, sin\ncabello u otros elementos que"},{"start":77.34,"end":78.34,"text":"interfieran."},{"start":78.76,"end":82.445,"text":"Comprueba el sello cada vez que te coloques\nel respirador, siguiendo el método del"},{"start":82.48,"end":83.48,"text":"fabricante."},{"start":83.84,"end":86.47,"text":"Esta comprobación no reemplaza la prueba de\najuste."},{"start":87.16,"end":90.89,"text":"La prueba de ajuste verifica si un modelo y\nuna talla se adaptan a tu rostro."},{"start":91.56,"end":94.89,"text":"Debe realizarla personal capacitado\nsiguiendo un protocolo."},{"start":95.4,"end":99.465,"text":"Los cambios en el rostro, el peso o el\nequipo pueden exigir una nueva prueba de"},{"start":99.5,"end":100.5,"text":"ajuste."},{"start":100.78,"end":103.49000000000001,"text":"Consulta al responsable de protección\nrespiratoria."},{"start":104.12,"end":107.21000000000001,"text":"Si hay fugas, no inicies la tarea y solicita\napoyo."},{"start":108.08,"end":112.465,"text":"Después del uso, limpia, revisa y guarda el\nrespirador según las instrucciones del"},{"start":112.5,"end":113.5,"text":"fabricante."},{"start":113.97999999999999,"end":118.00999999999999,"text":"Recuerda, la protección respiratoria depende\nde identificar el peligro,"},{"start":118.14,"end":121.09,"text":"seleccionar el equipo adecuado y utilizarlo\ncorrectamente."},{"start":121.56,"end":126.105,"text":"Si tienes duda sobre su uso, consulta al\nresponsable de protección respiratoria"},{"start":126.14,"end":127.45,"text":"antes de iniciar la actividad."}];
 let localTrack=null;
 const visible=()=>!document.hidden&&document.documentElement.dataset.rsMission==='6'&&(!region||(!region.hidden&&!region.inert&&region.getClientRects().length>0));
 const pause=()=>video.pause();
 const sync=()=>{if(!visible())pause();};
 function localCaptions(){
  if(!nativeTrack||localTrack||!fallbackCues.length||!video.addTextTrack||typeof VTTCue==='undefined')return;
  if(nativeTrack?.track)nativeTrack.track.mode='disabled';
  localTrack=video.addTextTrack('subtitles','Español · opcional','es');
  for(const c of fallbackCues)localTrack.addCue(new VTTCue(c.start,c.end,c.text));
  // El video ya contiene subtítulos corregidos. La pista nativa se activa solo a petición.
  localTrack.mode='disabled';
 }
 video.addEventListener('play',()=>{
  if(!visible()){pause();return;}
  for(const other of document.querySelectorAll('audio,video'))if(other!==video&&!other.paused)other.pause();
 });
 document.addEventListener('play',event=>{if(event.target!==video&&event.target.matches?.('audio,video'))pause();},true);
 document.addEventListener('rsmissioncontext',sync);
 document.addEventListener('visibilitychange',sync);
 window.addEventListener('pagehide',pause);
 nativeTrack?.addEventListener('error',localCaptions,{once:true});
 if(location.protocol==='file:')localCaptions();
 sync();
})();
