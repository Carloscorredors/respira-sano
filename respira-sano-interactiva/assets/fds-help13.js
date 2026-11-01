/* Respira Sano · optional label/SDS reading help. Local consultation only. */
"use strict";
(()=>{
 const instances=new WeakMap();let serial=0;
 function validate(data){
  if(!data||data.version!=='1.1'||data.example?.id!=='P-R01'||data.example.label_excerpt?.pictogram!=='GHS07'||data.example.label_excerpt?.hazard_code!=='H335'||data.example.label_excerpt?.signal_word!=='Atención')throw new TypeError('La ayuda requiere el contenido pedagógico1.1 P-R01/H335.');
  if(data.pictogram_cards?.map(x=>x.id).join('|')!=='GHS07|GHS08|GHS05|GHS06'||data.FDS_cards?.map(x=>x.section).join('|')!=='2|7|8|9|10|11')throw new TypeError('Las fichas de consulta no corresponden al contrato13.');
  const q=data.example.challenge;if(!q?.choices?.some(x=>x.id===q.correctId))throw new TypeError('Falta la pista de autoconsulta prevista.');
  return data;
 }
 function localAsset(value){if(typeof value!=='string')return '';const src=value.trim();return /^data:image\/(?:png|jpeg|webp|svg\+xml)[;,]/i.test(src)||(!/^[a-z][a-z0-9+.-]*:/i.test(src)&&!src.startsWith('//')&&!/[\u0000-\u001f\\]/.test(src))?src:'';}
 function mount(host,input){
  if(!host?.ownerDocument||typeof host.append!=='function')throw new TypeError('Se requiere un contenedor local para la ayuda voluntaria.');
  if(instances.has(host))return instances.get(host);
  const data=JSON.parse(JSON.stringify(validate(input))),doc=host.ownerDocument,id='rs13-fds-'+(++serial);let destroyed=false;
  const make=(tag,cls,text)=>{const el=doc.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  const panel=make('details','rs13-fds');panel.id=id;panel.open=false;
  const summary=make('summary','rs13-fds-summary',data.title);panel.append(summary);
  const body=make('div','rs13-fds-body');panel.append(body);body.append(make('p','rs13-fds-lead',data.lead));
  const modes=make('div','rs13-fds-modes');modes.setAttribute('aria-label','Tipo de consulta');body.append(modes);
  const views={};let current='pictograms';
  function picture(card){const wrap=make('div','rs13-fds-symbol'),src=localAsset(data.pictogram_assets?.[card.id]);const fallback=make('p','rs13-fds-symbol-text',card.id+' · '+card.title);wrap.append(fallback);if(src){const img=make('img','rs13-fds-symbol-image');img.width=128;img.height=128;img.alt=card.id+' · '+card.title;img.src=src;fallback.hidden=true;img.addEventListener('error',()=>{img.remove();fallback.hidden=false;},{once:true});wrap.prepend(img);}return wrap;}
  function view(key,label){const out=make('section','rs13-fds-view');out.id=id+'-'+key;out.setAttribute('aria-label',label);body.append(out);views[key]=out;const b=make('button','rs13-fds-button',label);b.type='button';b.dataset.mode=key;b.setAttribute('aria-controls',out.id);b.addEventListener('click',()=>show(key));modes.append(b);return out;}
  function show(key){if(destroyed||!views[key])return;current=key;for(const [name,out]of Object.entries(views)){out.hidden=name!==key;out.inert=out.hidden;}modes.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===key)));}
  const pictograms=view('pictograms','Pictogramas');
  const pictogramChoices=make('div','rs13-fds-picker');pictogramChoices.setAttribute('aria-label','Consulta un símbolo por separado');pictograms.append(pictogramChoices);
  const cardHost=make('div','rs13-fds-card-host');cardHost.id=id+'-pictogram-card';cardHost.setAttribute('aria-live','polite');pictograms.append(cardHost);
  function choosePictogram(card){cardHost.replaceChildren();const article=make('article','rs13-fds-card');article.append(picture(card));const content=make('div','rs13-fds-card-text');content.append(make('h4','',card.title),make('p','',card.meaning),make('p','rs13-fds-limit',card.not_infer));if(card.respiratory_example){const hint=make('details','rs13-fds-nested');hint.append(make('summary','',card.respiratory_example.code),make('p','',card.respiratory_example.idea));content.append(hint);}article.append(content);cardHost.append(article);pictogramChoices.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.symbol===card.id)));}
  for(const card of data.pictogram_cards){const b=make('button','rs13-fds-button',card.id+' · '+card.title);b.type='button';b.dataset.symbol=card.id;b.setAttribute('aria-controls',cardHost.id);b.addEventListener('click',()=>choosePictogram(card));pictogramChoices.append(b);}choosePictogram(data.pictogram_cards[0]);
  const fds=view('sections','Secciones de la FDS');
  const sectionChoices=make('div','rs13-fds-picker');sectionChoices.setAttribute('aria-label','Consulta una sección de la FDS');fds.append(sectionChoices);
  const sectionHost=make('article','rs13-fds-section-card');sectionHost.id=id+'-section-card';sectionHost.setAttribute('aria-live','polite');fds.append(sectionHost);
  function chooseSection(card){sectionHost.replaceChildren(make('h4','',String(card.section)+' · '+card.label),make('p','rs13-fds-prompt',card.prompt),make('p','',card.hint));sectionChoices.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.section===String(card.section))));}
  for(const card of data.FDS_cards){const b=make('button','rs13-fds-button',String(card.section)+' · '+card.label);b.type='button';b.dataset.section=String(card.section);b.setAttribute('aria-controls',sectionHost.id);b.addEventListener('click',()=>chooseSection(card));sectionChoices.append(b);}chooseSection(data.FDS_cards[0]);
  const exampleView=view('example','Ejemplo ficticio'),example=data.example,label=example.label_excerpt;
  const exampleDetails=make('details','rs13-fds-example');exampleDetails.open=false;exampleDetails.append(make('summary','',example.product_identifier));exampleView.append(exampleDetails);
  exampleDetails.append(make('p','rs13-fds-fiction-banner',example.banner));
  const labelCard=make('article','rs13-fds-label');labelCard.dataset.fictional='true';labelCard.append(make('h4','',example.product_identifier));
  const labelContent=make('div','rs13-fds-label-content');labelContent.append(picture(data.pictogram_cards.find(x=>x.id===label.pictogram)));const declaration=make('div','rs13-fds-declaration');declaration.append(make('p','rs13-fds-signal',label.signal_word),make('p','rs13-fds-hazard',label.hazard_code+' · '+label.hazard_statement));labelContent.append(declaration);labelCard.append(labelContent,make('p','rs13-fds-assumption',label.assumed_classification));exampleDetails.append(labelCard);
  const excerpt=make('details','rs13-fds-nested');excerpt.append(make('summary','','Consultar el extracto ficticio por sección'));exampleDetails.append(excerpt);const excerptChoices=make('div','rs13-fds-picker'),excerptHost=make('p','rs13-fds-excerpt');excerptHost.id=id+'-excerpt';excerptHost.setAttribute('aria-live','polite');excerpt.append(excerptChoices,excerptHost);
  function chooseExcerpt(card){excerptHost.textContent=example.FDS_excerpt[String(card.section)];excerptChoices.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.section===String(card.section))));}
  for(const card of data.FDS_cards){const b=make('button','rs13-fds-button',String(card.section)+' · '+card.label);b.type='button';b.dataset.section=String(card.section);b.setAttribute('aria-controls',excerptHost.id);b.addEventListener('click',()=>chooseExcerpt(card));excerptChoices.append(b);}chooseExcerpt(data.FDS_cards[0]);
  const missing=make('details','rs13-fds-nested');missing.append(make('summary','','Información no aportada'));const list=make('ul','');example.not_provided.forEach(text=>list.append(make('li','',text)));missing.append(list);exampleDetails.append(missing);
  const question=example.challenge,practice=make('section','rs13-fds-practice'),fieldset=make('fieldset',''),options=[];fieldset.append(make('legend','',question.prompt));practice.append(fieldset);let selected='',selectedOption=null;
  const response=make('p','rs13-fds-response');response.hidden=true;response.setAttribute('role','status');response.setAttribute('aria-live','polite');response.setAttribute('aria-atomic','true');
  for(const choice of question.choices){const option=make('label','rs13-fds-option'),radio=make('input','');radio.type='radio';radio.name=id+'-practice';radio.value=choice.id;radio.addEventListener('change',()=>{selected=choice.id;selectedOption=option;options.forEach(item=>delete item.dataset.examState);response.hidden=false;response.dataset.state='pending';response.textContent='○ Pendiente · Respuesta seleccionada; pulsa Contrastar esta pista.';});option.append(radio,make('span','',choice.text));fieldset.append(option);options.push(option);}
  const review=make('button','rs13-fds-button','Contrastar esta pista');review.type='button';review.addEventListener('click',()=>{options.forEach(item=>delete item.dataset.examState);response.hidden=false;response.dataset.state=!selected?'pending':selected===question.correctId?'correct':'review';if(selectedOption)selectedOption.dataset.examState=selected===question.correctId?'correct':'incorrect';response.textContent=!selected?'○ Pendiente · Elige una opción para consultar la pista.':selected===question.correctId?'✓ Correcto · '+question.feedbackCorrect:'✕ Incorrecto · '+question.feedbackIncorrect;});practice.append(review,response);exampleDetails.append(practice);
  if(data.comparison_hint?.optional){const contrast=make('details','rs13-fds-nested');contrast.append(make('summary','',data.comparison_hint.title),make('p','',data.comparison_hint.left),make('p','',data.comparison_hint.right),make('p','rs13-fds-limit',data.comparison_hint.scope));exampleView.append(contrast);}
  const sources=make('details','rs13-fds-sources');sources.append(make('summary','','Fuentes y alcance'),make('p','',data.source_policy));const sourceList=make('ul','');for(const source of data.sources||[]){const item=make('li',''),link=make('a','',source.title);if(/^https:\/\//.test(source.url)){link.href=source.url;link.target='_blank';link.rel='noopener';item.append(link);}else item.textContent=source.title;sourceList.append(item);}sources.append(sourceList);body.append(sources);
  host.append(panel);show(current);const api={root:panel,destroy(){if(destroyed)return;destroyed=true;panel.remove();instances.delete(host);}};instances.set(host,api);return api;
 }
 window.RespiraFDS13=Object.freeze({mount});
})();
