/* A single optional consultation page; original configuration and rules stay intact. */
(()=>{'use strict';
 const pages=window.RespiraProgressConfig?.pages;
 if(!pages||Object.hasOwn(pages,'herramientas/ampliacion-opcional.html'))return;
 pages['herramientas/ampliacion-opcional.html']={default:0,ids:{main:0,ruta:0,'ampliacion-m1':0,'ampliacion-m2':0,'ampliacion-m3':0,'ampliacion-m4':0,'ampliacion-m5':0,'ampliacion-m6':0}};
})();
