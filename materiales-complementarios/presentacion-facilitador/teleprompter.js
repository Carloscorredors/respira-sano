"use strict";
const G=window.GUION,$=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const clock=s=>{const sign=s<0?"−":"";s=Math.floor(Math.abs(s));return sign+String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");};
const cueDurations=G.cues.map(c=>Number(c.minutes??5));
let plannedMinutes=0;
const cueStarts=cueDurations.map(m=>{const start=plannedMinutes;plannedMinutes+=m;return start;});
const cueEnds=cueStarts.map((start,i)=>start+cueDurations[i]);
let current=0,running=false,sessionSeconds=0,cueSeconds=0,lastTick=performance.now(),scrolling=false,lastFrame=0,scrollPosition=0;
const notes={};
function sourceLinks(ids){return ids.map(id=>{const s=G.sources[id];return '<a href="'+esc(s.url)+'" target="_blank" rel="noopener">'+esc(s.name)+'</a>';}).join("");}
function download(name,text){const u=URL.createObjectURL(new Blob([text],{type:"text/plain;charset=utf-8"}));const a=document.createElement("a");a.href=u;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1500);}
function stopScroll(message=""){scrolling=false;$("#scroll-toggle").textContent="Iniciar desplazamiento";$("#scroll-toggle").setAttribute("aria-pressed","false");if(message)$("#status").textContent=message;}
function render(){stopScroll();const c=G.cues[current],s=G.sections.find(s=>s.id===c.section);
 $("#cue-meta").textContent=c.id+" · "+s.name+" · minutos "+cueStarts[current]+"–"+cueEnds[current]+" · "+(current+1)+"/"+G.cues.length;
 $("#cue-title").textContent=c.title;
 $("#say").innerHTML='<span class="script-label">HABLAR · ADAPTA LAS PALABRAS A TU ESTILO</span>'+c.say.map(p=>"<p>"+esc(p)+"</p>").join("")+'<p class="transition">'+esc(c.transition)+"</p>";
 const a=$("#experience-link");a.hidden=!c.link;if(c.link)a.href="../respira-sano-interactiva/"+c.link;else a.removeAttribute("href");
 $("#experience-target").textContent=c.target;
 const block=(title,text,style="")=>'<section class="direction '+style+'"><strong>'+title+'</strong><p>'+esc(text)+'</p></section>';
 $("#directions").innerHTML=block("MOSTRAR / ABRIR",c.target)+block("INTERACTUAR",c.action)+block("PREGUNTAR",c.ask)+block("ESCUCHAR Y ORIENTAR",c.answer)+block("CERRAR Y CONECTAR",c.transition)+block("SI FALLA LA HERRAMIENTA",c.fallback)+(c.warning?block("CUIDADO TÉCNICO",c.warning,"warning"):"")+'<div class="sources">'+sourceLinks(c.refs)+'</div><p class="small">Contenido: '+esc(c.cover.join(", ")||"Apertura narrativa")+'</p>';
 $("#personal-notes").value=notes[c.id]||"";$("#reading").scrollTop=0;
 $("#previous").disabled=current===0;$("#next").disabled=current===G.cues.length-1;
 document.querySelectorAll("[data-cue]").forEach(b=>{if(Number(b.dataset.cue)===current)b.setAttribute("aria-current","step");else b.removeAttribute("aria-current");});
 $("#status").textContent="Segmento preparado. El cronómetro y el desplazamiento se controlan por separado.";
 updateClock();
}
function navigate(index){if(index<0||index>=G.cues.length)return;notes[G.cues[current].id]=$("#personal-notes").value;current=index;cueSeconds=0;render();}
function updateClock(){$("#session-time").textContent=clock(sessionSeconds);$("#cue-time").textContent=clock(cueDurations[current]*60-cueSeconds);$("#cue-time").classList.toggle("late",cueSeconds>cueDurations[current]*60);}
$("#objective").textContent=G.objective;
$("#cue-list").innerHTML=G.sections.map(s=>'<p class="section-name">'+esc(s.name)+" · "+s.minutes+' min</p>'+G.cues.map((c,i)=>c.section===s.id?'<button data-cue="'+i+'"><span>'+String(cueStarts[i]).padStart(2,"0")+"–"+cueEnds[i]+' min · '+c.id+'</span>'+esc(c.title)+'</button>':"").join("")).join("");
document.querySelectorAll("[data-cue]").forEach(b=>b.addEventListener("click",()=>navigate(Number(b.dataset.cue))));
$("#readiness").innerHTML=G.readiness.map(r=>'<div class="readiness-item"><b>'+esc(r.item)+'</b><em>'+esc(r.status)+'</em><p>'+esc(r.note)+'</p></div>').join("");
$("#previous").addEventListener("click",()=>navigate(current-1));$("#next").addEventListener("click",()=>navigate(current+1));
$("#personal-notes").addEventListener("input",()=>notes[G.cues[current].id]=$("#personal-notes").value);
$("#font-size").addEventListener("input",e=>{document.documentElement.style.setProperty("--font",e.target.value+"px");$("#font-label").textContent=e.target.value+" px";});
$("#scroll-speed").addEventListener("input",e=>$("#speed-label").textContent=e.target.value+" px/s");
function toggleScroll(){if(scrolling){stopScroll("Desplazamiento en pausa.");return;}const r=$("#reading");if(r.scrollTop+r.clientHeight>=r.scrollHeight-3)r.scrollTop=0;scrollPosition=r.scrollTop;scrolling=true;lastFrame=performance.now();$("#scroll-toggle").textContent="Pausar desplazamiento";$("#scroll-toggle").setAttribute("aria-pressed","true");$("#status").textContent="Desplazamiento activo; espacio para pausar.";}
$("#scroll-toggle").addEventListener("click",toggleScroll);
function frame(now){if(scrolling){const r=$("#reading");scrollPosition+=Math.min((now-lastFrame)/1000,.1)*Number($("#scroll-speed").value);r.scrollTop=scrollPosition;if(r.scrollTop+r.clientHeight>=r.scrollHeight-2)stopScroll("Fin del texto. Conduce la participación antes de avanzar.");}lastFrame=now;requestAnimationFrame(frame);}requestAnimationFrame(frame);
$("#reading").addEventListener("wheel",()=>{if(scrolling)stopScroll("Desplazamiento en pausa para permitir lectura manual.");},{passive:true});
$("#timer-toggle").addEventListener("click",()=>{running=!running;lastTick=performance.now();$("#timer-toggle").textContent=running?"Pausar cronómetro":"Continuar cronómetro";});
$("#timer-reset").addEventListener("click",()=>{running=false;sessionSeconds=0;cueSeconds=0;$("#timer-toggle").textContent="Iniciar cronómetro";updateClock();$("#status").textContent="Tiempos reiniciados; el segmento seleccionado se conserva.";});
setInterval(()=>{const now=performance.now();if(running){const dt=(now-lastTick)/1000;sessionSeconds+=dt;cueSeconds+=dt;updateClock();}lastTick=now;},200);
function toggleNotes(){const hidden=document.body.classList.toggle("notes-hidden");$("#notes-toggle").textContent=hidden?"Mostrar indicaciones":"Ocultar indicaciones";$("#notes-toggle").setAttribute("aria-pressed",String(!hidden));}
$("#notes-toggle").addEventListener("click",toggleNotes);
$("#mirror").addEventListener("click",()=>{const active=$(".reading-wrap").classList.toggle("mirrored");$("#mirror").setAttribute("aria-pressed",String(active));});
$("#full-screen").addEventListener("click",async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{$("#status").textContent="El navegador no permitió pantalla completa. Puedes ampliar la ventana manualmente.";}});
document.addEventListener("keydown",e=>{if(e.ctrlKey||e.metaKey||e.altKey||/^(INPUT|TEXTAREA|SELECT|BUTTON|A|SUMMARY)$/.test(e.target.tagName))return;if(e.code==="Space"){e.preventDefault();toggleScroll();}else if(e.key==="ArrowRight"){e.preventDefault();navigate(current+1);}else if(e.key==="ArrowLeft"){e.preventDefault();navigate(current-1);}else if(e.key.toLowerCase()==="n")toggleNotes();});
function scriptText(){notes[G.cues[current].id]=$("#personal-notes").value;return G.title+" — GUION DEL FACILITADOR\n"+G.version+"\nDuración: 120 minutos, incluyendo participación.\n\nOBJETIVO\n"+G.objective+"\n\n"+G.cues.map((c,i)=>c.id+" · "+cueStarts[i]+"–"+cueEnds[i]+" min · "+c.title+"\nPARA DECIR\n"+c.say.join("\n\n")+"\n\nHACER\n"+c.action+"\nPREGUNTAR\n"+c.ask+"\nRESPUESTA ORIENTADORA\n"+c.answer+"\nTRANSICIÓN\n"+c.transition+"\nCONTINGENCIA\n"+c.fallback+(c.warning?"\nCUIDADO\n"+c.warning:"")+(notes[c.id]?"\nMIS AJUSTES\n"+notes[c.id]:"")+"\nFUENTES\n"+c.refs.map(id=>G.sources[id].name+": "+G.sources[id].url).join("\n")).join("\n\n====================\n\n");}
$("#export-script").addEventListener("click",()=>download("Respira-Sano-guion-facilitador.txt",scriptText()));
function printManual(){notes[G.cues[current].id]=$("#personal-notes").value;const cover=[...new Set(G.cues.flatMap(c=>c.cover))].sort();
 $("#print-manual").innerHTML='<h1>Respira Sano</h1><p>Guion del facilitador · '+esc(G.version)+' · 120 minutos con actividades</p><h2>Objetivo</h2><p>'+esc(G.objective)+'</p><h2>Antes de comenzar</h2><p>Compartir la experiencia de participantes y conservar el teleprompter en una ventana privada. Ensayar equipo, enlaces, cuenta de trivia y pizarra. Los tiempos orientan conducción y participación; no son 120 minutos de lectura.</p><table><thead><tr><th>Bloque</th><th>Minutos</th></tr></thead><tbody>'+G.sections.map(s=>'<tr><td>'+esc(s.name)+'</td><td>'+s.minutes+'</td></tr>').join("")+'</tbody></table><h2>Requisitos y preparación</h2>'+G.readiness.map(r=>'<p><strong>'+esc(r.item)+' · '+esc(r.status)+':</strong> '+esc(r.note)+'</p>').join("")+'<p>Cobertura del temario: '+esc(cover.join(", "))+'</p>'+G.cues.map((c,i)=>'<section class="print-cue"><p>'+esc(c.id)+' · minutos '+cueStarts[i]+"–"+cueEnds[i]+'</p><h2>'+esc(c.title)+'</h2>'+c.say.map(p=>'<p>'+esc(p)+'</p>').join("")+'<div class="print-action"><p><strong>Hacer:</strong> '+esc(c.action)+'</p><p><strong>Preguntar:</strong> '+esc(c.ask)+'</p><p><strong>Orientar:</strong> '+esc(c.answer)+'</p><p><strong>Transición:</strong> '+esc(c.transition)+'</p><p><strong>Contingencia:</strong> '+esc(c.fallback)+'</p>'+(c.warning?'<p><strong>Cuidado:</strong> '+esc(c.warning)+'</p>':"")+(notes[c.id]?'<p><strong>Mis ajustes:</strong> '+esc(notes[c.id])+'</p>':"")+'</div><p>Base: '+c.refs.map(id=>esc(G.sources[id].name)).join("; ")+'</p></section>').join("")+'<section class="print-cue"><h2>Fuentes completas</h2>'+Object.values(G.sources).map(s=>'<p><strong>'+esc(s.name)+'</strong><br>'+esc(s.url)+'</p>').join("")+'</section>';
}
$("#print-guide").addEventListener("click",()=>{stopScroll();printManual();window.print();});
window.addEventListener("beforeprint",printManual);
render();
