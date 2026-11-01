"use strict";
(()=>{
 const root=document.querySelector('#actividad-controles.mission-activity');if(!root)return;
 const $=s=>root.querySelector(s),priority=$('#mission-priority'),reason=$('#mission-reason'),verification=$('#mission-verification'),feedback=$('#mission-proposal-feedback');
 const people={endoscopia:'Mateo',patologia:'Camila',limpieza:'Diana'};let currentId='endoscopia',latest=null;
 function emit(plan,activate){document.dispatchEvent(new CustomEvent('missionupdate',{detail:{caseId:currentId,plan,activate}}));}
 function read(){return {priority:priority.value,label:priority.selectedOptions[0]?.textContent||'',reason:reason.value,verification:verification.value,feedback:'',review:'por revisar'};}
 function save(activate){feedback.hidden=true;for(const b of root.querySelectorAll('[data-control]'))b.dataset.priority=String(b.dataset.control===priority.value);emit(read(),activate);}
 function visibility(id,on){const node=$('#'+id);if(node)node.setAttribute('visibility',on?'visible':'hidden');}
 function render(event){
  const data=event.detail;latest=data;currentId=data.caseId;const actor=people[currentId]||'la persona del caso',plan=data.plan||{},has=id=>data.controls.includes(id);
  $('#mission-case').value=currentId;$('#mission-case-title').textContent='La tarea de '+actor+' · '+data.name;$('#mission-instruction').textContent='Elige una medida prioritaria para la tarea de '+actor+' y explica cómo comprobarías si funciona.';
  $('#mission-case-context').textContent=currentId==='endoscopia'?'Conservas las pistas y las notas de CSI del aire.':'Conservas las pistas y las notas de este expediente. El video introductorio corresponde al caso de Mateo en Endoscopia.';
  const sceneLabel=$('#mission-scene-label');if(sceneLabel)sceneLabel.textContent='TAREA SIMULADA / '+data.name.toUpperCase();
  $('#mission-lid').setAttribute('opacity',has('encerramiento')?'1':'.22');$('#mission-hood').setAttribute('opacity',has('extraccion')?'1':'.28');visibility('mission-capture-flow',has('extraccion'));visibility('mission-room-ventilation',has('ventilacion'));visibility('mission-source-alternative',has('eliminacion'));visibility('mission-procedure',has('procedimiento'));visibility('mission-ppe',has('proteccion'));
  let caption=has('extraccion')&&has('ventilacion')?'Captación en la fuente y ventilación del ambiente: funciones distintas por verificar.':has('extraccion')?'Captar junto a la fuente: diseño y desempeño por verificar.':has('ventilacion')?'Ventilar el ambiente: no equivale a captar junto a la fuente.':has('encerramiento')?'Cerrar o contener: comprobar cierres y conexiones.':has('eliminacion')?'Alternativa sobre la fuente: evaluar viabilidad, peligros y compatibilidad.':has('procedimiento')?'Prevenir fugas y organizar la tarea: comprobar cómo se aplica.':has('proteccion')?'EPR complementario: la fuente sigue presente.':'Explora una medida para observar dónde actúa.';
  $('#mission-scene-status').textContent=caption;
  priority.value=plan.priority||'';reason.value=plan.reason||'';verification.value=plan.verification||'';
  for(const b of root.querySelectorAll('[data-control]'))b.dataset.priority=String(b.dataset.control===priority.value);
  const selected=data.controlDefinitions.filter(c=>has(c[0])),last=data.controlDefinitions.find(c=>c[0]===data.controls[data.controls.length-1]);
  $('#control-feedback').textContent=last?last[2]:'Explora dónde actúa cada medida. La prioridad de tu propuesta se elige aparte.';
  const conditions=$('#mission-control-conditions');conditions.replaceChildren();for(const c of selected){const p=document.createElement('p');p.textContent=c[1]+': '+c[2];conditions.append(p);}if(!selected.length)conditions.textContent='Aún no has activado medidas para comparar.';
  feedback.hidden=!plan.feedback;feedback.textContent=plan.feedback||'';feedback.dataset.review=plan.review||'por revisar';
  const story=document.querySelector('#historia-mateo-controles');if(story){const strong=document.createElement('strong');strong.textContent='La misión de '+actor+' · Caso simulado.';story.replaceChildren(strong,document.createTextNode(' '+actor+' vuelve con el expediente de la misma tarea. Debe proponer qué cambiar primero y qué evidencia necesitaría para comprobar el resultado.'));}
 }
 document.addEventListener('respiracasechange',render);
 priority.addEventListener('change',()=>save(priority.value));reason.addEventListener('input',()=>save());verification.addEventListener('input',()=>save());
 $('#mission-case').addEventListener('change',event=>document.dispatchEvent(new CustomEvent('missioncasepick',{detail:{caseId:event.target.value}})));
 $('#mission-review').addEventListener('click',()=>{
  const plan=read();let message='',state='pendiente';
  if(!plan.priority)message='Elige una medida prioritaria o indica que necesitas más datos antes de decidir.';
  else if(plan.priority==='datos'){message='Reconocer un dato que falta también ayuda a prevenir. '+(plan.verification.trim()?'Conserva lo que debes obtener antes de decidir; la propuesta sigue pendiente.':'Indica qué debes obtener antes de decidir.');state='datos-pendientes';}
  else if(!plan.reason.trim()||!plan.verification.trim())message='La medida está elegida. Completa el motivo y lo que necesitas comprobar antes de revisar la propuesta.';
  else if(plan.priority==='proteccion'){message='Revisa qué puedes hacer sobre la fuente y el ambiente. El respirador puede complementar las medidas que determine la evaluación. '+(latest.controls.some(id=>id!=='proteccion')?'Has explorado otras medidas: contrasta cuál debería ser prioritaria.':'Usarlo como única medida no resuelve la investigación de la fuente.');state='revisar-prioridad';}
  else{message=plan.priority==='eliminacion'?'Tu propuesta actúa sobre la fuente. Antes de aplicarla, confirma que sea viable, compatible y adecuada para el proceso.':plan.priority==='procedimiento'?'Relaciona la prevención de fugas y la organización con las condiciones de la tarea y los controles de la fuente.':'El esquema muestra la idea del control. Su funcionamiento real necesita diseño y verificación en la tarea.';message+=' Conservaste un motivo y una comprobación propuesta; su pertinencia y desempeño todavía deben contrastarse.';state='pendiente-verificacion';}
  plan.feedback=message;plan.review=state;plan.criteriaVersion=2;plan.reviewedAt=Date.now();emit(plan);feedback.textContent=message;feedback.dataset.review=state;feedback.hidden=false;feedback.classList.toggle('review',state!=='pendiente-verificacion');
 });
 document.dispatchEvent(new CustomEvent('missionrequest'));
})();
