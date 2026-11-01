"use strict";

(() => {

 const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];

 const key = 'respira-sano-adaptaciones-v1';

 let record = {notes:{},answers:{},cases:{}};

 try { const raw=JSON.parse((window.RespiraSession||sessionStorage).getItem(key)); if(raw && typeof raw==='object' && raw.notes && raw.answers && raw.cases) record=raw; } catch {}

 const save=()=>{try{(window.RespiraSession||sessionStorage).setItem(key,JSON.stringify(record));}catch{}};

 if(document.body.dataset.page==='recorrido')window.RespiraMissionRecord={get:()=>JSON.parse(JSON.stringify(record.mission1Expedition||null)),set:value=>{record.mission1Expedition=JSON.parse(JSON.stringify(value));save();}};
 const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

 const button=(label,attr)=>`<button class="secondary" ${attr} aria-pressed="false">${label}</button>`;

 $$('[data-note]').forEach(el=>{el.value=record.notes[el.dataset.note]||'';el.addEventListener('input',()=>{record.notes[el.dataset.note]=el.value;save();});});

 $$('[data-print]').forEach(el=>el.addEventListener('click',()=>window.print()));

 $$('[data-export]').forEach(el=>el.addEventListener('click',()=>{

   const lines=['RESPIRA SANO · Cuaderno personal','Casos simulados · No es una evaluación de exposición','Fecha de descarga: '+new Date().toLocaleDateString('es-CO'),''];

   Object.entries(record.notes).forEach(([id,note])=>lines.push(id.toUpperCase(),String(note)||'(sin notas)',''));

   Object.entries(record.cases).forEach(([id,c])=>{lines.push('CASO: '+id,'Pistas exploradas: '+(c.seen||[]).map(n=>n+1).join(', '),'Medidas exploradas: '+(c.controls||[]).join(', '),'Por verificar: '+(c.note||'(sin notas)'),'');if(c.plan)lines.push('MI MEDIDA PRIORITARIA: '+(c.plan.label||c.plan.priority||'(pendiente)'),'MI MOTIVO: '+(c.plan.reason||'(pendiente)'),'LO QUE DEBO VERIFICAR: '+(c.plan.verification||'(pendiente)'),'REVISIÓN EDUCATIVA: '+(c.plan.feedback||'Propuesta por revisar'),'');});

   Object.entries(record.answers).forEach(([id,a])=>lines.push('DECISIÓN: '+id,'Respuesta: '+a.label,'Retroalimentación: '+a.feedback,''));

   if(lines.length===4)lines.push('Aún no registraste notas ni decisiones. Puedes volver a las experiencias y completar tu cuaderno.');

   const url=URL.createObjectURL(new Blob(['\uFEFF'+lines.join('\r\n')],{type:'text/plain;charset=utf-8'}));

   const link=document.createElement('a');link.href=url;link.download='Respira-Sano-mis-notas.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);

   $$('.export-status').forEach(el=>el.textContent='Se preparó la descarga del cuaderno. Guarda el archivo para conservarlo.');

 }));

 record.caseAnswers=record.caseAnswers||{};
 const quizzes={
 'controls-verification':{correct:1,yes:'Relacionaste la función del control con la necesidad de verificarla. El dibujo no mide concentración ni demuestra eficacia.',no:'Distingue actuar junto a la fuente de renovar el aire del ambiente. La intención visual necesita comprobación en el puesto.'},

   air:{correct:1,yes:'El agente importa. Las partículas se depositan de forma distinta según su tamaño y otras propiedades. Los gases y vapores también difieren en solubilidad, reactividad y absorción. No existe una trayectoria universal hacia la sangre.',no:'Revisa esa idea. Un contaminante puede ser invisible. Sus propiedades y las condiciones de exposición determinan dónde interactúa y qué efectos puede producir; no todos llegan igual a los alvéolos o a la sangre.'},

   exposure:{correct:2,yes:'La inspección orienta la investigación. Para caracterizar exposición se necesita una estrategia que considere agentes, tareas, duración, controles y mediciones pertinentes. Observar la extracción no demuestra su desempeño.',no:'Aún falta evidencia. Ni el olor ni el dibujo miden una concentración en aire. La inspección permite plantear preguntas y priorizar una evaluación técnica.'},

   unknown:{correct:1,yes:'Reconociste una condición que detiene la selección. Un purificador no aporta oxígeno. La intervención requiere la evaluación y los procedimientos autorizados para esa atmósfera.',no:'No es adecuado probar un equipo entrando al lugar. Una atmósfera desconocida requiere evaluación autorizada; el N95 y los cartuchos purificadores no aportan oxígeno.'},

   fit:{correct:2,yes:'Son actividades distintas. La prueba de ajuste comprueba el modelo y talla sobre el usuario mediante un protocolo; la verificación del sello se realiza al colocarlo siguiendo las instrucciones. La capacitación web no sustituye ninguna de las dos.',no:'La prueba de ajuste y la verificación del sello se complementan. Una prueba aprobada no elimina la revisión del sello en cada colocación.'}

 };

 const contextual=id=>id==='exposure'||id==='controls-verification';
 const answerFor=id=>contextual(id)?record.caseAnswers[record.activeCase]?.[id]:record.answers[id];
 function storeAnswer(id,a){record.answers[id]=a;if(contextual(id)){const cid=record.activeCase||'endoscopia';a.caseId=cid;(record.caseAnswers[cid]||(record.caseAnswers[cid]={}))[id]=a;}save();}
 function restoreQuiz(id){const a=answerFor(id),out=$('#feedback-'+id);$$(`input[name="${id}"]`).forEach(input=>input.checked=!!a&&Number(input.value)===a.value);if(out){out.hidden=!(a?.reviewed&&a.criteriaVersion===2);out.textContent=a?.feedback||'';}}
 $$('[data-check]').forEach(el=>{const id=el.dataset.check;el.addEventListener('click',()=>{const selected=$(`input[name="${id}"]:checked`),out=$('#feedback-'+id),q=quizzes[id];if(!out||!q)return;out.hidden=false;if(!selected){out.textContent='Selecciona una respuesta para revisar tu decisión.';out.classList.add('review');return;}const correct=Number(selected.value)===q.correct;out.classList.toggle('review',!correct);out.textContent=(correct?'Decisión fundamentada. ':'Vuelve a explorar. ')+(correct?q.yes:q.no);storeAnswer(id,{value:Number(selected.value),label:selected.parentElement.textContent.trim(),feedback:out.textContent,reviewed:true,criteriaVersion:2,reviewedAt:Date.now()});});$$(`input[name="${id}"]`).forEach(input=>input.addEventListener('change',()=>{storeAnswer(id,{value:Number(input.value),label:input.parentElement.textContent.trim(),reviewed:false});$('#feedback-'+id).hidden=true;}));restoreQuiz(id);});
 document.addEventListener('rs-case-context',()=>{restoreQuiz('exposure');restoreQuiz('controls-verification');});
 if(document.body.dataset.page==='recorrido'){

   const agents=[

    ['Gas','Formaldehído liberado desde una solución de formol.','Puede irritar ojos y vías respiratorias; es sensibilizante y carcinógeno. Su presencia y exposición se investigan con información del producto, proceso y evaluación. No se muestra como una nube visible.'],

    ['Vapor','Evaporación de un disolvente, como xileno en una técnica que lo use.','Se origina desde una sustancia líquida o sólida. Los efectos varían según el compuesto y la exposición. La concentración del líquido no expresa cuánto vapor hay en el aire.'],

    ['Polvo','Material suspendido al lijar o perforar durante mantenimiento.','Son partículas sólidas: una forma de aerosol. Importan el material, su tamaño y la tarea. No todo polvo llega al mismo lugar ni tiene el mismo efecto.'],

    ['Niebla','Gotas suspendidas al atomizar una solución de limpieza.','Es un aerosol líquido. El producto puede añadir peligros por sus ingredientes; un amonio cuaternario poco volátil no se convierte por ello en un gas al pulverizarlo.'],

    ['Humo','Partículas finas generadas por procesos térmicos, por ejemplo soldadura.','El humo es una forma de aerosol sólido. En el humo quirúrgico puede haber además gases y vapores: describir una mezcla requiere identificar el proceso.'],

    ['Aerosol','Término que agrupa partículas sólidas o líquidas suspendidas en un gas.','Polvos, humos y nieblas se incluyen en este concepto. No son categorías siempre excluyentes. Un aerosol puede contener agentes químicos o biológicos, según su origen.']

   ];

   $('#agent-buttons').innerHTML=agents.map((a,i)=>button(a[0],`data-agent="${i}"`)).join('');const showAgent=i=>{$$('[data-agent]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.agent)===i));$('#agent-detail').innerHTML=`<h3>${agents[i][0]}</h3><p><strong>Ejemplo de tarea:</strong> ${agents[i][1]}</p><p>${agents[i][2]}</p>`;};$$('[data-agent]').forEach(b=>b.addEventListener('click',()=>showAgent(Number(b.dataset.agent))));showAgent(0);

 }

 if(document.body.dataset.page==='hospital'){

   const cases=[

    {id:'patologia',name:'Patología',story:'Camila recibe un recipiente con fijador de muestras. Antes de abrirlo, se pregunta qué podría liberarse al aire y qué datos necesita para investigar la exposición. La tarea incluye abrir, manipular y cerrar; el recipiente no siempre permanece destapado.',clues:[['Producto','El fijador del caso contiene formaldehído. La FDS exacta y su composición deben verificarse. El porcentaje de formol no debe confundirse con formaldehído puro.'],['Tarea','Abrir recipientes y manejar tejidos o residuos puede liberar formaldehído. Registra quién abre, cómo y con qué frecuencia; sigue la muestra desde el servicio de origen.'],['Ventilación','Se dibuja un punto de captación. Aún no se dispone de evidencia de su diseño, funcionamiento o mantenimiento. Que exista no demuestra que capture la emisión.'],['Tiempo y concentración','Se desconoce la exposición en aire y la duración representativa de las aperturas. Pide registros de tareas y una estrategia de evaluación; no conviertas el porcentaje del líquido en ppm ambientales.'],['Residuos','Examina cierres y rutas de residuos del fijador. Una tapa con fuga puede mantener una fuente fuera de la tarea principal. El caso no autoriza intervenir un derrame.']],source:'https://www.osha.gov/etools/hospitals/laboratory/formaldehyde'},

    {id:'endoscopia',name:'Endoscopia',story:'Mateo termina un ciclo de reprocesamiento y se prepara para cambiar un suministro. Aunque el ciclo haya permanecido cerrado, todavía debe revisar conexiones, aperturas y manejo de residuos. Antes de continuar, se pregunta: ¿en qué momentos de esta tarea podría liberarse un agente y qué información necesito para evaluar la exposición?',clues:[['Producto','Confirma el desinfectante instalado: puede ser una formulación con peracético y peróxido u otro producto autorizado. El caso no confirma marcas ni concentraciones reales.'],['Tarea','Observa cambio de recipiente, conexiones, descarga y manejo de solución usada. Un ciclo automático no elimina por sí mismo las oportunidades de emisión en esas etapas.'],['Ventilación','Comprueba extracción, cerramientos y requisitos del equipo. La instalación debe ser compatible con el proceso validado y las instrucciones del fabricante.'],['Tiempo y concentración','Faltan composición exacta, frecuencia de cambios, aperturas y datos de exposición en aire. Una sensación de olor no permite asignar concentración ni seguridad.'],['Residuos','Revisa recipientes, conexiones y procedimiento de disposición. Nunca propongas neutralizar o mezclar productos sin un procedimiento autorizado.']],source:'https://www.osha.gov/etools/hospitals/hospital-wide-hazards/glutaraldehyde'},

    {id:'limpieza',name:'Limpieza',story:'Diana prepara un carro con un desinfectante y un limpiador ácido. Alguien propone atomizar todo para terminar antes. El equipo debe identificar qué puede pasar al aire y qué cambios requieren validación.',clues:[['Producto','Confirma composición y FDS. El carro simulado incluye hipoclorito y un limpiador ácido, que deben mantenerse separados. No se propone ninguna prueba de mezcla.'],['Tarea','La atomización genera gotas o nieblas. Según sus ingredientes, el producto también puede emitir vapores. Revisa si el método está autorizado para la superficie y la finalidad clínica.'],['Ventilación','Evalúa el lugar y las condiciones de aplicación. Una ventana dibujada no demuestra renovación adecuada ni captura en fuente. Considera a otras personas presentes.'],['Tiempo y concentración','Faltan dilución autorizada, cantidad, duración, frecuencia y caracterización de exposición. La concentración del producto no equivale a concentración en aire.'],['Residuos','No reúnas sobrantes incompatibles. Mantén recipientes identificados y cerrados según el procedimiento, sin trasvasar a envases de bebidas.']],source:'https://www.cdc.gov/infection-control/hcp/disinfection-sterilization/chemical-disinfectants.html'}

   ];

   const controls=[["eliminacion", "Evitar o sustituir la fuente", "Revisar si puede evitarse la tarea emisora o cambiarse el producto/proceso. La alternativa exige evaluación de peligros, eficacia clínica y compatibilidad."], ["encerramiento", "Cerrar o contener", "Evitar aperturas innecesarias y usar sistemas cerrados cuando el proceso lo permita. Comprobar cierres y conexiones."], ["extraccion", "Captar en la fuente", "Diseñar y verificar extracción adecuada al agente y la tarea. La ventilación general cumple una función distinta y no garantiza captación."], ["ventilacion", "Ventilar el ambiente", "Evaluar la renovación y distribución del aire del lugar. No equivale a captar la emisión junto a la fuente; requiere diseño y verificación."], ["procedimiento", "Prevenir fugas y organizar la tarea", "Definir manejo, prevención de fugas, capacitación y respuesta institucional. No usar rotación como sustituto automático del control de la fuente."], ["proteccion", "Complementar con protección respiratoria", "Barrera complementaria cuando la evaluación la requiere. Selección, aptitud, ajuste, uso y mantenimiento se gestionan dentro del programa."]];

   let current=cases[0];const state=()=>record.cases[current.id]||(record.cases[current.id]={seen:[],controls:[],note:''});

   $('#case-buttons').innerHTML=cases.map((c,i)=>button(c.name,`data-case="${i}"`)).join('');

   function controlsView(){const c=state();$$('[data-control]').forEach(b=>b.setAttribute('aria-pressed',c.controls.includes(b.dataset.control)));$('#lid').setAttribute('opacity',c.controls.includes('encerramiento')?'1':'.22');$('#hood').setAttribute('opacity',c.controls.includes('extraccion')?'1':'.28');$('#capture-flow').setAttribute('visibility',c.controls.includes('extraccion')?'visible':'hidden');$('#control-feedback').innerHTML=c.controls.length?controls.filter(row=>c.controls.includes(row[0])).map(row=>`<p><strong>${row[1]}.</strong> ${row[2]}</p>`).join(''):'Empieza por revisar si puedes eliminar o sustituir la fuente. Después combina controles de ingeniería, procedimientos y protección cuando corresponda.';document.dispatchEvent(new CustomEvent('respiracasechange',{detail:{caseId:current.id,name:current.name,controls:[...c.controls],plan:c.plan||{},controlDefinitions:controls}}));save();}

   function clue(i){const c=state();if(!c.seen.includes(i))c.seen.push(i);$('#clue-detail').innerHTML=`<span class="detail-label">Pista ${i+1} / ${current.name}</span><h3>${current.clues[i][0]}</h3><p>${current.clues[i][1]}</p>`;$('#clue-count').textContent=`${c.seen.length} / 5 pistas`;$('[data-clue-button="'+i+'"]').setAttribute('aria-pressed',true);$('#evidence-status').textContent=c.seen.length===5?'Exploraste las cinco pistas. Explica qué sabes y qué falta verificar.':`${c.seen.length} pistas exploradas; continúa investigando.`;save();}

   const modelLinks=document.createElement('div');modelLinks.id='case-model-links';modelLinks.className='case-model-links';$('#case-sources').after(modelLinks);

   function showModelLinks(){

    const link=(agent,label)=>`<a class="button secondary" href="recorrido.html?agente=${agent}&caso=${current.id}#agentes">${label} ↗</a>`;

    let content=current.id==='patologia'?`<p>Observa el ejemplo de formaldehído y vuelve para completar tu investigación.</p><div class="actions">${link('formaldehyde','Explorar formaldehído en 3D')}</div>`:current.id==='endoscopia'?`<p>Compara ejemplos de desinfectantes. Confirma primero la FDS y el producto instalado; el caso no establece cuál se utiliza.</p><div class="actions">${link('oxidants','Ejemplo peracético / peróxido')}${link('glutaraldehyde','Ejemplo glutaraldehído')}</div>`:'<p>Relaciona la atomización con las gotas o nieblas. No atribuyas al producto de limpieza los efectos de otro agente.</p><div class="actions"><a class="button secondary" href="recorrido.html?caso=limpieza#formas">Explorar formas en el aire ↗</a></div>';

    modelLinks.innerHTML='<span class="detail-label">Conecta con el cuerpo</span>'+content;

   }

   function showCase(i){current=cases[i];record.activeCase=current.id;$$('[data-case]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.case)===i));$('#case-story').innerHTML=`<strong>${current.name} · Caso simulado.</strong> ${current.story}`;$('#scene-label').textContent='PUESTO SIMULADO / '+current.name.toUpperCase();$('#clue-count').textContent=`${state().seen.length} / 5 pistas`;$('#case-observation').value=state().note;$('#clue-detail').innerHTML='<h3>Investiga antes de concluir.</h3><p>Abre las cinco pistas y registra los datos que faltan.</p>';$('#evidence-status').textContent='';$('#clue-buttons').innerHTML=current.clues.map((c,i)=>button(`${i+1} · ${c[0]}`,`data-clue-button="${i}"`)).join('');$$('[data-clue-button]').forEach(b=>{b.setAttribute('aria-pressed',state().seen.includes(Number(b.dataset.clueButton)));b.addEventListener('click',()=>clue(Number(b.dataset.clueButton)));});$('#case-sources').innerHTML=`<a href="${current.source}" target="_blank" rel="noopener">Fuente técnica del caso ↗</a>`;showModelLinks();controlsView();document.dispatchEvent(new Event('rs-case-context'));}

   $('#control-buttons').innerHTML=controls.map(c=>button(c[1],`data-control="${c[0]}"`)).join('');$$('[data-control]').forEach(b=>b.addEventListener('click',()=>{const c=state(),id=b.dataset.control;c.controls=c.controls.includes(id)?c.controls.filter(x=>x!==id):[...c.controls,id];controlsView();}));$$('[data-case]').forEach(b=>b.addEventListener('click',()=>showCase(Number(b.dataset.case))));$$('[data-clue]').forEach(b=>{b.addEventListener('click',()=>clue(Number(b.dataset.clue)));b.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();clue(Number(b.dataset.clue));}});});$('#case-observation').addEventListener('input',()=>{state().note=$('#case-observation').value;save();});

   document.addEventListener('missionrequest',()=>controlsView());

   document.addEventListener('missioncasepick',event=>{const i=cases.findIndex(c=>c.id===event.detail.caseId);if(i>=0)showCase(i);});

   document.addEventListener('missionupdate',event=>{if(event.detail.caseId!==current.id)return;const c=state();c.plan=event.detail.plan;const id=event.detail.activate;if(controls.some(row=>row[0]===id)){if(!c.controls.includes(id))c.controls.push(id);controlsView();}else save();});

   const fromCaseHash=()=>{const id=location.hash.startsWith('#caso=')?location.hash.slice(6):'',index=cases.findIndex(c=>c.id===id);if(index>=0)showCase(index);};window.addEventListener('hashchange',fromCaseHash);showCase(Math.max(0,cases.findIndex(c=>c.id===(record.activeCase||'endoscopia'))));fromCaseHash();

 }

 if(document.body.dataset.page==='respiradores'){

   let leak=false;

   const compare=()=>{

    const medium=$('#medium').value,challenge=$('#challenge').value,out=$('#comparison');let text='',review=false;

    if(challenge==='unknown'){text='Detener la selección. La atmósfera requiere evaluación autorizada. Ninguno de los medios purificadores de esta comparación aporta oxígeno ni permite improvisar una entrada.';review=true;}

    else if((challenge==='vapor'||challenge==='mixed')&&medium==='particle'){text='Función insuficiente: un filtro para partículas no controla gases ni vapores. No se corrige esta limitación apretando más las bandas.';review=true;}

    else if((challenge==='dust'||challenge==='mixed')&&medium==='gas'){text='Falta la función de filtración de partículas. Un cartucho para gas/vapor no debe asumirse filtro de partículas sin una combinación aprobada para ese fin.';review=true;}

    else if(medium==='particle'){text='Coincide la función de filtración de partículas. Aún faltan tipo de aerosol, exposición, equipo y condiciones de uso; N95 no es una elección universal ni una garantía de protección personal.';}

    else{text='Hay una función química posible, sujeta al agente específico y a la aprobación del conjunto. No todos los cartuchos sirven para todos los gases o vapores. Faltan datos para seleccionar el equipo y definir recambio.';}

    if(leak)text+=' Además, una fuga en la pieza facial puede permitir que parte del aire evite el medio. La animación no cuantifica esa fuga.';

    out.classList.toggle('review',review||leak);out.textContent=text;

   };

   $('#medium').addEventListener('change',compare);$('#challenge').addEventListener('change',compare);$('#leak').addEventListener('click',()=>{leak=!leak;$('#leak').setAttribute('aria-pressed',leak);$('#leak').textContent=leak?'Ocultar fuga facial':'Mostrar fuga facial';$('#leak-path').setAttribute('visibility',leak?'visible':'hidden');$('#leak-label').setAttribute('visibility',leak?'visible':'hidden');compare();});compare();

   const items=[['Pieza facial','¿Ves deformación, grietas o suciedad en la zona de sello?','Retira de uso el equipo defectuoso y gestiona la revisión o sustitución de piezas autorizadas. Una banda más tensa no repara una pieza deformada.'],['Bandas','¿Hay roturas, pérdida de elasticidad o anclajes sueltos?','Revisa las bandas y sus sujeciones. No improvises reparaciones ni accesorios que cambien el conjunto aprobado. Comprueba ausencia de interferencias en el sello, incluido vello facial.'],['Válvulas','¿La válvula está ausente, deformada o con residuos?','Una válvula requiere inspección según el diseño del fabricante. Una pieza faltante impide asumir funcionamiento adecuado. El dibujo representa una válvula genérica.'],['Filtros y cartuchos','¿Corresponden al agente, están bien conectados y dentro de las condiciones de uso?','Verifica identificación, compatibilidad y programa de recambio. La pieza facial reutilizable se limpia según sus instrucciones; no asumas que filtros y cartuchos se pueden lavar. Almacena el equipo protegido de contaminación y deformación.']];

   $('#inspection-buttons').innerHTML=items.map((r,i)=>button(r[0],`data-inspect="${i}"`)).join('');const inspect=i=>{$$('[data-inspect]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.inspect)===i));$('#inspection-detail').innerHTML=`<h3>${items[i][1]}</h3><p>${items[i][2]}</p>`;};$$('[data-inspect]').forEach(b=>b.addEventListener('click',()=>inspect(Number(b.dataset.inspect))));inspect(0);

 }

})();

