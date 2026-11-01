"use strict";
((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.RespiraProgressRules=api;})(typeof window==='undefined'?globalThis:window,()=>{
 const M1=Object.freeze({version:'mission1-expedition-v1',route:Object.freeze(['entrada','traquea','bronquios','bronquiolos','alveolos']),associations:Object.freeze({evaporacion:'vapor',gotas:'niebla',fragmentacion:'polvo'})});
 const COURSE='respira-sano-misiones-v2',VERSION=2;
 const KEYS={app:'respira-sano-adaptaciones-v1',gases:'respira-sano-gases-vapores-v1',use:'respira-sano-uso-cuidado-v1'};
 const cases=['endoscopia','patologia','limpieza'],agents=['formaldehyde','glutaraldehyde','oxidants','chlorine','xylene'];
 const careAnswers={face:1,filters:0,storage:2,change:1,abnormal:0};
 const fields={1:['notes-air'],2:['gv-field-1'],3:['case-observation'],4:['mission-reason','mission-verification'],5:['notes-mask'],6:['notes-use']};
 const normalize=v=>typeof v==='string'?v.trim():'';
 const meaningful=v=>normalize(v).length<=10000&&/[\p{L}\p{N}]/u.test(normalize(v));
 const parse=s=>{try{const value=JSON.parse(s);return value&&typeof value==='object'&&!Array.isArray(value)?value:{};}catch{return {};}};
 const app=records=>parse(records?.[KEYS.app]);
 function context(id,records){const a=app(records),g=parse(records?.[KEYS.gases]);if(id===2)return 'agent:'+(agents.includes(g.agent)?g.agent:'formaldehyde');if(id===3||id===4)return 'case:'+(cases.includes(a.activeCase)?a.activeCase:'endoscopia');return id===5?'case:andres-unknown':id===6?'case:equipo-evaluado':'mission:1';}
 function evidenceValues(id,records){const a=app(records),cid=context(id,records).replace('case:',''),c=a.cases?.[cid]||{};return id===1?{'notes-air':a.notes?.aire||''}:id===2?{'gv-field-1':a.notes?.['gases-vapores-1']||''}:id===3?{'case-observation':c.note||''}:id===4?{'mission-reason':c.plan?.reason||'','mission-verification':c.plan?.verification||''}:id===5?{'notes-mask':a.notes?.proteccion||''}:{'notes-use':a.notes?.['uso-cuidado-reflexion']||''};}
 function proof(id,records,drafts){const a=app(records),g=parse(records?.[KEYS.gases]),u=parse(records?.[KEYS.use]),ctx=context(id,records),cid=ctx.replace('case:',''),values=evidenceValues(id,records),draft=drafts?.[id+'|'+ctx]||{};
  const p={context:ctx,evidence:{}};for(const field of fields[id]||[])p.evidence[field]={value:values[field],authorship:draft.fields?.[field]||null};
  if(id===1){const game=a.mission1Expedition||{};p.closureVersion=game.contractVersion||null;p.route=game.route||null;p.associations=game.associations||null;}
  if(id===2)p.answer=g.answers?.['GV-TIEMPO']||null;
  if(id===3)p.answer=a.caseAnswers?.[cid]?.exposure||null;
  if(id===4){p.answer=a.caseAnswers?.[cid]?.['controls-verification']||null;p.plan=a.cases?.[cid]?.plan||null;}
  if(id===5)p.answer=a.answers?.unknown||null;
  if(id===6){p.order=u.order;p.orderReviewed=u.orderReviewed;p.orderReviewVersion=u.orderReviewVersion;p.orderReviewedAt=u.orderReviewedAt;const entry=Object.entries(u.answers||{}).find(([key,value])=>value?.reviewed===true&&value.criteriaVersion===2&&Object.hasOwn(careAnswers,key)&&Number.isInteger(value.value)&&value.value===careAnswers[key]);p.care=entry?{id:entry[0],...entry[1]}:null;p.seal=u.seal;}
  return JSON.parse(JSON.stringify(p));
 }
 const reviewed=a=>a&&a.reviewed===true&&a.criteriaVersion===2&&Number.isFinite(a.reviewedAt)&&a.reviewedAt>0;
 function verify03(id,p){const missing=[];if(!Number.isInteger(id)||id<1||id>6||!p||typeof p!=='object')return {ok:false,missing:['El cierre no corresponde a una misión válida.']};
  const expectedContext=id===2?agents.map(v=>'agent:'+v):id===3||id===4?cases.map(v=>'case:'+v):[id===5?'case:andres-unknown':id===6?'case:equipo-evaluado':'mission:1'];
  if(!expectedContext.includes(p.context))missing.push('La evidencia no corresponde al contexto de esta misión.');
  if(id===1&&!(reviewed(p.answer)&&p.answer.value===1))missing.push('Revisa y corrige la decisión de Camila antes de cerrar.');
  if(id===2&&!(reviewed(p.answer)&&p.answer.selected==='C'))missing.push('Revisa y corrige la decisión «Tiempo y acción».');
  if(id===3&&!(reviewed(p.answer)&&p.answer.value===2&&p.answer.caseId===p.context.slice(5)))missing.push('Revisa y corrige la decisión sobre exposición en este expediente.');
  if(id===4){if(!(reviewed(p.answer)&&p.answer.value===1&&p.answer.caseId===p.context.slice(5)))missing.push('Revisa y corrige la comprobación sobre captación y ventilación.');const plan=p.plan;
   if(!plan||plan.criteriaVersion!==2||!Number.isFinite(plan.reviewedAt))missing.push('Revisa tu propuesta de controles del mismo caso.');
   else if(plan.priority==='datos'){if(plan.review!=='datos-pendientes'||!meaningful(plan.verification))missing.push('Indica qué dato necesitas obtener y revisa esa propuesta.');}
   else if(!['eliminacion','encerramiento','extraccion','ventilacion','procedimiento'].includes(plan.priority)||plan.review!=='pendiente-verificacion')missing.push('Revisa la prioridad o indica qué datos faltan; el EPR es una barrera complementaria.');
   else if(!meaningful(plan.reason)||!meaningful(plan.verification))missing.push('Conserva el motivo y la comprobación propuesta antes de revisarla.');
  }
  if(id===5&&!(reviewed(p.answer)&&p.answer.value===1))missing.push('Revisa y corrige la decisión de Andrés sobre la atmósfera desconocida.');
  if(id===6){if(!(p.orderReviewed===true&&p.orderReviewVersion===2&&Number.isFinite(p.orderReviewedAt)&&Array.isArray(p.order)&&p.order.join('|')==='prepare|don|seal|decide'))missing.push('Ordena la preparación y revisa la secuencia correcta.');if(!(reviewed(p.care)&&Object.hasOwn(careAnswers,p.care.id)&&Number.isInteger(p.care.value)&&p.care.value===careAnswers[p.care.id]))missing.push('Revisa y corrige al menos una decisión de cuidado.');}
  const required=(id===4&&p.plan?.priority==='datos')?['mission-verification']:fields[id];
  for(const field of required){const e=p.evidence?.[field],meta=e?.authorship;const valid=meaningful(e?.value)&&meta?.own===true&&meta.context===p.context&&normalize(meta.value)===normalize(e.value)&&normalize(meta.placeholder)!==normalize(e.value)&&(!meta.automaticValue||normalize(meta.automaticValue)!==normalize(e.value));if(!valid)missing.push(field==='mission-reason'?'Escribe un motivo propio para este caso.':field==='mission-verification'?'Escribe qué necesitas comprobar en este caso.':'Escribe y guarda una evidencia propia de este contexto; el resumen automático es solo apoyo.');}
  return {ok:missing.length===0,missing:[...new Set(missing)]};
 }
 function verify(id,p){if(id!==1)return verify03(id,p);const missing=[];if(!p||p.context!=='mission:1')missing.push('La evidencia no corresponde a esta expedición.');
  if(p?.closureVersion!==M1.version)missing.push('Los nuevos retos de esta expedición siguen pendientes.');
  const route=p?.route,order=route?.order;const routeValid=Array.isArray(order)&&order.length===5&&order.join('|')===M1.route.join('|')&&route.reviewed===true&&route.contractVersion===M1.version&&Number.isFinite(route.reviewedAt)&&route.reviewedAt>0&&Array.isArray(route.reviewedOrder)&&route.reviewedOrder.join('|')===order.join('|');
  if(!routeValid)missing.push('Ordena y revisa las cinco etapas del recorrido del aire.');
  for(const [source,correct] of Object.entries(M1.associations)){const answer=p?.associations?.[source];if(!(answer&&answer.selected===correct&&answer.reviewed===true&&answer.reviewedValue===answer.selected&&answer.contractVersion===M1.version&&Number.isFinite(answer.reviewedAt)&&answer.reviewedAt>0))missing.push('Revisa la relación de '+({evaporacion:'evaporación',gotas:'gotas suspendidas',fragmentacion:'fragmentación mecánica'}[source])+'.');}
  const evidence=p?.evidence?.['notes-air'],meta=evidence?.authorship;if(!(meaningful(evidence?.value)&&meta?.own===true&&meta.context==='mission:1'&&normalize(meta.value)===normalize(evidence.value)&&normalize(meta.placeholder)!==normalize(evidence.value)&&(!meta.automaticValue||normalize(meta.automaticValue)!==normalize(evidence.value))))missing.push('Escribe y guarda una observación propia sobre una tarea o posible emisión.');
  return {ok:missing.length===0,missing};}
 function review(id,records,drafts){const evidence=proof(id,records,drafts);return {...verify(id,evidence),proof:evidence};}
 function empty(){return {course:COURSE,version:VERSION,epoch:(typeof crypto!=='undefined'&&crypto.randomUUID)?crypto.randomUUID():'rs-'+Date.now()+'-'+Math.random().toString(36).slice(2),createdAt:Date.now(),updatedAt:Date.now(),records:{},drafts:{},certificates:[]};}
 function validate(value){try{if(!value||value.course!==COURSE||value.version!==VERSION||typeof value.epoch!=='string'||value.epoch.length<8||value.epoch.length>100||!Number.isFinite(value.updatedAt)||!Array.isArray(value.certificates)||value.certificates.length>6||!value.records||typeof value.records!=='object'||Array.isArray(value.records)||!value.drafts||typeof value.drafts!=='object'||JSON.stringify(value).length>1500000)return null;
   if(Object.keys(value.records).some(key=>!Object.values(KEYS).includes(key)))return null;
   for(const s of Object.values(value.records))if(typeof s!=='string'||s.length>450000||!JSON.parse(s)||typeof JSON.parse(s)!=='object'||Array.isArray(JSON.parse(s)))return null;
   for(let i=0;i<value.certificates.length;i++){const c=value.certificates[i];if(c.mission!==i+1||!Number.isFinite(c.completedAt))return null;const valid=i===0?((c.criteriaVersion===4&&verify(1,c.proof).ok)||(c.criteriaVersion===2&&!c.proof?.closureVersion&&verify03(1,c.proof).ok)):(c.criteriaVersion===2&&verify(i+1,c.proof).ok);if(!valid)return null;}
   if(Array.isArray(value.drafts)||Object.keys(value.drafts).length>60)return null;
   for(const [key,draft] of Object.entries(value.drafts)){const split=key.indexOf('|'),id=Number(key.slice(0,split)),ctx=key.slice(split+1),allowed=id===2?agents.map(v=>'agent:'+v):id===3||id===4?cases.map(v=>'case:'+v):[id===1?'mission:1':id===5?'case:andres-unknown':'case:equipo-evaluado'];if(!fields[id]||!allowed.includes(ctx)||!draft||typeof draft!=='object'||Array.isArray(draft)||!draft.fields||typeof draft.fields!=='object'||Array.isArray(draft.fields))return null;for(const [field,meta] of Object.entries(draft.fields)){if(!fields[id].includes(field)||!meta||typeof meta!=='object'||Array.isArray(meta)||typeof meta.value!=='string'||meta.value.length>10000||meta.context!==ctx||typeof meta.own!=='boolean')return null;}}
   return JSON.parse(JSON.stringify(value));
  }catch{return null;}}
 const available=state=>Math.min(6,state.certificates.length+1);
 function commit(state,id){if(id>available(state))return {ok:false,missing:['Completa la misión anterior.']};const result=review(id,state.records,state.drafts);if(!result.ok)return result;const certificate={mission:id,criteriaVersion:id===1?4:2,completedAt:Date.now(),proof:result.proof};if(id<=state.certificates.length)state.certificates[id-1]=certificate;else state.certificates.push(certificate);state.updatedAt=Date.now();return {...result,certificate};}
 function resolve(route,hint,config){try{const url=new URL(route,'https://respira.invalid/');if(url.origin!=='https://respira.invalid')return null;const path=decodeURIComponent(url.pathname.slice(1));const page=config.pages[path];if(!page)return null;url.searchParams.delete('rsFrame');url.searchParams.delete('rsMission');let hash='';try{hash=decodeURIComponent(url.hash.slice(1));}catch{}const role=page.ids?.[hash];let mission=Array.isArray(role)?(role.includes(Number(hint))?Number(hint):role[0]):Number.isInteger(role)?role:page.default;return {path,search:url.search,hash:url.hash,mission,shared:Array.isArray(role),route:path+url.search+url.hash};}catch{return null;}}
 return {M1,COURSE,VERSION,KEYS,fields,context,evidenceValues,meaningful,proof,verify,review,empty,validate,available,commit,resolve};
});

