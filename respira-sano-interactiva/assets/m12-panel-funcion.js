/* Read-only mirror of M1.2 selection/narration, with relocation of the original audio node. */
(()=>{'use strict';
 const functions=[
  ['nariz','Nariz','El aire puede entrar por la nariz, que ayuda a calentarlo y humedecerlo.'],
  ['boca','Boca','La boca es otra entrada de aire hacia la faringe.'],
  ['faringe','Faringe','La faringe está detrás de la nariz y la boca y conduce el aire hacia la laringe.'],
  ['laringe','Laringe','Desde la faringe, el aire cruza la laringe antes de entrar en la tráquea.'],
  ['traquea','Tráquea','La tráquea conduce el aire y se divide en los dos bronquios principales.'],
  ['bronquios','Bronquios','Cada bronquio principal lleva aire a un pulmón y se ramifica en su interior.'],
  ['bronquiolos','Bronquiolos','Los bronquiolos son vías pequeñas que conducen el aire hacia las regiones alveolares.'],
  ['pulmones','Pulmones','Los pulmones se expanden al aumentar el espacio torácico y contienen las vías y regiones de intercambio.'],
  ['diafragma','Diafragma','Al inhalar, el diafragma se contrae y desciende; al exhalar tranquilamente, se relaja.'],
  ['intercostales','Músculos intercostales','Estos músculos, situados entre las costillas, ayudan a ampliar el tórax al inhalar.'],
  ['corazon','Corazón','El corazón impulsa sangre hacia los pulmones y los tejidos; el aire no pasa por sus cavidades.'],
  ['alveolos','Región alveolar','El aire llega a regiones alveolares, cuyo detalle y relación con la sangre explorarás en M1.3.']
 ];
 let screen,card,model,panel,title,body,context,kicker,observer,scheduled=0,last='';
 const clean=value=>(value||'').replace(/\s+/g,' ').trim();
 function render(){
  scheduled=0;if(!screen||!panel)return;
  const root=model.querySelector('.r9-system'),selected=root?.dataset.selected;
  const index=functions.findIndex(row=>row[0]===selected);
  const following=model.dataset.follow==='true';
  const caption=clean(card.querySelector('[data-n9-caption]')?.textContent);
  const narrativeContext=clean(card.querySelector('[data-n9-context]')?.textContent);
  const alveolar=model.dataset.scene==='alveolar';
  let heading='Elige una estructura',text='Pulsa un número del modelo o elige su nombre para conocer qué función cumple.',label='Qué hace esta estructura';
  if(alveolar){
   label='Detalle del relato';heading=caption||'Intercambio alveolar';
   const detail=model.querySelector('.r9-inline-detail .rsdm-detail');
   text=clean(detail?.querySelector('p')?.textContent)||narrativeContext||'Observa el detalle que acompaña al audio.';
  }else if(index>=0){
   heading=(index+1)+'. '+functions[index][1];text=functions[index][2];
  }else if(following&&caption&&!caption.startsWith('Pulsa reproducir')){
   label='En este momento del relato';heading=caption;
   text=clean(root?.querySelector('.rsdm-detail p')?.textContent)||narrativeContext;
  }
  const extra=following&&index>=0?[caption,narrativeContext].filter(Boolean).join(' · '):'';
  const signature=[heading,text,label,extra].join('\n');if(signature===last)return;last=signature;
  title.textContent=heading;body.textContent=text;kicker.textContent=label;
  context.textContent=extra;context.hidden=!extra;
 }
 function schedule(){if(!scheduled)scheduled=requestAnimationFrame(render);}
 function mount(){
  screen=document.getElementById('m1-explora');if(!screen)return;
  if(screen.querySelector('.m12p-layout')){schedule();return;}
  card=screen.querySelector('#m4-local-viewer');model=screen.querySelector('#m1-system-detailed');
  const audio=screen.querySelector('.rs-audio01'),stack=screen.querySelector('.r9-stack');
  if(!card||!model||!audio||!stack)return;
  const layout=document.createElement('div');layout.className='m12p-layout';
  const side=document.createElement('aside');side.className='m12p-side';side.setAttribute('aria-label','Audio y función de la estructura');
  panel=document.createElement('section');panel.className='m12p-function';panel.setAttribute('aria-labelledby','m12p-function-title');panel.setAttribute('aria-live','polite');panel.setAttribute('aria-atomic','true');
  panel.innerHTML='<h3 data-m12p-kicker>Qué hace esta estructura</h3><h4 id="m12p-function-title">Elige una estructura</h4><p data-m12p-body></p><p class="m12p-context" data-m12p-context hidden></p>';
  title=panel.querySelector('h4');body=panel.querySelector('[data-m12p-body]');context=panel.querySelector('[data-m12p-context]');kicker=panel.querySelector('[data-m12p-kicker]');
  stack.insertBefore(layout,audio);layout.append(card,side);side.append(audio,panel);
  // The engine queries its internal detail node. Keep that source in place and mirror it.
  screen.classList.add('m12p-ready');
  observer=new MutationObserver(schedule);
  observer.observe(card,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['data-selected','data-scene','data-follow','hidden']});
  card.addEventListener('change',schedule);card.addEventListener('click',schedule);
  render();
 }
 document.addEventListener('m1viewswitch',mount);
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
