(()=>{'use strict';const previous=window.RespiraDetailedModels,anatomy=window.RespiraAnatomyV8;if(!previous||!anatomy)return;
 window.RespiraDetailedModels={...previous,mount(container,options={}){if(options.mode==='system')return anatomy.mount(container,options);const api=previous.mount(container,options);const list=api.root.querySelector('.rsdm-part-buttons');if(list){list.classList.remove('rsdm-part-buttons');list.classList.add('rsa8-alveolar-parts');list.setAttribute('aria-label','Estructuras de la ampliación alveolar');}return api;}};
})();
