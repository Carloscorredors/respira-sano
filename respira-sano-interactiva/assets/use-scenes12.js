(function (global) {
  'use strict';
  let serial = 0;
  const mounted = new WeakMap();
  const ORDER = Object.freeze(['prepare', 'don', 'seal', 'decide']);
  const CARE = Object.freeze(['face', 'filters', 'storage', 'change', 'abnormal']);
  const inspection = [
    { label: 'Pieza facial', region: 'Cuerpo y zona de sello', target: '1', art: 'body', note: 'El borde que contacta con el rostro se revisa en el equipo real. La imagen no comprueba el sello.', check: '¿Ves deformación, grietas o suciedad en la zona de sello?', stop: 'Si el equipo presenta una condición defectuosa, retíralo de uso y gestiona la revisión o sustitución de piezas autorizadas. Una banda más tensa no repara una pieza deformada.', signal: 'Ejemplo: grieta o deformación del borde.' },
    { label: 'Bandas', region: 'Anclajes visibles', target: '3', art: 'anchors', note: 'El modelo permite observar anclajes visibles. Las bandas y el arnés completos se revisan en el equipo real.', check: '¿Hay roturas, pérdida de elasticidad o anclajes sueltos?', stop: 'Si una banda o sujeción presenta daño, detén el uso y gestiona la solución indicada para el equipo. No improvises reparaciones ni accesorios que cambien el conjunto aprobado.', signal: 'Ejemplo: banda rota o anclaje suelto.' },
    { label: 'Válvulas', region: 'Detalle funcional local', target: 'valves', art: 'valves', note: 'Corte conceptual de un diseño con válvulas separadas. No muestra el interior confirmado de la máscara 3D.', check: '¿La válvula está ausente, deformada o con residuos?', stop: 'Si falta una pieza o la membrana está alterada, no asumas funcionamiento adecuado. Detén el uso y revisa la válvula y su asiento conforme al manual del equipo real.', signal: 'Ejemplo: membrana deformada que no asienta.' },
    { label: 'Filtros y cartuchos', region: 'Conexiones y medios', target: '2', art: 'connections', note: 'Forma y color no identifican el medio aprobado ni su protección. Comprueba referencia, compatibilidad y condiciones de uso.', check: '¿Corresponden al agente, están bien conectados y dentro de las condiciones de uso?', stop: 'Si la identificación, compatibilidad o conexión no están resueltas, detén el uso y verifica el conjunto y sus condiciones conforme al manual y al programa de recambio.', signal: 'Ejemplo: identificación o conexión por resolver.' }
  ];
  const orderTitles = { prepare: 'Preparar e inspeccionar', don: 'Colocar y ajustar según el manual', seal: 'Verificar el sello en cada colocación', decide: 'Decidir antes de entrar' };
  const careInfo = {
    face: { label: 'Pieza facial', caption: 'Componentes e instrucciones', note: 'La limpieza del cuerpo reutilizable no autoriza tratar todos los componentes de la misma forma.' },
    filters: { label: 'Filtros y cartuchos', caption: 'Consulta las instrucciones del medio', note: 'No asumir que un filtro o cartucho es lavable ni improvisar una recuperación.' },
    storage: { label: 'Almacenamiento', caption: 'Protegido y sin deformación', note: 'Conserva el equipo según las condiciones del fabricante y el procedimiento institucional.' },
    change: { label: 'Recambio', caption: 'Un programa sustentado', note: 'No existe un plazo universal ni se usa el olor como calendario de recambio.' },
    abnormal: { label: 'Anomalía durante el uso', caption: 'Salida y gestión de la anomalía', note: 'Sigue el procedimiento y no regreses con la falla sin resolver.' }
  };
  function escape(text) { return String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function svg(scene, uid, label, phase, mode) {
    const p = uid + '-' + scene;
    const stopExample=mode==='stop';
    const paper = (x, y, scale) => `<g transform="translate(${x} ${y}) scale(${scale || 1})"><path d="M0 0H74L93 19V116H0Z" fill="#fff" stroke="#7f9cae" stroke-width="2"/><path d="M74 0V20H93" fill="#deebf0" stroke="#7f9cae" stroke-width="2"/><path d="M14 38H77M14 52H72M14 66H78M14 80H62" stroke="#93b2c0" stroke-width="4"/><path d="m13 96 6 6 11-13" fill="none" stroke="#006b8f" stroke-width="3"/></g>`;
    const cartridge = (x,y,rot,scale) => `<g transform="translate(${x} ${y}) rotate(${rot || 0}) scale(${scale || 1})"><rect x="0" y="0" width="64" height="73" rx="17" fill="url(#${p}-metal)" stroke="#446c82" stroke-width="2"/><rect x="8" y="10" width="48" height="52" rx="9" fill="#d7e4e9" stroke="#668b9d"/><path d="M15 21H49M15 31H49M15 41H49M15 51H49" stroke="#5c8092" stroke-width="3"/><ellipse cx="32" cy="-2" rx="16" ry="5" fill="#688b9e"/></g>`;
    const mask = (x,y,scale, highlight) => `<g transform="translate(${x} ${y}) scale(${scale || 1})"><g class="rs12-m6-part ${highlight==='anchors'?'rs12-m6-highlight':''}" fill="none" stroke="#7396a9" stroke-width="10"><path d="m-64-58-24-31-29 14 31 46m150-29 24-31 29 14-31 46M-44-81l8-25h72l8 25"/></g><path class="rs12-m6-part ${highlight==='body'?'rs12-m6-highlight':''}" d="M0-92C-49-93-78-66-80-23L-74 46Q-65 100 0 123Q65 100 74 46L80-23C78-66 49-93 0-92Z" fill="url(#${p}-body)" stroke="#648a9e" stroke-width="3"/><path d="M0-77C-38-78-62-55-64-23L-59 26Q-31 47 0 46Q31 47 59 26L64-23C62-55 38-78 0-77Z" fill="url(#${p}-glass)" stroke="#b6d2df" stroke-width="3"/><path d="M-47-29Q-40-58-8-61M-48-17-45 7" fill="none" stroke="#fff" opacity=".7" stroke-width="5" stroke-linecap="round"/><path d="M-35 47Q0 27 35 47L45 78Q25 103 0 111Q-25 103-45 78Z" fill="#3a6176" stroke="#8bacbb" stroke-width="2"/><g class="rs12-m6-part ${highlight==='filters'?'rs12-m6-highlight':''}">${cartridge(-107,33,-13,.75)}${cartridge(57,20,13,.75)}</g><circle cx="0" cy="72" r="19" fill="#2b4d61" stroke="#9bbbc9" stroke-width="3"/><path d="M-10 64H10M-10 72H10M-8 80H8" stroke="#91afbf" stroke-width="2"/></g>`;
    const head = (x,y,scale) => `<g transform="translate(${x} ${y}) scale(${scale || 1})"><path d="M-34 41Q-37 80-71 87L-101 100V157H101V100L71 87Q37 80 34 41" fill="url(#${p}-skin)" stroke="#ad8b7d" stroke-width="2"/><path d="M-48-39Q-51-87 0-88Q51-87 48-39L45 18Q38 56 0 68Q-38 56-45 18Z" fill="url(#${p}-skin)" stroke="#ad8b7d" stroke-width="2"/><path d="M-48-36Q-57-92-4-99Q54-98 48-36L38-64Q2-46-39-63Z" fill="#53616a"/></g>`;
    const check = (x,y) => `<g transform="translate(${x} ${y})"><circle r="21" fill="#eef7fa" stroke="#527e94" stroke-width="2"/><path d="m-10 0 7 7L12-9" fill="none" stroke="#006b8f" stroke-width="4" stroke-linecap="round"/></g>`;
    let drawing='';
    if(scene==='body') drawing=`<path d="M72 267C26 191 51 85 151 47Q236 20 358 87L333 140Q233 90 178 110Q109 139 143 239Z" fill="url(#${p}-body)" stroke="#5e8499" stroke-width="3"/><path d="M106 251C67 186 89 111 168 82Q238 62 345 113" fill="none" stroke="#a6c4d2" stroke-width="12"/><path d="M146 233Q117 163 182 139Q233 123 315 164L298 202Q230 175 205 183Q179 196 184 218Z" fill="url(#${p}-glass)" stroke="#a7c8d8" stroke-width="2"/>${stopExample?'<path d="m98 156 19 14-17 13 22 12-16 20 18 9" fill="none" stroke="#9a5c20" stroke-width="5" stroke-linecap="round"/><circle cx="108" cy="191" r="46" fill="none" stroke="#a36a28" stroke-width="2" stroke-dasharray="5 5"/>':'<path d="M75 175H41M44 167l-8 8 8 8" stroke="#527e95" stroke-width="2" fill="none"/>'}<text x="235" y="251" text-anchor="middle">Borde de la pieza facial</text>`;
    if(scene==='anchors') drawing=`<rect x="263" y="61" width="95" height="178" rx="20" fill="url(#${p}-metal)" stroke="#5d8297" stroke-width="4"/><rect x="285" y="83" width="48" height="134" rx="9" fill="#f2f8fa" stroke="#87a8ba" stroke-width="3"/><path d="M43 105H286V187H43Z" fill="url(#${p}-body)" stroke="#5f8397" stroke-width="3"/><path d="M48 118H281M48 174H281" stroke="#a5c4d3" stroke-width="3"/>${stopExample?'<path d="m169 104 9 16-10 14 12 17-12 15 10 22h39l-11-17 10-17-12-16 10-16-10-18Z" fill="#edf5f8"/><path d="m167 111 11 13m-10 13 11 13m-11 13 11 13m28-53-10 11m9 16-10 11m11 13-10 11" stroke="#9a5c20" stroke-width="3"/><circle cx="187" cy="147" r="62" fill="none" stroke="#a36a28" stroke-width="2" stroke-dasharray="5 5"/>':'<path d="M322 231V263H363" fill="none" stroke="#63899d" stroke-width="2"/>'}<text x="147" y="253" text-anchor="middle">Banda y sujeción genéricas</text>`;
    if(scene==='connections') drawing=cartridge(118,103,-8,1.7)+`<path d="M277 118h56v82h-56Z" fill="url(#${p}-body)" stroke="#5c8298" stroke-width="3"/><ellipse cx="277" cy="159" rx="15" ry="41" fill="url(#${p}-metal)" stroke="#7199ad" stroke-width="3"/><path d="M241 145H258M241 157H258M241 169H258" stroke="#718f9e" stroke-width="3" ${stopExample?'stroke-dasharray="3 4"':''}/><path d="M57 42H170V88H57Z" fill="#fff" stroke="#87a7b8" stroke-width="2"/><path d="M70 57H155M70 72H137" stroke="#8eaab8" stroke-width="3"/>${stopExample?'<path d="M206 59q0-17 17-17t17 15q0 12-16 18v9m0 10v2" fill="none" stroke="#9a5c20" stroke-width="5" stroke-linecap="round"/><circle cx="252" cy="159" r="33" fill="none" stroke="#a36a28" stroke-width="2" stroke-dasharray="5 5"/>':'<path d="M171 65h26" fill="none" stroke="#63899d" stroke-width="2"/>'}<text x="220" y="277" text-anchor="middle">Referencia y conexión del conjunto</text>`;
    if(scene==='valves') {
      const inhale=phase!=='exhale';
      drawing=`<rect x="21" y="47" width="101" height="69" rx="15" fill="#d4e5ed" stroke="#658a9d" stroke-width="2"/><path d="M39 66H104M39 78H104M39 90H104" stroke="#7b9dad" stroke-width="3"/><rect x="279" y="75" width="125" height="149" rx="32" fill="url(#${p}-glass)" stroke="#547d92" stroke-width="3"/><path d="M122 82H180Q214 82 214 126H308" class="rs12-m6-tube ${inhale?'rs12-m6-flow-active':''}"/><path d="M307 189H213Q179 189 179 249H98" class="rs12-m6-tube ${inhale?'':'rs12-m6-flow-active'}"/><circle cx="236" cy="126" r="17" fill="#fff" stroke="#597f93" stroke-width="2"/><circle cx="236" cy="189" r="17" fill="#fff" stroke="#597f93" stroke-width="2"/><path d="${inhale?'M226 115 246 134':'M236 109V143'}M${inhale?'236 172V206':'226 179 246 198'}" fill="none" stroke="#006b8f" stroke-width="4"/><path d="${inhale?'m154 76 8 6-8 6m120 32 8 6-8 6':'m278 183-8 6 8 6m-153 54-8 6 8 6'}" fill="none" stroke="#006b8f" stroke-width="3"/><text x="71" y="34" text-anchor="middle">Medio seleccionado</text><text x="341" y="143" text-anchor="middle">Interior</text><text x="341" y="163" text-anchor="middle">de la pieza</text><text x="341" y="183" text-anchor="middle">facial</text><text x="154" y="148">Entrada</text><text x="153" y="210">Salida</text><text x="40" y="274">Exterior</text>`;
      if(stopExample) drawing=`<rect x="59" y="74" width="303" height="151" rx="32" fill="url(#${p}-body)" stroke="#547d92" stroke-width="3"/><ellipse cx="210" cy="151" rx="102" ry="57" fill="#e7f2f7" stroke="#86a9ba" stroke-width="5"/><path d="M118 155Q156 151 172 134Q183 112 200 129Q223 165 240 142Q272 105 309 152" fill="none" stroke="#9a5c20" stroke-width="8" stroke-linecap="round"/><path d="M115 169H310" fill="none" stroke="#8aa5b4" stroke-width="3" stroke-dasharray="4 5"/><circle cx="205" cy="144" r="47" fill="none" stroke="#a36a28" stroke-width="2" stroke-dasharray="5 5"/><text x="215" y="264" text-anchor="middle">Membrana y asiento · ejemplo conceptual</text>`;
    }
    if(scene==='prepare') drawing=paper(43,72,1.1)+mask(281,156,.66)+`<path d="M24 266H398" stroke="#a6bdc9" stroke-width="3"/>`+check(366,64);
    if(scene==='don') drawing=head(212,114,.86)+mask(212,130,.59)+paper(44,143,.73)+`<path d="M298 76Q345 107 308 149" fill="none" stroke="#819fab" stroke-width="3" stroke-dasharray="5 6"/>`;
    if(scene==='seal') drawing=head(208,113,.86)+mask(208,130,.59)+`<path d="M208 71C164 70 152 103 156 145Q164 190 208 207Q252 190 260 145C264 103 252 70 208 71Z" fill="none" stroke="#126e91" stroke-width="3" stroke-dasharray="5 6"/>`+paper(321,131,.67)+`<path d="M308 159H272" stroke="#658b9e" stroke-width="2"/>`;
    if(scene==='decide') drawing=`<rect x="282" y="44" width="91" height="211" rx="7" fill="url(#${p}-metal)" stroke="#6c91a4" stroke-width="3"/><path d="M301 61H356V239H301Z" fill="#f4fafb"/><circle cx="344" cy="157" r="4" fill="#698d9f"/><path d="m187 131 16-16h22l16 16v22l-16 16h-22l-16-16Z" fill="#fdf7ed" stroke="#966221" stroke-width="3"/><path d="M214 126V146m0 10v2" stroke="#966221" stroke-width="4" stroke-linecap="round"/><path d="M109 215H191m-12-11 12 11-12 11" fill="none" stroke="#527d94" stroke-width="4"/>`+paper(51,66,.81);
    if(scene==='face') drawing=mask(267,142,.73)+paper(48,88,1.12)+`<path d="M40 258H397" stroke="#b1c7d2" stroke-width="3"/><path d="M165 252h33M215 252h33" stroke="#678a9d" stroke-width="5" stroke-linecap="round"/>`;
    if(scene==='filters') drawing=cartridge(181,105,-9,1.4)+paper(45,83,1.13)+`<path d="M332 82q-24 30-24 43a24 24 0 0 0 48 0q0-13-24-43Z" fill="#d2e7ee" stroke="#7299aa" stroke-width="2"/><path d="M306 154h51" stroke="#688d9e" stroke-width="2"/><text x="332" y="182" text-anchor="middle" font-size="32" font-weight="700">?</text>`;
    if(scene==='storage') drawing=`<path d="M69 161Q63 148 79 136L120 108H326L365 136Q379 149 366 161L337 236H99Z" fill="url(#${p}-metal)" stroke="#6e91a3" stroke-width="3"/><path d="M102 155H336L316 216H120Z" fill="#c6dce6" stroke="#93b3c3" stroke-width="2"/><path d="M80 135V69Q80 45 106 45H327Q352 45 352 70V135" fill="#e8f2f6" stroke="#789cae" stroke-width="5"/><path d="M169 45V33Q169 23 181 23H250Q263 23 263 34V45" fill="none" stroke="#789cae" stroke-width="5"/>`+mask(215,153,.31);
    if(scene==='change') drawing=`<rect x="45" y="53" width="177" height="194" rx="12" fill="#fff" stroke="#7b9daf" stroke-width="3"/><path d="M45 94H222M82 41V68M184 41V68" fill="none" stroke="#638b9f" stroke-width="7" stroke-linecap="round"/><path d="M70 122H195M70 155H195M70 188H195M109 106V224M153 106V224" stroke="#c7dce5" stroke-width="2"/><path d="m81 167 11 11 18-23" fill="none" stroke="#006b8f" stroke-width="4"/>`+cartridge(278,130,-9,1.1)+paper(282,47,.54);
    if(scene==='abnormal') drawing=`<path d="M76 253V61H171V253" fill="none" stroke="#789aab" stroke-width="9"/><path d="m116 107-20-9v119l20-12Z" fill="#cfdee6"/><path d="M240 112q-5-23 18-23t18 23q0 16-18 16t-18-16" fill="url(#${p}-skin)" stroke="#ad8b7d"/><path d="M250 137 226 169l-30 2m63-34 24 36 28 5M256 139l-5 55-28 47m28-47 29 45" fill="none" stroke="#50778d" stroke-width="12" stroke-linecap="round"/><path d="M200 72H122m14-13-14 13 14 13" fill="none" stroke="#006b8f" stroke-width="5"/>`+paper(329,142,.55);
    const warning=stopExample && ['body','anchors','connections','valves'].includes(scene)?'<g transform="translate(374 35)"><path d="m0-20 22 39h-44Z" fill="#fff5e5" stroke="#8a5b20" stroke-width="2"/><path d="M0-9V3m0 7v1" stroke="#8a5b20" stroke-width="3" stroke-linecap="round"/></g>':'';
    return `<svg viewBox="0 0 430 300" role="img" aria-label="${escape(label)}"><defs><linearGradient id="${p}-body" x1="0" y1="0" x2="1" y2=".7"><stop stop-color="#90aab8"/><stop offset=".42" stop-color="#41667d"/><stop offset="1" stop-color="#203f55"/></linearGradient><linearGradient id="${p}-glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#edf9fb"/><stop offset=".5" stop-color="#bedde9"/><stop offset="1" stop-color="#7ba1b4"/></linearGradient><linearGradient id="${p}-metal" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#8caab9"/><stop offset=".45" stop-color="#e8f1f5"/><stop offset="1" stop-color="#809fae"/></linearGradient><linearGradient id="${p}-skin" x1="0" y1="0" x2="1" y2=".1"><stop stop-color="#bb9483"/><stop offset=".4" stop-color="#ecd7c5"/><stop offset="1" stop-color="#a78075"/></linearGradient></defs><rect width="430" height="300" rx="20" fill="#edf5f8"/><ellipse cx="220" cy="266" rx="171" ry="14" fill="#ccdde6" opacity=".6"/>${drawing}${warning}</svg>`;
  }
  function mount(scope, options) {
    const host=scope || document, opts=options || {}, doc=host.ownerDocument || host;
    if(mounted.has(host)) return mounted.get(host);
    const query=s=>host.querySelector(s), model=opts.modelRoot || doc.querySelector('[data-external-model="mask"]'), inspectButtons=query('#inspection-buttons'), order=query('#use-order'), careTabs=query('#care-tabs'), careQuestion=query('#care-question');
    const uid='rs12-m6-'+(++serial), created=[], artNodes=new Set();
    let disposed=false, activeInspection=0, activeCare='', valvePhase='inhale', inspectionMode='review', pendingLink=null;
    const panel=doc.createElement('div');panel.className='rs12-m6 rs12-m6-inspection';panel.dataset.rs12M6='inspection';
    const carePanel=doc.createElement('div');carePanel.className='rs12-m6 rs12-m6-care';carePanel.dataset.rs12M6='care';
    if(inspectButtons){inspectButtons.insertAdjacentElement('afterend',panel);created.push(panel);}
    if(careQuestion){careQuestion.insertAdjacentElement('beforebegin',carePanel);created.push(carePanel);}
    function paintInspection(i) {
      if(disposed || !inspection[i]) return;if(i!==activeInspection)inspectionMode='review';activeInspection=i;const item=inspection[i], stopping=inspectionMode==='stop';panel.dataset.inspect=String(i);panel.dataset.inspectionMode=inspectionMode;
      panel.innerHTML=`<div class="rs12-m6-inspection-switch" role="group" aria-label="Estado de consulta de ${item.label}"><button type="button" data-rs12-m6-inspection-mode="review" aria-pressed="${!stopping}">Qué revisar</button><button type="button" data-rs12-m6-inspection-mode="stop" aria-pressed="${stopping}">Señal para detener uso</button></div><div class="rs12-m6-inspection-art">${svg(item.art,uid+'-inspection',item.region+': '+(stopping?item.signal:item.check),valvePhase,inspectionMode)}</div><div class="rs12-m6-inspection-copy"><span class="rs12-m6-kicker">${stopping?'SEÑAL CONDICIONAL · EJEMPLO':item.target==='valves'?'CORTE FUNCIONAL LOCAL':'DETALLE A REVISAR'}</span><h3>${item.region}</h3><p class="rs12-m6-inspection-question">${stopping?item.signal:item.check}</p><p>${stopping?item.stop:item.note}</p>${item.target==='valves' && !stopping?`<div class="rs12-m6-phases" role="group" aria-label="Fase del corte conceptual"><button type="button" data-rs12-m6-phase="inhale" aria-pressed="${valvePhase==='inhale'}">Inhalación</button><button type="button" data-rs12-m6-phase="exhale" aria-pressed="${valvePhase==='exhale'}">Exhalación</button></div><p class="rs12-m6-valve-state" role="status">${valvePhase==='inhale'?'En este diseño: entrada abierta y salida cerrada.':'En este diseño: entrada cerrada y salida abierta.'}</p>`:''}<button type="button" data-rs12-m6-model>Ver ${item.target==='valves'?'detalle existente':'región en el modelo'}</button><p class="rs12-m6-link-status" role="status"></p></div><p class="rs12-m6-aptitude-limit">Ilustración conceptual: ninguna de estas vistas acredita la aptitud del equipo. Revisa el equipo real y las instrucciones del fabricante.${item.target==='valves'?' El corte no representa el interior confirmado del modelo 3D.':''}</p>`;
    }
    function paintOrder() {
      if(!order || disposed)return;
      order.querySelectorAll('[data-use-step]').forEach(li=>{
        const id=li.dataset.useStep;if(!ORDER.includes(id))return;
        const content=li.querySelector('#use-step-'+id) || li.querySelector('[tabindex="-1"]');if(!content || content.querySelector('[data-rs12-m6-order]'))return;
        const art=doc.createElement('div');art.className='rs12-m6 rs12-m6-order-art';art.dataset.rs12M6Order=id;art.innerHTML=svg(id,uid+'-order',orderTitles[id]);content.prepend(art);artNodes.add(art);
      });
      artNodes.forEach(n=>{if(!n.isConnected)artNodes.delete(n);});
    }
    function paintCare() {
      if(!careTabs || disposed)return;
      const selected=careTabs.querySelector('[data-care][aria-pressed="true"]'), id=selected && selected.dataset.care;
      if(!CARE.includes(id) || id===activeCare)return;activeCare=id;const info=careInfo[id];carePanel.dataset.care=id;
      carePanel.innerHTML=`<div class="rs12-m6-care-art">${svg(id,uid+'-care',info.label+': '+info.caption)}</div><div><span class="rs12-m6-kicker">OBSERVA Y DECIDE</span><h4>${info.caption}</h4><p>${info.note}</p><span class="rs12-m6-small">Escena conceptual · consulta el equipo y su manual.</span></div>`;
    }
    function targetFor(item) {
      return item.target==='valves'?model && model.querySelector('[data-mask-valves]'):doc.querySelector('.fullface-inspection [data-mask-step="'+item.target+'"]');
    }
    function available(node) {
      if(!node || !node.isConnected || node.closest('[hidden],[inert]'))return false;
      const view=doc.defaultView;if(view && view.getComputedStyle){for(let n=node;n && n.nodeType===1;n=n.parentElement){const style=view.getComputedStyle(n);if(style.display==='none' || style.visibility==='hidden')return false;}}
      return true;
    }
    function linkStatus(text) {const out=panel.querySelector('.rs12-m6-link-status');if(out)out.textContent=text;}
    function finishPendingLink() {
      if(disposed || !pendingLink)return false;
      const item=inspection[pendingLink.index], target=targetFor(item);
      if(!target || target.disabled){pendingLink=null;linkStatus('Región no disponible. Usa el explorador y las instrucciones del equipo real.');return false;}
      if(!available(target))return false;
      pendingLink=null;
      // Select only after the canonical shared subview is visible.
      if(item.target==='valves') {
        if(target.getAttribute('aria-expanded')!=='true')target.click();
        const detail=doc.querySelector('#fullface-valve-panel');
        if(!available(detail)){linkStatus('No se pudo abrir el detalle. Usa el botón de válvulas del explorador.');return false;}
        detail.scrollIntoView({block:'center'});const heading=detail.querySelector('h4');if(heading)heading.focus({preventScroll:true});
        linkStatus('Abierto el esquema funcional local existente.');
      } else {
        target.click();
        if(target.getAttribute('aria-pressed')!=='true'){linkStatus('No se pudo confirmar la región. Selecciónala en el explorador.');return false;}
        target.focus({preventScroll:true});linkStatus('Región abierta y seleccionada en el explorador existente.');
      }
      return true;
    }
    function linkModel() {
      const item=inspection[activeInspection], target=targetFor(item);
      pendingLink=null;
      if(!target || target.disabled){linkStatus('Región no disponible en esta vista. Continúa con la inspección del equipo real y su manual.');return;}
      pendingLink={index:activeInspection};
      if(available(target)){finishPendingLink();return;}
      const entry=doc.querySelector('a[data-fullface-from-pit][href="#respirator-lab"]');
      if(!entry){pendingLink=null;linkStatus('Abre «Explorar máscara facial completa» para consultar la región.');return;}
      linkStatus('Abriendo el explorador de máscara facial completa…');
      // Use the original anchor so progress-bridge owns route/subview and return.
      entry.click();finishPendingLink();
    }
    function contextChanged(event) {
      if(!pendingLink || disposed)return;
      if(event.detail && event.detail.mission && Number(event.detail.mission)!==6){pendingLink=null;return;}
      finishPendingLink();
    }
    function click(event) {
      if(disposed)return;
      const inspect=event.target.closest('[data-inspect]');if(inspect && inspectButtons && inspectButtons.contains(inspect)){pendingLink=null;paintInspection(Number(inspect.dataset.inspect));return;}
      const mode=event.target.closest('[data-rs12-m6-inspection-mode]');if(mode && panel.contains(mode)){inspectionMode=mode.dataset.rs12M6InspectionMode;paintInspection(activeInspection);panel.querySelector('[data-rs12-m6-inspection-mode="'+inspectionMode+'"]').focus({preventScroll:true});return;}
      const phase=event.target.closest('[data-rs12-m6-phase]');if(phase && panel.contains(phase)){valvePhase=phase.dataset.rs12M6Phase;paintInspection(2);panel.querySelector('[data-rs12-m6-phase="'+valvePhase+'"]').focus({preventScroll:true});return;}
      const link=event.target.closest('[data-rs12-m6-model]');if(link && panel.contains(link))linkModel();
    }
    function modelSelection(event) {
      if(disposed || !inspectButtons)return;
      const region=Number(event.detail && event.detail.index), map={1:0,3:1,2:3};
      if(!(region in map))return;const i=map[region], button=inspectButtons.querySelector('[data-inspect="'+i+'"]');
      if(button && button.getAttribute('aria-pressed')!=='true')button.click();else paintInspection(i);
    }
    function stopTour() {
      const pause=doc.querySelector('.fullface-inspection [data-mask-pause]');if(pause && !pause.disabled)pause.click();
      const authorPause=doc.querySelector('.fullface-inspection [data-author-pause]');if(authorPause)authorPause.click();
    }
    function visibility(){if(doc.hidden)stopTour();}
    const orderObserver=order?new MutationObserver(paintOrder):null;
    if(orderObserver)orderObserver.observe(order,{childList:true});
    const careObserver=careTabs?new MutationObserver(paintCare):null;
    if(careObserver)careObserver.observe(careTabs,{attributes:true,subtree:true,attributeFilter:['aria-pressed']});
    host.addEventListener('click',click);doc.addEventListener('visibilitychange',visibility);doc.addEventListener('rsmissioncontext',contextChanged);if(model)model.addEventListener('maskpartchange',modelSelection);
    const initiallySelected=inspectButtons && inspectButtons.querySelector('[data-inspect][aria-pressed="true"]');paintInspection(initiallySelected?Number(initiallySelected.dataset.inspect):0);paintOrder();paintCare();
    const api={
      inspectionPanel:panel,
      carePanel,
      refresh(){paintOrder();activeCare='';paintCare();},
      setVisible(value){if(!value)stopTour();},
      getState(){return {inspection:activeInspection,inspectionMode,care:activeCare,order:order?Array.from(order.querySelectorAll('[data-use-step]'),n=>n.dataset.useStep):[],valvePhase,pendingModelLink:pendingLink && pendingLink.index};},
      cleanup(){if(disposed)return;disposed=true;pendingLink=null;host.removeEventListener('click',click);doc.removeEventListener('visibilitychange',visibility);doc.removeEventListener('rsmissioncontext',contextChanged);if(model)model.removeEventListener('maskpartchange',modelSelection);if(orderObserver)orderObserver.disconnect();if(careObserver)careObserver.disconnect();created.forEach(n=>n.remove());artNodes.forEach(n=>n.remove());artNodes.clear();mounted.delete(host);}
    };
    mounted.set(host,api);return api;
  }
  global.RespiraUseScenes12=Object.freeze({mount,orderIds:ORDER,careIds:CARE});
})(window);
