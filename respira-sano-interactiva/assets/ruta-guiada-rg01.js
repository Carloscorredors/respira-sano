/* Ruta guiada RG01: presentation adapter. Existing activities and persistence own their state. */
(() => {
  'use strict';
  if (window.RespiraGuidedUI) return;
  window.RespiraGuidedUI = Object.freeze({version:'RG01'});
  const $ = (selector, root=document) => root.querySelector(selector);
  const all = (selector, root=document) => [...root.querySelectorAll(selector)];
  const make = (tag, className, text) => { const el=document.createElement(tag); if(className)el.className=className; if(text!==undefined)el.textContent=text; return el; };
  const setText = (el,text) => { if(el && el.textContent!==text)el.textContent=text; };
  const shown = el => !!el && !el.closest('[hidden]') && el.getBoundingClientRect().width>0;
  let queued=false, m1Menu=null, missionGuide=null, guideState=null, scrollQueued=false;

  function shell() {
    const top=$('.rs-top'); if(!top || top.dataset.rgReady) return;
    top.dataset.rgReady='true'; top.classList.add('rg-top');
    const logo=$('.rs-logo',top), nav=$('nav',top), home=$('#rs-home-back'), progress=$('.rs-app-toolbar [data-rs-progress]');
    if(!nav || !logo || !home || !progress)return;
    const identity=make('div','rg-identity');logo.before(identity);identity.append(logo,make('span','rg-product-name','Respira Sano'));
    setText(home,'Misiones');home.setAttribute('aria-label','Tus misiones');nav.prepend(home);nav.append(progress);
    const tools=$('a[data-rs-route="herramientas/index.html"]',nav);if(tools)setText(tools,'Herramientas');
    const help=$('a[data-rs-route="referencias.html"]',nav);if(help)setText(help,'Ayuda');
    nav.setAttribute('aria-label','Navegación principal');
    const menu=make('details','rg-global-menu'), summary=make('summary','','Menú');nav.before(menu);menu.append(summary,nav);
    const wide=matchMedia('(min-width:741px)');const arrange=()=>{menu.open=wide.matches;};arrange();wide.addEventListener('change',arrange);
    menu.addEventListener('keydown',e=>{if(e.key==='Escape'&&!wide.matches){menu.open=false;summary.focus();}});
    menu.addEventListener('click',e=>{if(e.target.closest('a,button')&&!wide.matches)menu.open=false;});
    const descriptions=['Reconoce el riesgo respiratorio','Reto Addams · efectos y tareas','Investiga la exposición','Propón y verifica controles','Contrasta la protección','Inspecciona, usa y cuida'];
    all('[data-rs-card]').forEach(card=>{const title=$('.rs-card-title',card);if(title&&!$('.rg-card-purpose',title))title.append(make('span','rg-card-purpose',descriptions[Number(card.dataset.rsCard)-1]));});
  }

  function missionOne() {
    const root=$('.m1-wizard'), nav=$('.m1-stepper');if(!root||!nav)return;
    if(!m1Menu){
      const holder=make('div','rg-m1-route-holder');
      m1Menu=make('details','rg-m1-route');const summary=make('summary','','Ver pasos');m1Menu.append(summary);
      nav.before(holder);holder.append(m1Menu);m1Menu.append(nav);root.classList.add('rg-m1-ready');
      all('[data-m1-step-link]',nav).forEach(a=>{const title=$('b',a), name=a.getAttribute('aria-label');if(title&&name)setText(title,name.replace(/^M1\.\d+\s*[·–-]\s*/,''));});
      m1Menu.addEventListener('click',e=>{if(e.target.closest('[data-m1-step-link]'))m1Menu.open=false;});
      m1Menu.addEventListener('keydown',e=>{if(e.key==='Escape'){m1Menu.open=false;summary.focus();}});
    }
    const current=$('[data-m1-step-link][aria-current="step"]',nav);
    if(current){const index=Number(current.dataset.m1StepLink);setText($('summary',m1Menu),'Paso '+index+' de 7 · Ver pasos');m1Menu.setAttribute('aria-label','Recorrido de la misión 1');}
  }

  function caseLayout() {
    all('#m1-reconoce .rs12-case-open').forEach(article=>{
      const root=article.closest('.rs12-m15'), workspace=$('.rs12-case-workspace',article), points=$('.rs12-case-points',article);
      if(!workspace||!points)return;
      if(!$('.rg-case-navigation',article)){
        article.classList.add('rg-case');
        workspace.before(points);points.setAttribute('aria-label','Recorrido guiado de las cuatro pistas');
        const nav=make('div','rg-case-navigation');nav.setAttribute('aria-label','Recorrer las pistas del caso');
        const previous=make('button','secondary','← Pista anterior');previous.type='button';previous.dataset.rgClueDelta='-1';
        const next=make('button','rg-case-next','Siguiente pista →');next.type='button';next.dataset.rgClueDelta='1';nav.append(previous,next);workspace.after(nav);
      }
      const buttons=all('button[data-case-point]',points), index=buttons.findIndex(b=>b.getAttribute('aria-pressed')==='true');
      const previous=$('[data-rg-clue-delta="-1"]',article), next=$('[data-rg-clue-delta="1"]',article);
      const first=index<=0,last=index>=buttons.length-1;
      if(previous.disabled!==first)previous.disabled=first;if(next.disabled!==last)next.disabled=last;
      const counter=$('[data-point-position]',article), heading=$('.rs12-case-heading',article);
      if(counter&&heading&&counter.parentNode!==heading)heading.append(counter);
      if(root&&!root.classList.contains('rg-cases-ready'))root.classList.add('rg-cases-ready');
    });
  }

  const sections={
    2:[['gases-vapores','Inicio del reto'],['video-gases-vapores','Historia y video'],['gv-reto','Actividad'],['cierre-mision-2','Cierre']],
    3:[['csi-del-aire','Inicio de la misión'],['video-investiga','Historia y video'],['case-buttons','Investiga las pistas'],['cierre-mision-3','Cierre']],
    4:[['mision-posible','Inicio de la misión'],['video-controles','Historia y video'],['actividad-controles','Explora las medidas'],['caso-real-controles','Caso documentado'],['cierre-mision-4','Cierre']],
    5:[['cazadores-de-mitos','Inicio de la misión'],['video-proteccion','Historia y video'],['actividad-seleccion','Compara funciones'],['notes-mask','Tu decisión'],['cierre-mision-5','Cierre']],
    6:[['pit-stop-respiratorio','Inicio de la misión'],['video-uso-cuidado','Historia y video'],['inspection-buttons','Inspecciona las piezas'],['uso-cuidado','Uso y cuidado'],['cierre-mision-6','Cierre']]
  };
  function updateGuidePosition() {
    if(!guideState || !missionGuide || missionGuide.hidden)return;
    const threshold=missionGuide.getBoundingClientRect().bottom+38;
    let index=0;guideState.items.forEach((item,i)=>{if(item.target.getBoundingClientRect().top<=threshold)index=i;});
    if(guideState.anchorIndex!==undefined && document.scrollingElement.scrollTop===guideState.anchorScroll)index=guideState.anchorIndex;
    else guideState.anchorIndex=undefined;
    guideState.index=index;
    const item=guideState.items[index];setText($('.rg-guide-position',missionGuide),'Sección '+(index+1)+' de '+guideState.items.length+' · '+item.label);
    const prev=$('[data-rg-section-delta="-1"]',missionGuide),next=$('[data-rg-section-delta="1"]',missionGuide);
    const atStart=index===0,atEnd=index===guideState.items.length-1;
    if(prev.disabled!==atStart)prev.disabled=atStart;if(next.disabled!==atEnd)next.disabled=atEnd;
    all('[data-rg-section-index]',missionGuide).forEach(button=>{const active=Number(button.dataset.rgSectionIndex)===index;if(active&&button.getAttribute('aria-current')!=='step')button.setAttribute('aria-current','step');else if(!active&&button.hasAttribute('aria-current'))button.removeAttribute('aria-current');});
  }
  function missionSections() {
    if($('.m1-wizard') || !$('.rs-leaf-ready') && !document.documentElement.classList.contains('rs-leaf-ready'))return;
    const mission=Number(document.documentElement.dataset.rsMission), definitions=sections[mission], visible=all('[data-mission-region]').some(el=>Number(el.dataset.missionRegion)===mission&&shown(el));
    if(!definitions || !visible){if(missionGuide)missionGuide.hidden=true;guideState=null;return;}
    const items=definitions.map(([id,label])=>({id,label,target:document.getElementById(id)})).filter(item=>shown(item.target));
    if(items.length<2)return;
    if(!missionGuide){
      missionGuide=make('nav','rg-mission-guide');missionGuide.setAttribute('aria-label','Guía de la misión');
      const context=make('div','rg-guide-context');context.append(make('strong','','Tu recorrido'),make('span','rg-guide-position',''));
      const actions=make('div','rg-guide-actions'),menu=make('details','rg-section-menu');menu.append(make('summary','','Ver pasos'),make('div','rg-section-options'));
      const prev=make('button','secondary','← Paso anterior');prev.type='button';prev.dataset.rgSectionDelta='-1';
      const next=make('button','secondary','Siguiente paso →');next.type='button';next.dataset.rgSectionDelta='1';actions.append(menu,prev,next);missionGuide.append(context,actions);$('main').prepend(missionGuide);
      missionGuide.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.open=false;$('summary',menu).focus();}});
    }
    missionGuide.hidden=false;
    if(!guideState||guideState.mission!==mission){
      guideState={mission,items,index:0};const options=$('.rg-section-options',missionGuide);options.replaceChildren();
      items.forEach((item,i)=>{item.target.classList.add('rg-section-target');const button=make('button','',String(i+1)+'. '+item.label);button.type='button';button.dataset.rgSectionIndex=String(i);options.append(button);});
      requestAnimationFrame(()=>{
        let anchor;try{anchor=document.getElementById(decodeURIComponent(location.hash.slice(1)));}catch{}
        if(anchor&&shown(anchor)){
          const top=anchor.getBoundingClientRect().top;
          if(top>=0 && top<missionGuide.getBoundingClientRect().bottom+16)anchor.scrollIntoView({block:'start',behavior:'instant'});
        }
        updateGuidePosition();
      });
    }
    updateGuidePosition();
  }
  function goSection(index) {
    if(!guideState)return;
    index=Math.max(0,Math.min(guideState.items.length-1,index));
    const item=guideState.items[index];
    if(item){
      $('.rg-section-menu',missionGuide).open=false;
      const focus=$('h1,h2,h3',item.target)||item.target;
      if(!focus.matches('a,button,input,textarea,select'))focus.setAttribute('tabindex','-1');
      focus.focus({preventScroll:true});
      item.target.scrollIntoView({block:'start',behavior:'instant'});
      guideState.anchorIndex=index;guideState.anchorScroll=document.scrollingElement.scrollTop;
      updateGuidePosition();requestAnimationFrame(updateGuidePosition);
    }
  }
  function refresh(){queued=false;shell();missionOne();caseLayout();missionSections();}
  function schedule(){if(!queued){queued=true;requestAnimationFrame(refresh);}}
  function start(){
    document.body.classList.add('rg-ui');document.documentElement.dataset.rgVersion='RG01';
    refresh();
    new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden','aria-current','aria-pressed']});
    document.addEventListener('m1viewswitch',schedule);document.addEventListener('rsmissioncontext',schedule);window.addEventListener('hashchange',schedule);
    document.addEventListener('click',e=>{
      const clue=e.target.closest('[data-rg-clue-delta]');
      if(clue){
        const article=clue.closest('.rs12-case-open'), buttons=all('.rs12-case-points button[data-case-point]',article),index=buttons.findIndex(b=>b.getAttribute('aria-pressed')==='true'),next=index+Number(clue.dataset.rgClueDelta);
        if(buttons[next]){
          buttons[next].click();
          const title=$('.rs12-case-insight h4',article);
          if(title){title.setAttribute('tabindex','-1');title.focus({preventScroll:true});title.scrollIntoView({block:'start',behavior:'instant'});}
        }
        schedule();return;
      }
      const direct=e.target.closest('[data-rg-section-index]');if(direct){goSection(Number(direct.dataset.rgSectionIndex));return;}
      const section=e.target.closest('[data-rg-section-delta]');if(section&&guideState)goSection(guideState.index+Number(section.dataset.rgSectionDelta));
    });
    document.addEventListener('scroll',()=>{if(guideState&&!scrollQueued){scrollQueued=true;requestAnimationFrame(()=>{scrollQueued=false;updateGuidePosition();});}},true);
    window.addEventListener('resize',()=>{schedule();});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
