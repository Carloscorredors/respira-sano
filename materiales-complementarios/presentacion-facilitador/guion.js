"use strict";
window.GUION={
  "title": "Respira Sano",
  "version": "0.2.4 · Rótulos de componentes y válvulas · Minutaje para ensayo",
  "date": "2026-10-18",
  "minutes": 120,
  "objective": "Fortalecer la capacidad de los participantes para identificar contaminantes químicos presentes en el aire, seleccionar medidas de control y utilizar adecuadamente los elementos de protección respiratoria, reduciendo el riesgo de exposición y afectación a la salud.",
  "sections": [
    {
      "id": "abrir",
      "name": "Apertura · Expediente Respira Sano",
      "minutes": 5
    },
    {
      "id": "viaje-fantastico",
      "name": "Viaje fantástico: una misión dentro de ti",
      "technicalBlock": "1. Reconocimiento del riesgo respiratorio",
      "minutes": 20
    },
    {
      "id": "gases-vapores",
      "name": "No te hagas el loco con los gases y vapores",
      "technicalBlock": "Refuerzo de 1. Reconocimiento: efectos y tareas",
      "minutes": 15
    },
    {
      "id": "csi-del-aire",
      "name": "CSI del aire: sigue las pistas",
      "technicalBlock": "2. Evaluación de la exposición",
      "minutes": 20
    },
    {
      "id": "mision-posible",
      "name": "Misión posible: controla la fuente",
      "technicalBlock": "3. Controles para proteger la respiración",
      "minutes": 15
    },
    {
      "id": "cazadores-de-mitos",
      "name": "Cazadores de mitos: ¿qué protege de qué?",
      "technicalBlock": "4. Selección del respirador",
      "minutes": 20
    },
    {
      "id": "pit-stop-respiratorio",
      "name": "Pit stop respiratorio: revisa, ajusta y cuida",
      "technicalBlock": "5. Uso, inspección y mantenimiento",
      "minutes": 20
    },
    {
      "id": "cerrar",
      "name": "Cierre · La próxima misión",
      "minutes": 5
    }
  ],
  "sources": {
    "anatomia": {
      "name": "NHLBI · Sistema respiratorio",
      "url": "https://www.nhlbi.nih.gov/es/salud/pulmones/sistema-respiratorio"
    },
    "formal": {
      "name": "ATSDR · Formaldehído",
      "url": "https://wwwn.cdc.gov/TSP/PHS/PHS.aspx?phsid=218&toxid=39"
    },
    "quimicos": {
      "name": "NIOSH · Riesgos químicos en salud",
      "url": "https://www.cdc.gov/niosh/healthcare/risk-factors/chemical-hazards.html"
    },
    "laboratorio": {
      "name": "OSHA · Laboratorios",
      "url": "https://www.osha.gov/sites/default/files/publications/OSHA3404laboratory-safety-guidance.pdf"
    },
    "paa": {
      "name": "NIOSH · Peracético, peróxido y acético en un hospital",
      "url": "https://www.cdc.gov/niosh/hhe/reports/pdfs/2017-0114-3357.pdf"
    },
    "fds": {
      "name": "OSHA · Fichas de datos de seguridad",
      "url": "https://www.osha.gov/sites/default/files/publications/OSHA3514.pdf"
    },
    "ntp936": {
      "name": "INSST · NTP 936 / COSHH Essentials",
      "url": "https://www.insst.es/documentacion/colecciones-tecnicas/ntp-notas-tecnicas-de-prevencion/27-serie-ntp-numeros-926-a-960-ano-2012/nota-tecnica-de-prevencion-ntp-936"
    },
    "ntp937": {
      "name": "INSST · NTP 937 / INRS",
      "url": "https://www.insst.es/documentacion/colecciones-tecnicas/ntp-notas-tecnicas-de-prevencion/27-serie-ntp-numeros-926-a-960-ano-2012/nota-tecnica-de-prevencion-ntp-937"
    },
    "jerarquia": {
      "name": "NIOSH · Jerarquía de controles",
      "url": "https://www.cdc.gov/niosh/hierarchy-of-controls/about/"
    },
    "renal": {
      "name": "CDC · Reprocesamiento y hemodiálisis",
      "url": "https://www.cdc.gov/infection-control/hcp/disinfection-sterilization/healthcare-equipment.html"
    },
    "mezclas": {
      "name": "CDC · Cloro y cloraminas por incompatibilidad",
      "url": "https://www.cdc.gov/mmwr/preview/mmwrhtml/00015111.htm"
    },
    "real": {
      "name": "NIOSH · Resumen de congreso sobre seguimiento de controles de N₂O (1997)",
      "url": "https://stacks.cdc.gov/view/cdc/193881"
    },
    "seleccion": {
      "name": "NIOSH · Selección y uso de respiradores",
      "url": "https://www.cdc.gov/niosh/ppe/respirators/selection.html"
    },
    "filtros": {
      "name": "NIOSH · Respiradores filtrantes",
      "url": "https://www.cdc.gov/niosh/ppe/respirators/ffr.html"
    },
    "logica": {
      "name": "NIOSH · Lógica de selección",
      "url": "https://www.cdc.gov/niosh/docs/2005-100/pdfs/2005-100.pdf"
    },
    "programa": {
      "name": "OSHA · Programa, uso y mantenimiento",
      "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.134"
    },
    "recambio": {
      "name": "OSHA · Cambio de cartuchos",
      "url": "https://www.osha.gov/etools/respiratory-protection/change-schedules/"
    },
    "anestesia": {
      "name": "OSHA · Gases anestésicos residuales",
      "url": "https://www.osha.gov/etools/hospitals/surgical-suite/waste-anesthetic-gases"
    },
    "humo": {
      "name": "NIOSH · Humo quirúrgico",
      "url": "https://www.cdc.gov/niosh/bulletin/2020/surgical-smoke.html"
    },
    "glutaraldehido": {
      "name": "NIOSH · Glutaraldehído en hospitales",
      "url": "https://www.cdc.gov/niosh/docs/2001-115/pdfs/2001-115.pdf"
    },
    "cloro": {
      "name": "CDC · Cloro",
      "url": "https://www.cdc.gov/chemical-emergencies/chemical-fact-sheets/chlorine.html"
    },
    "xileno": {
      "name": "ATSDR · Xileno",
      "url": "https://www.atsdr.cdc.gov/es/phs/es_phs71.html"
    },
    "modeloFullface": {
      "name": "Sketchfab · Gas Mask · jespermolander3d · Referencia visual",
      "url": "https://sketchfab.com/models/212addc22db34a329ec279d3e1a29665/embed"
    },
    "modeloPulmones": {
      "name": "Sketchfab · Lung CT scan · Holoxica · Referencia anatómica",
      "url": "https://sketchfab.com/models/f7232f2e10524eacbfb8fd149d0550e0/embed"
    },
    "componentesElastomericos": {
      "name": "NIOSH · Respiradores elastoméricos · Componentes y tipos",
      "url": "https://www.cdc.gov/niosh/ppe/respirators/elastomeric.html"
    }
  },
  "readiness": [
    {
      "item": "Objetivo y cinco bloques",
      "status": "18 contenidos trazados",
      "note": "Seis micromódulos temáticos y ocho momentos de conducción; 120 minutos propuestos con duraciones propias."
    },
    {
      "item": "Temas y nombres",
      "status": "Elegidos por Carlos",
      "note": "Viaje fantástico, Addams, CSI del aire, Misión posible, Cazadores de mitos y Pit stop respiratorio."
    },
    {
      "item": "Portadas y anclas",
      "status": "Seis entradas integradas y verificadas",
      "note": "Rutas del contrato comprobadas con las portadas elegidas y la entrega del chat de interacciones."
    },
    {
      "item": "Guion, lenguaje y minutaje",
      "status": "Adaptados para revisión y ensayo",
      "note": "Los nombres están elegidos; las duraciones siguen propuestas. El texto guía participación, no lectura continua."
    },
    {
      "item": "Caso documentado",
      "status": "Candidato integrado",
      "note": "Resumen de congreso NIOSH de 1997, resultados variables; selección definitiva pendiente."
    },
    {
      "item": "Trivia en tiempo real",
      "status": "Cuenta, capacidad y ensayo pendientes",
      "note": "Banco preparado; el cuaderno local no centraliza respuestas. Usar plataforma configurada para la audiencia prevista."
    },
    {
      "item": "Pizarra colaborativa",
      "status": "Servicio y permisos pendientes",
      "note": "Plantilla fuente-control-evidencia preparada. Probar participación compartida y contingencia."
    },
    {
      "item": "Webex, pantallas y apoyo",
      "status": "Ensayo pendiente",
      "note": "Compartir solo la ventana de participantes; conservar este guion en privado."
    },
    {
      "item": "Equipo y manual de demostración",
      "status": "Disponibilidad por confirmar",
      "note": "Demostrar conforme al modelo real. El ensayo digital no realiza prueba de ajuste ni certifica competencia."
    },
    {
      "item": "Caja descargable",
      "status": "Versión de seis micromódulos recibida",
      "note": "Seis portadas, historias, videos y actividades; conservar el paquete de participantes separado de las claves privadas del facilitador."
    },
    {
      "item": "Visores externos y recorrido facial completo",
      "status": "Consulta con conexión y esquema local",
      "note": "Activar la carga de Sketchfab manualmente si se dispone de internet. El esquema y el recorrido local permiten continuar sin conexión. Ensayar el navegador de destino y mantener el plan de 120 minutos. Los rótulos identifican regiones; las válvulas se explican en un esquema conceptual. Seleccionar manualmente o pausar para la explicación."
    }
  ],
  "cues": [
    {
      "cover": [],
      "say": [
        "Bienvenidas y bienvenidos. Hoy vamos a identificar contaminantes en el aire, justificar controles y reconocer cómo seleccionar, utilizar y cuidar la protección respiratoria.",
        "Recorreremos seis mundos. Cada uno nos dejará una pregunta y una herramienta para investigar el trabajo."
      ],
      "action": "Presentar el objetivo y la ruta. Confirmar que el grupo ve la ventana de participantes.",
      "ask": "¿Qué decisión de tu trabajo te gustaría poder fundamentar mejor?",
      "answer": "Recoger una necesidad concreta relacionada con reconocer, controlar o utilizar protección.",
      "transition": "Antes del viaje, conozcamos dos ideas con las que llegamos.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "jerarquia"
      ],
      "id": "A01",
      "section": "abrir",
      "title": "Abrimos el Expediente Respira Sano",
      "minutes": 1,
      "target": "Inicio y cierre",
      "link": "index.html"
    },
    {
      "cover": [],
      "say": [
        "Vamos a responder dos preguntas breves sobre olor y protección respiratoria. Guardaremos las ideas para contrastarlas al terminar.",
        "Cada respuesta necesita un fundamento. Reconocer que falta información también es una decisión útil."
      ],
      "action": "Dos sondeos de unos 30 segundos: olor como indicador de seguridad y filtro de partículas para cualquier contaminante. Recuperar una justificación y orientar.",
      "ask": "¿El olor demuestra seguridad? ¿Un filtro de partículas resuelve cualquier contaminante?",
      "answer": "No. El olor no demuestra concentración controlada y la función del filtro depende del contaminante; no atribuir protección química a un filtro de partículas.",
      "transition": "Nuestra tarea será descubrir qué información sustenta esas decisiones.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "seleccion",
        "formal"
      ],
      "id": "A02",
      "section": "abrir",
      "title": "Dos decisiones para comenzar",
      "minutes": 2,
      "target": "Inicio y cierre",
      "link": "index.html"
    },
    {
      "cover": [],
      "say": [
        "Camila recibe una muestra con fijador; Mateo investiga un reprocesamiento; Andrés debe decidir si tiene información suficiente para seleccionar protección. Son historias simuladas, abiertas a preguntas sobre productos y condiciones reales.",
        "Viajaremos por el cuerpo, visitaremos a los Addams, investigaremos con CSI del aire, activaremos Misión posible, contrastaremos mitos y terminaremos en un pit stop respiratorio."
      ],
      "action": "Explicar cómo abrir las experiencias y escribir en el cuaderno. Reservar fuentes y ejemplos adicionales para consulta; compartir solo la ventana de participantes.",
      "ask": "¿Qué dejaremos registrado de cada mundo?",
      "answer": "La tarea o fuente, la decisión y el dato o evidencia que se necesita comprobar.",
      "transition": "Abrimos Viaje fantástico: una misión dentro de ti.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "quimicos"
      ],
      "id": "A03",
      "section": "abrir",
      "title": "Seis mundos y un mismo expediente",
      "minutes": 2,
      "target": "Inicio y cierre",
      "link": "index.html"
    },
    {
      "cover": [
        "1.2"
      ],
      "say": [
        "Camila recibe una muestra con fijador. Antes de abrir el recipiente, se pregunta qué podría liberarse al aire y qué necesita conocer sobre esa exposición. Para empezar, nos propone seguir el recorrido de una respiración.",
        "Sigamos una respiración desde la entrada hacia las vías respiratorias y los alvéolos. O₂ y CO₂ ilustran una función normal; esta vista no representa la ruta de un químico. Ojos, piel e ingestión accidental también pueden ser relevantes según la tarea."
      ],
      "action": "Reproducir el clip de unos 38 s. Usar el explorador didáctico para girar, ampliar y seleccionar entrada, tráquea y alvéolos. Si hay conexión, se puede sustituir parte de esa exploración por hasta 45 s en «Abrir modelo CT · Internet»: observar tráquea/bronquios y volver con «Acercar alvéolos didácticos». Si no carga, continuar en el explorador local; todo cabe en estos cinco minutos.",
      "ask": "¿Por qué conocer esta vía ayuda a investigar una exposición?",
      "answer": "Permite conectar una fuente con la inhalación. Las propiedades del agente y las condiciones determinan su interacción; no todos llegan igual a alvéolos o sangre.",
      "transition": "La expedición necesita reconocer qué puede acompañar al aire.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "anatomia",
        "formal",
        "modeloPulmones"
      ],
      "id": "V01",
      "section": "viaje-fantastico",
      "title": "Viaje fantástico: entrada y recorrido del aire",
      "minutes": 5,
      "target": "Viaje fantástico: una misión dentro de ti",
      "link": "recorrido.html#viaje-fantastico"
    },
    {
      "cover": [
        "1.1",
        "1.3"
      ],
      "say": [
        "Una pulverización puede producir gotas; un polvo contiene partículas sólidas y ciertos procesos generan humos. Aerosol comprende partículas sólidas o líquidas suspendidas: las categorías se relacionan.",
        "Comparemos esas formas con gases y vapores. Una tarea puede generar una mezcla; el nombre del servicio o del envase no basta para clasificar la emisión."
      ],
      "action": "Clasificar tres escenas de pulverización, polvo y humo quirúrgico; incluir explícitamente gases y vapores en la comparación.",
      "ask": "¿Qué nos permite distinguir una niebla de un vapor?",
      "answer": "La niebla contiene gotas suspendidas; vapor corresponde a fase gaseosa de una sustancia. La tarea y las propiedades orientan qué formas investigar.",
      "transition": "Identifiquemos ahora las tareas que pueden liberar esos agentes.",
      "fallback": "Numerar escenas en chat y resolver una por una.",
      "refs": [
        "laboratorio",
        "quimicos",
        "humo"
      ],
      "id": "V02",
      "section": "viaje-fantastico",
      "title": "Clasificar las formas en el aire",
      "target": "Viaje fantástico: una misión dentro de ti",
      "link": "recorrido.html#viaje-fantastico",
      "minutes": 5
    },
    {
      "cover": [
        "1.1",
        "1.2",
        "1.3"
      ],
      "say": [
        "Una fuente puede acompañar la toma, traslado, recepción y manejo de una muestra. También investigamos aperturas, conexiones, pulverización, mantenimiento, generación de humos y residuos.",
        "Relacionemos patología, reprocesamiento y limpieza con tareas concretas. En función renal, hemodinamia y biomédica confirmamos el inventario y el procedimiento; no asignamos sustancias por el nombre del área."
      ],
      "action": "Comparar tres tareas y pedir agente posible, forma en el aire, vía y personas potencialmente expuestas. Usar el atlas para transferencia, sin explorar todas las áreas en vivo.",
      "ask": "¿Qué parte de la tarea puede liberar el agente y quién puede exponerse?",
      "answer": "Aceptar hipótesis ligadas al producto y al proceso; separar lo confirmado de lo supuesto y señalar FDS o procedimiento faltantes.",
      "transition": "Cerremos el primer mundo con una decisión de reconocimiento.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "quimicos",
        "formal",
        "paa",
        "humo"
      ],
      "id": "V03",
      "section": "viaje-fantastico",
      "title": "Agente, tarea y vía: seguir la fuente",
      "minutes": 7,
      "target": "Viaje fantástico: una misión dentro de ti",
      "link": "recorrido.html#viaje-fantastico"
    },
    {
      "cover": [
        "1.1",
        "1.2",
        "1.3"
      ],
      "say": [
        "Elijamos la clasificación que evita confundir gotas con vapor o cualquier emisión con un gas.",
        "Cada persona dejará una relación entre agente, forma, vía y tarea. Camila ya reconoce el recorrido del aire; ahora se pregunta: Si el fijador libera sustancias al aire, ¿qué efectos podrían producir y de qué dependerían?"
      ],
      "action": "Usar el reactivo M11 preparado para sondeo. Revisar una justificación y registrar una pista en el cuaderno.",
      "ask": "¿Qué dato de la tarea sustentó tu clasificación?",
      "answer": "Debe relacionar el mecanismo de liberación y el producto; no clasificar únicamente por aspecto u olor.",
      "transition": "Camila ya conoce por dónde entra el aire. Ahora quiere saber qué podría ocurrir con lo que lo acompaña. Pasemos a No te hagas el loco con los gases y vapores para investigar los efectos posibles y de qué dependen.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "laboratorio",
        "quimicos"
      ],
      "id": "V04",
      "section": "viaje-fantastico",
      "title": "Primera pista del expediente",
      "minutes": 3,
      "target": "Viaje fantástico: una misión dentro de ti",
      "link": "recorrido.html#viaje-fantastico"
    },
    {
      "cover": [
        "1.2",
        "1.3"
      ],
      "say": [
        "Camila trae la pregunta del viaje: si el fijador libera sustancias al aire, ¿qué efectos podrían producir y de qué dependerían?",
        "En No te hagas el loco con los gases y vapores, la familia Addams abre una conversación sobre ficción y evidencia. La apariencia de los personajes no permite reconocer exposición ni diagnosticar efectos.",
        "Para responder, Camila necesita conocer el producto, la tarea y las condiciones. Compararemos cuándo pueden aparecer o persistir los efectos y cómo puede actuar cada agente. Todavía necesitamos caracterizar la exposición de su tarea."
      ],
      "action": "Recuperar la pregunta de Camila del cierre de Viaje. Mostrar la portada existente y reproducir el clip de unos 38 s. Relacionar apariencia, evidencia y datos que faltan sobre su tarea.",
      "ask": "¿La apariencia basta para responder a Camila? ¿Qué información necesitamos sobre el producto y su tarea?",
      "answer": "La apariencia no identifica ni descarta la exposición. Se necesita conocer el producto, la tarea y las condiciones; los efectos posibles dependen del agente y de la exposición.",
      "transition": "En este mundo separaremos el tiempo y el tipo de acción.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "formal"
      ],
      "id": "GV01",
      "section": "gases-vapores",
      "title": "Addams: abrir el mito y pedir evidencia",
      "minutes": 2,
      "target": "No te hagas el loco con los gases y vapores",
      "link": "gases-vapores.html",
      "warning": "No atribuir rasgos físicos ficticios al formaldehído ni diagnosticar por aspecto."
    },
    {
      "cover": [
        "1.2"
      ],
      "say": [
        "Preguntemos cuándo ocurre la exposición, cuándo aparecen los efectos y si persisten. Son preguntas diferentes de cómo puede actuar un agente.",
        "Irritación, posible lesión corrosiva cuando proceda, sensibilización y otros efectos no son alternativas de agudo o crónico. Las etiquetas pueden coexistir y un episodio breve puede requerir atención por sus consecuencias."
      ],
      "action": "Comparar los dos ejes del módulo y resolver la decisión GV-TIEMPO; orientar sin predecir lesión individual.",
      "ask": "¿Agudo significa necesariamente leve o reversible?",
      "answer": "No. Hay que separar patrón temporal, aparición, persistencia y mecanismo, considerando el agente y la exposición.",
      "transition": "Apliquemos esas preguntas a los ejemplos del sector salud.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "cloro",
        "formal"
      ],
      "id": "GV02",
      "section": "gases-vapores",
      "title": "Tiempo, persistencia y tipo de acción",
      "minutes": 3,
      "target": "No te hagas el loco con los gases y vapores",
      "link": "gases-vapores.html"
    },
    {
      "cover": [
        "1.2",
        "1.3"
      ],
      "say": [
        "Vamos a comparar formaldehído, glutaraldehído y formulaciones oxidantes del módulo. Cada tarjeta relaciona una tarea posible, un efecto y una fuente.",
        "Examinemos irritación, sensibilización u otros efectos que la evidencia respalda para cada agente. Cloro y xileno quedan para consulta. No todas las formulaciones ni todas las tareas producen las mismas condiciones."
      ],
      "action": "Mostrar tres tarjetas y sus fuentes. Pedir una diferencia relevante; conservar dos tarjetas adicionales para consulta posterior.",
      "ask": "¿Qué cambia al cambiar el agente, la formulación o la tarea?",
      "answer": "Cambian propiedades, formas de liberación y efectos posibles. Reconocer un peligro no calcula dosis ni predice enfermedad individual.",
      "transition": "Pasemos de la comparación a una decisión preventiva.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "formal",
        "glutaraldehido",
        "paa",
        "cloro",
        "xileno"
      ],
      "id": "GV03",
      "section": "gases-vapores",
      "title": "Comparar agentes y efectos posibles",
      "minutes": 5,
      "target": "No te hagas el loco con los gases y vapores",
      "link": "gases-vapores.html"
    },
    {
      "cover": [
        "1.2",
        "1.3"
      ],
      "say": [
        "Conocer un efecto posible ayuda a preguntar qué tarea puede liberar el agente y qué condición necesita controlarse.",
        "La tarjeta orienta una investigación. La selección de controles y respiradores requiere el escenario; la desarrollaremos en sus propios bloques."
      ],
      "action": "Resolver una de las decisiones preventivas del módulo y pedir el dato que faltaría antes de actuar.",
      "ask": "¿Qué revisarías primero en esa tarea y qué necesitas comprobar?",
      "answer": "Relacionar fuente o liberación con producto, procedimiento y condiciones. Reconocer información insuficiente es válido.",
      "transition": "Dejemos una pista para el equipo de CSI del aire.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "formal",
        "jerarquia"
      ],
      "id": "GV04",
      "section": "gases-vapores",
      "title": "Elegir una decisión preventiva",
      "minutes": 3,
      "target": "No te hagas el loco con los gases y vapores",
      "link": "gases-vapores.html"
    },
    {
      "cover": [
        "1.2",
        "1.3"
      ],
      "say": [
        "Camila ya puede distinguir preguntas sobre el tiempo y el tipo de efecto. Para valorar su tarea aún necesita identificar el producto y reunir datos de exposición. Su siguiente pregunta es: ¿qué información necesitamos para investigar esa exposición?",
        "Escribe una fuente o tarea, un efecto posible o dato faltante y una acción que deba verificarse."
      ],
      "action": "Un minuto para escribir en el cuaderno. Recuperar una respuesta y distinguir lo confirmado de lo supuesto.",
      "ask": "¿Qué dato te falta sobre el agente o la exposición que elegiste?",
      "answer": "Debe formular una pregunta verificable de tarea, producto, condiciones o evaluación; no un diagnóstico por aspecto.",
      "transition": "Camila ya sabe qué preguntar sobre los posibles efectos, pero necesita datos de la tarea y de la exposición. Llevemos esa forma de investigar al caso de Mateo: abrimos CSI del aire.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "quimicos"
      ],
      "id": "GV05",
      "section": "gases-vapores",
      "title": "Dejar la pista para CSI del aire",
      "minutes": 2,
      "target": "No te hagas el loco con los gases y vapores",
      "link": "gases-vapores.html"
    },
    {
      "cover": [
        "2.1"
      ],
      "say": [
        "Mateo termina un ciclo de reprocesamiento y se prepara para cambiar un suministro. Aunque el ciclo haya permanecido cerrado, todavía debe revisar conexiones, aperturas y manejo de residuos. Antes de continuar, se pregunta: ¿en qué momentos de esta tarea podría liberarse un agente y qué información necesito para evaluar la exposición?",
        "El clip nos deja una hipótesis. El servicio y la escena son simulados: comprobaremos producto, procedimiento y condiciones antes de concluir."
      ],
      "action": "Mostrar la portada CSI y el clip de unos 38 s. Seleccionar el caso de Mateo/Endoscopia y recoger una hipótesis inicial.",
      "ask": "¿En qué momentos de esta tarea podría liberarse un agente y qué información necesito para evaluar la exposición?",
      "answer": "En las tareas y elementos del proceso, no únicamente en el ciclo principal o el nombre del servicio.",
      "transition": "Abramos las pistas del producto y la tarea.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "quimicos",
        "paa"
      ],
      "id": "CSI01",
      "section": "csi-del-aire",
      "title": "CSI del aire: abrir el caso de Mateo",
      "minutes": 3,
      "target": "CSI del aire: sigue las pistas",
      "link": "hospital.html#csi-del-aire"
    },
    {
      "cover": [
        "2.1"
      ],
      "say": [
        "Mateo usa un desinfectante en un equipo. El primer dato no es solo 'peracético': necesitamos producto comercial, fabricante, ingredientes y uso autorizado.",
        "En la FDS buscamos composición, peligros, controles, propiedades e incompatibilidades. La ficha debe corresponder al producto. La concentración del líquido no nos da directamente la concentración del aire; faltan condiciones de la tarea y evaluación."
      ],
      "action": "Explorar pistas del escenario: producto/FDS, tarea, fuente, personas y residuos. Clasificar la información como confirmada, supuesta o pendiente.",
      "ask": "¿Podemos copiar recomendaciones entre productos por compartir ingrediente?",
      "answer": "No. Comparamos formulación, equipo, uso, compatibilidad y exposición.",
      "transition": "Ahora revisemos cuánto tiempo, qué concentración conocemos y cómo se controla el aire.",
      "fallback": "Mostrar una ficha y preguntar qué secciones consultarían.",
      "refs": [
        "fds",
        "paa"
      ],
      "id": "CSI02",
      "section": "csi-del-aire",
      "title": "Reunir producto, FDS, tarea y personas",
      "target": "CSI del aire: sigue las pistas",
      "link": "hospital.html#csi-del-aire",
      "minutes": 6
    },
    {
      "cover": [
        "2.2"
      ],
      "say": [
        "La concentración del producto no equivale a la concentración en el aire. La duración, frecuencia y condiciones de la tarea orientan la evaluación.",
        "Una rejilla puede introducir o extraer aire, y su presencia no demuestra captación eficaz. Necesitamos conocer función y desempeño del sistema y la relación entre la fuente y la persona."
      ],
      "action": "Relacionar las pistas de tiempo/concentración y ventilación. Pedir qué datos faltan y qué observación no permite concluir.",
      "ask": "¿Podemos dar por controlada la exposición porque hay una extracción instalada?",
      "answer": "No. Deben verificarse su función y desempeño y caracterizar la exposición con la estrategia adecuada.",
      "transition": "Distingamos lo que aporta una inspección de lo que necesita medición.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "fds",
        "ntp937"
      ],
      "id": "CSI03",
      "section": "csi-del-aire",
      "title": "Concentración, tiempo y ventilación",
      "minutes": 5,
      "target": "CSI del aire: sigue las pistas",
      "link": "hospital.html#csi-del-aire"
    },
    {
      "cover": [
        "2.3"
      ],
      "say": [
        "Los métodos cualitativos orientan decisiones dentro de sus límites. La NTP 936 presenta COSHH Essentials; la NTP 937 incluye procedimiento y protección colectiva. No son la misma herramienta.",
        "La inspección no mide concentración. La estrategia higiénica define agente, personas, tareas, método e interpretación. Reconocer que faltan datos es una decisión preventiva. Una simulación no reemplaza esa evaluación."
      ],
      "action": "Contrastar inspección, método cualitativo y medición. Usar M22 para discutir el alcance de observar una rejilla, sin cálculos no validados.",
      "ask": "¿FDS y rejilla visible demuestran exposición controlada?",
      "answer": "No. Son puntos de partida; hay que evaluar el escenario y la eficacia de los controles, con mediciones cuando corresponda.",
      "transition": "Completemos el expediente con lo que sabemos y lo que falta comprobar.",
      "fallback": "Responder por chat y explicar antes de avanzar.",
      "refs": [
        "ntp936",
        "ntp937"
      ],
      "id": "CSI04",
      "section": "csi-del-aire",
      "title": "Inspección, métodos y mediciones",
      "target": "CSI del aire: sigue las pistas",
      "link": "hospital.html#csi-del-aire",
      "warning": "No aplicar COSHH a todos los gases ni presentarlo como diseño de ventilación o legislación colombiana.",
      "minutes": 4
    },
    {
      "cover": [
        "2.1",
        "2.2",
        "2.3"
      ],
      "say": [
        "Nuestro expediente ya distingue información disponible, supuestos y datos faltantes.",
        "Registra una fuente, una condición de exposición y una pregunta que necesite verificación o medición. Eso orientará la propuesta de control."
      ],
      "action": "Completar la ficha o cuaderno con conocidos, supuestos, faltantes y siguiente paso. Recuperar un ejemplo.",
      "ask": "¿Qué dato cambiaría tu decisión sobre el escenario?",
      "answer": "Aceptar datos relevantes de agente, tarea, exposición, ventilación o medición, ligados a una pregunta concreta.",
      "transition": "Mateo ya reunió las primeras pistas: una fuente posible, las condiciones de la tarea y los datos que faltan. Ahora necesita convertir ese expediente en una propuesta: ¿qué cambiaríamos para evitar o reducir la liberación y cómo comprobaríamos el resultado? Entramos en Misión posible: controla la fuente.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "fds",
        "ntp937"
      ],
      "id": "CSI05",
      "section": "csi-del-aire",
      "title": "Cerrar el perfil de exposición",
      "minutes": 2,
      "target": "CSI del aire: sigue las pistas",
      "link": "hospital.html#csi-del-aire"
    },
    {
      "cover": [
        "3.1",
        "3.2"
      ],
      "say": [
        "Mateo vuelve con el expediente de la misma tarea. Su equipo debe utilizar las pistas para proponer cambios en la fuente, el ambiente y el procedimiento, y definir cómo comprobarlos. La nueva misión es decidir qué cambiar primero y qué evidencia necesitarían para valorar el resultado.",
        "Recuperemos el mismo escenario y sus datos pendientes. El equipo de operaciones actuará sobre fuente, ambiente y prácticas."
      ],
      "action": "Mostrar portada Misión posible y el clip propio de Controles de unos 38 s, dentro de estos dos minutos. Recuperar una fuente; no repetir la introducción de evaluación.",
      "ask": "¿Qué podemos cambiar y cómo comprobaríamos que la medida funciona?",
      "answer": "Una condición relacionada con la fuente y la liberación, justificada por las pistas y los datos pendientes. Proponer una comprobación pertinente del desempeño; la propuesta todavía necesita evaluación y verificación.",
      "transition": "Comparemos las medidas superiores de la jerarquía.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "jerarquia"
      ],
      "id": "MP01",
      "section": "mision-posible",
      "title": "Misión posible: recuperar la fuente",
      "minutes": 2,
      "target": "Misión posible: controla la fuente",
      "link": "hospital.html#mision-posible"
    },
    {
      "cover": [
        "3.1",
        "3.2",
        "3.4"
      ],
      "say": [
        "Primero valoramos si la operación puede eliminarse o si existe una sustitución compatible. En salud, también debemos conservar la eficacia y compatibilidad del proceso.",
        "Encerrar una operación, captar la emisión y ventilar tienen funciones diferentes. Construyamos una combinación y dejemos la protección respiratoria como última barrera dentro del conjunto que corresponda."
      ],
      "action": "Combinar medidas en el escenario y resolver M31. Justificar dónde actúa cada medida; no atribuir porcentajes a la animación.",
      "ask": "¿Sobre qué parte de la exposición actúa cada control propuesto?",
      "answer": "Relacionar fuente, trayectoria o prácticas y reconocer límites. La sustitución requiere validación del proceso y no se decide por olor.",
      "transition": "La combinación debe incluir cómo se realiza el trabajo y se previenen fugas.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "jerarquia",
        "paa",
        "renal"
      ],
      "id": "MP02",
      "section": "mision-posible",
      "title": "Combinar eliminación, sustitución y controles técnicos",
      "minutes": 5,
      "target": "Misión posible: controla la fuente",
      "link": "hospital.html#mision-posible"
    },
    {
      "cover": [
        "3.3",
        "3.4"
      ],
      "say": [
        "Diana encuentra productos distintos en el carro. Antes de abrirlos revisa identificación, incompatibilidades, dosificación y procedimiento.",
        "Hipoclorito con ácidos puede liberar cloro; con amoniaco puede generar cloraminas. No vamos a demostrar mezclas. Ante una fuga desconocida se activa el plan institucional y la respuesta autorizada. Tener un respirador no convierte a cualquiera en respondiente de emergencias."
      ],
      "action": "Plantear una conexión que pierde y pedir la primera decisión preventiva. Evitar neutralización o limpieza genéricas.",
      "ask": "¿Qué previene la liberación antes de depender de protección personal?",
      "answer": "Separación, identificación, cierres y conexiones adecuados, dosificación compatible y procedimiento conocido.",
      "transition": "Contrastemos esta propuesta con una experiencia externa que se siguió evaluando.",
      "fallback": "Leer la situación y recoger la primera acción en chat.",
      "refs": [
        "mezclas",
        "fds"
      ],
      "id": "MP03",
      "section": "mision-posible",
      "title": "Procedimientos, conexiones y fugas",
      "target": "Misión posible: controla la fuente",
      "link": "hospital.html#mision-posible",
      "minutes": 3
    },
    {
      "cover": [
        "3.2",
        "3.3",
        "2.3"
      ],
      "say": [
        "El candidato documentado es un seguimiento de cuatro evaluaciones de óxido nitroso en odontología pediátrica entre 1978 y 1996. El resumen de congreso de 1997 describe mejoras y resultados variables.",
        "Es una referencia externa, sin revisión por pares según el registro; no representa una evaluación de Colsanitas ni permite trasladar caudales o límites. Nos ayuda a preguntar qué se combinó y cómo se comprobó."
      ],
      "action": "Abrir el caso integrado y recuperar una medida y una evidencia de seguimiento. Su selección definitiva sigue para revisión conjunta.",
      "ask": "¿Qué comprobarías para saber si una mejora sigue funcionando?",
      "answer": "Desempeño de controles, prácticas y exposición mediante seguimiento pertinente; la mera presencia de un equipo no acredita control sostenido.",
      "transition": "Construyamos una propuesta breve del grupo.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "real",
        "jerarquia"
      ],
      "id": "MP04",
      "section": "mision-posible",
      "title": "Caso documentado: mejorar y volver a comprobar",
      "minutes": 2,
      "target": "Misión posible: controla la fuente",
      "link": "hospital.html#mision-posible"
    },
    {
      "cover": [
        "3.1",
        "3.2",
        "3.3",
        "3.4"
      ],
      "say": [
        "Mateo y el equipo relacionan cada tarea y fuente con un control propuesto y una evidencia para comprobarlo. Cada aporte del grupo debe conservar esa relación.",
        "Recuperaremos dos ejemplos para discutir su fundamento. Las respuestas individuales también pueden conservarse en el cuaderno."
      ],
      "action": "Con pizarra configurada: 45 s de instrucción, 90 s de aportes y 45 s de retroalimentación y puente a Andrés. La cuenta, capacidad y permisos deben haberse ensayado.",
      "ask": "¿Qué evidencia pedirías antes de dar por eficaz tu propuesta?",
      "answer": "Debe ligar la medida y su función con una comprobación pertinente; el respirador no reemplaza por sí mismo controles superiores viables.",
      "transition": "Mateo y su equipo dejan una propuesta de controles y una forma de comprobarlos. La siguiente decisión es qué protección respiratoria requiere cada tarea y cuándo faltan datos para seleccionarla. Andrés nos trae ese dilema: entramos en Cazadores de mitos.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "jerarquia"
      ],
      "id": "MP05",
      "section": "mision-posible",
      "title": "La propuesta fuente-control-evidencia",
      "minutes": 3,
      "target": "Misión posible: controla la fuente",
      "link": "hospital.html#mision-posible"
    },
    {
      "cover": [
        "4.2",
        "4.4"
      ],
      "say": [
        "Andrés debe realizar una intervención de mantenimiento. Un compañero le ofrece un N95, pero aún faltan datos sobre los contaminantes y las condiciones del lugar. Antes de aceptarlo, Andrés se pregunta: ¿este equipo corresponde al peligro de la tarea y tengo información suficiente para seleccionarlo?",
        "Abrimos Cazadores de mitos para comprobar afirmaciones sobre equipos. La decisión necesita agente, concentración, tarea y condiciones; no se resuelve por apariencia."
      ],
      "action": "Mostrar portada y clip de unos 38 s. Enumerar datos necesarios sin autorizar una entrada.",
      "ask": "¿Este equipo corresponde al peligro de la tarea y tengo información suficiente para seleccionarlo?",
      "answer": "Falta caracterizar la atmósfera y el escenario; no improvisar con un purificador.",
      "transition": "Comprobemos primero qué función cumplen filtros y cartuchos.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "seleccion",
        "programa"
      ],
      "id": "CM01",
      "section": "cazadores-de-mitos",
      "title": "Cazadores de mitos: abrir la selección",
      "minutes": 3,
      "target": "Cazadores de mitos: ¿qué protege de qué?",
      "link": "respiradores.html#cazadores-de-mitos"
    },
    {
      "cover": [
        "4.1",
        "4.2"
      ],
      "say": [
        "Andrés recibe un N95 para un agente desconocido. Antes de aceptar, revisemos la función del medio.",
        "Un filtro de partículas no elimina gases o vapores por filtrar partículas pequeñas. Los cartuchos responden a agentes específicos y condiciones de evaluación. Una combinación necesita estar aprobada y ser compatible; no se arma cualquier conjunto. Vamos a comparar funciones antes de decidir."
      ],
      "action": "Contrastar partículas, gas/vapor y mezcla y pedir que anticipen el resultado. La máscara de referencia es facial completa; su forma o el color no seleccionan el cartucho. Se puede observar con «Abrir máscara 3D · Internet» o «Esquema facial completo · Sin conexión». El N95 de la comparación es otro tipo de equipo; el modelo mostrado no se convierte en un N95. Reservar el recorrido completo para Pit stop.",
      "ask": "¿Un N95 controla formaldehído gaseoso por usarse en salud?",
      "answer": "No. Filtrar partículas no corresponde a ese agente gaseoso; se necesita selección técnica.",
      "transition": "La protección también depende del conjunto y del ajuste a quien lo usa.",
      "fallback": "Comparar tres tarjetas de medios y sus funciones.",
      "refs": [
        "filtros",
        "seleccion",
        "modeloFullface"
      ],
      "id": "CM02",
      "section": "cazadores-de-mitos",
      "title": "Qué protege de qué: filtros y cartuchos",
      "target": "Cazadores de mitos: ¿qué protege de qué?",
      "link": "respiradores.html#cazadores-de-mitos",
      "minutes": 5
    },
    {
      "cover": [
        "4.3",
        "5.4"
      ],
      "say": [
        "El aire puede evitar el medio y entrar por un espacio entre rostro y pieza facial. El filtro puede funcionar y el conjunto no proteger como se espera.",
        "Modelo, talla, estado y colocación importan. En equipos herméticos, vello en la zona de sello u otras interferencias pueden comprometerlo. No corregimos una selección inadecuada apretando cada vez más las bandas."
      ],
      "action": "Mostrar fuga conceptual. Pedir dos condiciones que comprometan el sello y cómo verificarlas.",
      "ask": "¿Mayor eficiencia del filtro resuelve una fuga por el rostro?",
      "answer": "No. Es una ruta distinta. Se requiere ajuste y uso apropiados del conjunto.",
      "transition": "Separemos ahora eficiencia, protección y duración del medio.",
      "fallback": "Señalar borde y medio en un equipo o esquema.",
      "refs": [
        "seleccion",
        "programa"
      ],
      "id": "CM03",
      "section": "cazadores-de-mitos",
      "title": "La fuga, el ajuste y la protección del conjunto",
      "target": "Cazadores de mitos: ¿qué protege de qué?",
      "link": "respiradores.html#cazadores-de-mitos",
      "minutes": 4
    },
    {
      "cover": [
        "4.3"
      ],
      "say": [
        "La eficiencia corresponde al medio en condiciones de ensayo. La protección del conjunto depende del equipo, ajuste y programa. La vida del cartucho es otra cuestión, ligada al agente y las condiciones.",
        "N95 no significa una reducción personal garantizada del 95 por ciento frente a cualquier peligro. Tampoco podemos prometer las mismas horas de servicio para todos los cartuchos y tareas."
      ],
      "action": "Clasificar tres afirmaciones en filtro, conjunto o recambio; pedir justificar.",
      "ask": "¿Qué hace falta para explicar cuánto protege un equipo?",
      "answer": "Tipo, configuración aprobada, factor aplicable, exposición, ajuste, uso y condiciones del programa.",
      "transition": "El último mito se resuelve reconociendo cuándo un purificador queda fuera del escenario.",
      "fallback": "Crear tres columnas en el tablero o usar chat.",
      "refs": [
        "logica",
        "recambio"
      ],
      "id": "CM04",
      "section": "cazadores-de-mitos",
      "title": "Tres conceptos que no son equivalentes",
      "target": "Cazadores de mitos: ¿qué protege de qué?",
      "link": "respiradores.html#cazadores-de-mitos",
      "minutes": 4
    },
    {
      "cover": [
        "4.4",
        "4.2"
      ],
      "say": [
        "Un purificador utiliza el aire del lugar; no aporta oxígeno. Atmósfera desconocida, posible deficiencia de oxígeno o peligro inmediato exigen decisiones que no se improvisan con un cartucho.",
        "Andrés reconoce que no puede entrar con la información disponible. Suspender y gestionar evaluación autorizada es prevenir. No probamos el ambiente por tolerancia personal, olor ni entradas breves."
      ],
      "action": "Resolver M42 y la comparación de atmósfera desconocida. Pedir el motivo y la gestión que corresponde antes de la intervención.",
      "ask": "¿Se puede entrar brevemente para comprobar si es tolerable?",
      "answer": "No. Se requiere evaluación y procedimiento autorizados; no improvisar purificadores.",
      "transition": "Andrés toma una primera decisión: detener una selección que todavía no puede fundamentar. Ahora se plantea otra pregunta: cuando una tarea ya está evaluada y el equipo seleccionado, ¿qué debo comprobar para utilizarlo y cuidarlo? Entramos al Pit stop respiratorio con ese nuevo supuesto de práctica.",
      "fallback": "Leer el caso y resolver primera decisión y aviso.",
      "refs": [
        "programa",
        "seleccion"
      ],
      "id": "CM05",
      "section": "cazadores-de-mitos",
      "title": "Reconocer límites y detener la selección",
      "target": "Cazadores de mitos: ¿qué protege de qué?",
      "link": "respiradores.html#cazadores-de-mitos",
      "minutes": 4
    },
    {
      "cover": [
        "5.2"
      ],
      "say": [
        "Andrés ha detenido la selección del caso anterior. Para aprender el siguiente paso, participa en un ejercicio de preparación para otra tarea ya evaluada, con un equipo seleccionado y su manual. Su reto es revisar el estado del equipo, seguir la colocación y la verificación del sello, y decidir cómo limpiarlo, guardarlo y gestionar el recambio.",
        "Revisamos pieza facial, bandas, válvulas, conexiones y medios conforme al modelo. Una fisura, pieza faltante o conexión incompatible requiere gestionar la resolución antes de usarlo.",
        "El recorrido sirve para observar regiones de una pieza facial completa. La comprobación real del equipo y del sello corresponde al modelo seleccionado y sus instrucciones."
      ],
      "action": "Mostrar portada Pit stop y clip de unos 38 s. Pulsar «Explorar máscara facial completa →» y «Mostrar rótulos». Usar los nombres de la leyenda: «Visor», «Cuerpo», «Filtros o cartuchos y conexiones» y «Anclajes». Para explicar y recoger respuestas, seleccionar cada región manualmente o pausar el recorrido: el avance automático dura seis segundos por región. Relacionar cada nombre con su pregunta de inspección. Abrir «Válvulas · detalle conceptual», comparar «Inhalación» y «Exhalación» y usar «Cerrar detalle y volver al modelo»; ese esquema no identifica las membranas internas del modelo artístico. «Ocultar rótulos» permite recuperar la vista despejada. Usar «Volver al Pit stop →» para revisar componentes y defectos, y pasar a PS02: colocación y verificación del sello según el equipo y su manual. Esta secuencia sustituye exploración libre dentro de estos cinco minutos; no añade tiempo ni realiza una comprobación real del sello.",
      "ask": "Cuando la tarea está evaluada y el equipo seleccionado, ¿qué debo comprobar antes, durante y después de usarlo?",
      "answer": "Antes: selección fundamentada, instrucciones, inspección, colocación y sello. Durante: reconocer anomalías y actuar según el procedimiento. Después: limpieza, almacenamiento y recambio conforme al equipo y al programa. Este ejercicio es otro supuesto; no autoriza la intervención del caso anterior.",
      "transition": "Con el equipo revisado, ordenemos la colocación y la comprobación del sello.",
      "fallback": "Nombrar componentes sobre el esquema compartido.",
      "refs": [
        "programa",
        "modeloFullface",
        "componentesElastomericos"
      ],
      "id": "PS01",
      "section": "pit-stop-respiratorio",
      "title": "Pit stop: inspección del equipo",
      "target": "Pit stop respiratorio: revisa, ajusta y cuida",
      "link": "respiradores.html#pit-stop-respiratorio",
      "minutes": 5
    },
    {
      "cover": [
        "5.1",
        "5.4"
      ],
      "say": [
        "Prueba de ajuste y verificación de sello tienen propósitos distintos. La primera evalúa con un protocolo la adaptación de un modelo al usuario; el sello se verifica en cada colocación según instrucciones.",
        "Ordenemos una secuencia conceptual: inspeccionar, colocar conforme al fabricante, ajustar y verificar el sello antes de exponerse. La HTML no realiza una prueba real ni certifica competencia práctica."
      ],
      "action": "Ordenar los pasos, revisar los supuestos de sello y decidir no usar en la tarea si falla. Demostración conforme al modelo y manual reales; no realizar una prueba de ajuste simulada.",
      "ask": "¿Una prueba de ajuste permite omitir la verificación de sello?",
      "answer": "No. Son actividades diferentes; el sello se verifica en cada colocación.",
      "transition": "El pit stop continúa con limpieza, guarda y criterios de recambio.",
      "fallback": "Clasificar dos frases como prueba de ajuste o verificación de sello.",
      "refs": [
        "seleccion",
        "programa"
      ],
      "id": "PS02",
      "section": "pit-stop-respiratorio",
      "title": "Preparar, colocar y verificar el sello",
      "target": "Pit stop respiratorio: revisa, ajusta y cuida",
      "link": "respiradores.html#pit-stop-respiratorio",
      "minutes": 6
    },
    {
      "cover": [
        "5.3"
      ],
      "say": [
        "Primero distinguimos los componentes y sus instrucciones. La limpieza permitida para una pieza reutilizable no se traslada automáticamente a filtros o cartuchos.",
        "El almacenamiento protege de daño y contaminación según fabricante. El recambio necesita criterios sustentados en agente y condiciones; el olor no es un reloj universal."
      ],
      "action": "Resolver las cinco decisiones de cuidado y M52. Conservar la respuesta en el cuaderno y relacionarla con el manual o programa de recambio.",
      "ask": "¿Qué necesitas definir para limpiar, guardar y cambiar el componente?",
      "answer": "Instrucciones específicas, condiciones de uso y programa sustentado; no lavar filtros ni asignar un mismo tiempo para todos los casos.",
      "transition": "Expliquemos la secuencia y qué hacer cuando aparece una anomalía.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "programa",
        "recambio"
      ],
      "id": "PS03",
      "section": "pit-stop-respiratorio",
      "title": "Cuidado por componente y recambio",
      "minutes": 5,
      "target": "Pit stop respiratorio: revisa, ajusta y cuida",
      "link": "respiradores.html#pit-stop-respiratorio"
    },
    {
      "cover": [
        "5.1",
        "5.2",
        "5.3",
        "5.4"
      ],
      "say": [
        "Una persona explica su revisión antes, durante y después del uso. La capacitación debe permitir comprender el peligro, practicar y reconocer condiciones que impiden continuar.",
        "La HTML apoya decisiones conceptuales. La práctica, la prueba de ajuste cuando corresponda y su verificación requieren el equipo y el programa real."
      ],
      "action": "Recoger una explicación breve y corregir un error. Registrar una habilidad por practicar y cómo se gestiona una anomalía según el procedimiento.",
      "ask": "¿Qué harías si el equipo presenta un defecto o no logras el sello?",
      "answer": "No utilizarlo en la tarea; gestionar la revisión y resolución según el procedimiento. No entrar a probar si funciona.",
      "transition": "Andrés deja una secuencia para preparar, revisar y cuidar el equipo, y reconoce las condiciones que impiden usarlo. Ahora reunamos las preguntas de Camila, los controles propuestos por Mateo y las decisiones de Andrés para resolver una tarea diferente. Cerremos el expediente Respira Sano.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "programa",
        "seleccion"
      ],
      "id": "PS04",
      "section": "pit-stop-respiratorio",
      "title": "Explicar, capacitar y reportar anomalías",
      "minutes": 4,
      "target": "Pit stop respiratorio: revisa, ajusta y cuida",
      "link": "respiradores.html#pit-stop-respiratorio"
    },
    {
      "cover": [
        "1.3",
        "2.1",
        "3.4",
        "4.2",
        "5.2"
      ],
      "say": [
        "En una tarea distinta, relaciona lo que puede liberarse, el control que propones y lo que debes comprobar sobre protección y uso.",
        "Tu respuesta debe reconocer los datos que faltan. Así aplicamos la ruta del expediente a otra situación."
      ],
      "action": "Completar las tres decisiones de transferencia con un escenario ya disponible. Recoger un fundamento breve.",
      "ask": "¿Qué se libera, qué controlarías y qué comprobarías antes de utilizar el equipo?",
      "answer": "Relacionar agente/tarea, controles y revisión de protección; aceptar una decisión de detenerse por datos insuficientes.",
      "transition": "Comparemos nuestra explicación con las ideas iniciales.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "jerarquia",
        "seleccion"
      ],
      "id": "F01",
      "section": "cerrar",
      "title": "Última misión: una decisión completa",
      "minutes": 2,
      "target": "Inicio y cierre",
      "link": "herramientas/index.html"
    },
    {
      "cover": [],
      "say": [
        "Volvamos al olor y al filtro para partículas. ¿Qué dato añadiríamos ahora para fundamentar la decisión?",
        "Recuperemos una explicación del grupo y aclaremos la confusión más relevante."
      ],
      "action": "Contrastar respuestas con el diagnóstico sin atribuir mejora individual si no hay vinculación de respuestas.",
      "ask": "¿Qué cambió en tu fundamento?",
      "answer": "Debe mencionar datos del agente/tarea o condiciones y límites; el resultado del juego no mide reducción de exposición.",
      "transition": "Llevemos una acción concreta al trabajo.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "seleccion"
      ],
      "id": "F02",
      "section": "cerrar",
      "title": "Volver a las ideas de entrada",
      "minutes": 1,
      "target": "Inicio y cierre",
      "link": "herramientas/index.html"
    },
    {
      "cover": [],
      "say": [
        "Completa una frase: antes de mi próxima tarea voy a comprobar…",
        "Elige una acción concreta de identificar, controlar o verificar el uso."
      ],
      "action": "Dar unos segundos para escribir un compromiso y recuperar un ejemplo.",
      "ask": "¿Qué dato o condición comprobarás primero?",
      "answer": "Aceptar una acción específica y verificable, no una promesa general de cuidado.",
      "transition": "Conserva esa acción con las herramientas.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "jerarquia"
      ],
      "id": "F03",
      "section": "cerrar",
      "title": "Una acción para la próxima tarea",
      "minutes": 1,
      "target": "Inicio y cierre",
      "link": "herramientas/lista-chequeo.html"
    },
    {
      "cover": [],
      "say": [
        "La caja permite repetir los seis recorridos temáticos y conservar las observaciones. Descarga tu cuaderno y consulta la infografía y la lista de chequeo.",
        "Las dudas de la tarea deben llegar al responsable del proceso y a SST con información del producto y las condiciones. Gracias por investigar y decidir con fundamento."
      ],
      "action": "Indicar el paquete vigente y la forma de descarga previamente comprobada. Mantener el teleprompter privado.",
      "ask": "¿Dónde conservarás la observación para darle seguimiento?",
      "answer": "En el registro y canal definidos por la institución, con datos de tarea y acción pendiente.",
      "transition": "Cerramos Respira Sano. La siguiente misión empieza en la tarea real.",
      "fallback": "Guiar la misma decisión en pantalla y recoger una respuesta por chat. Registrar la contingencia; no presentarla como trivia o pizarra compartida configurada.",
      "refs": [
        "jerarquia"
      ],
      "id": "F04",
      "section": "cerrar",
      "title": "Conservar la caja y cerrar el expediente",
      "minutes": 1,
      "target": "Inicio y cierre",
      "link": "herramientas/index.html",
      "warning": "No presentar el taller como competencia práctica certificada ni como reducción medida de exposición."
    }
  ],
  "timingStatus": "Propuesta de trabajo, incluye participación y videos; ensayo y aceptación final pendientes.",
  "narrativeRevision": {
    "source": "work/AJUSTE_NARRATIVO_MATEO_ANDRES_20261018.json",
    "authorizedBy": "Carlos",
    "characters": [
      "Camila",
      "Mateo",
      "Andrés"
    ],
    "timingChanged": false,
    "technicalScopeChanged": false,
    "sources": [
      "work/AJUSTE_NARRATIVO_CAMILA_20261018.json",
      "work/AJUSTE_NARRATIVO_MATEO_ANDRES_20261018.json"
    ],
    "visualReferenceSource": "work/AJUSTE_MODELO_FULL_FACE_20261018.json",
    "componentLabelsSource": "work/ROTULOS_FULL_FACE_20261018.json"
  }
};
