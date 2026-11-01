"use strict";
// Fixed local case IDs only; URL text is never inserted into HTML.
(() => {
 if(document.body.dataset.page!=='recorrido')return;
 const labels={patologia:'Patología',endoscopia:'Endoscopia',limpieza:'Limpieza'};
 const params=new URLSearchParams(location.search),caseId=params.get('caso');
 const moduleReturn=params.get('origen')==='gases-vapores'&&['formaldehyde','glutaraldehyde','xylene','oxidants'].includes(params.get('agente'));
 if(!moduleReturn&&!Object.hasOwn(labels,caseId))return;
 const makeLink=()=>{const a=document.createElement('a');a.className='button secondary';a.href=moduleReturn?'gases-vapores.html?agente='+params.get('agente')+'#agentes':'hospital.html#caso='+caseId;a.textContent=moduleReturn?'← Volver al reto de gases y vapores':'← Volver al caso: '+labels[caseId];return a;};
 const controls=document.querySelector('#chemical-controls'),returnRow=document.createElement('div');returnRow.className='actions case-return';returnRow.append(makeLink());controls.append(returnRow);
 const forms=document.querySelector('#formas'),formsReturn=document.createElement('div');formsReturn.className='actions';formsReturn.append(makeLink());forms.append(formsReturn);
 if(moduleReturn)document.querySelector('#chemical-agent').addEventListener('change',()=>{const id=document.querySelector('#chemical-agent').value;if(['formaldehyde','glutaraldehyde','xylene','oxidants'].includes(id))for(const a of [returnRow.querySelector('a'),formsReturn.querySelector('a')])a.href='gases-vapores.html?agente='+id+'#agentes';});
 if(location.hash==='#formas'&&caseId==='limpieza'){
   const mist=document.querySelector('[data-agent="3"]');if(mist)mist.click();
 }
})();
