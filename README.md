# Respira Sano

Herramienta interactiva en HTML para la capacitación sobre prevención de la exposición por inhalación a sustancias químicas en el sector salud. Reúne seis misiones, recursos audiovisuales, modelos didácticos, actividades y caja de herramientas.

## Estado del avance

Instantánea del 1 de noviembre de 2026. Aplicación principal: **RG01 + MF01 + VD04 + LC01 + FV02-original + CM01 + RM02 + RM03**. Incluye 390 archivos de la copia actual y sus medios, sin sustituirlos por el ZIP 17.

Pit stop utiliza como principal el video original de cara completa, por la indicación posterior de Carlos de conservarlo sin modificaciones. La edición FV01 permanece disponible como alternativa. Los cambios de encuadre EC01 y los pulmones detallados PM01 de M2 se conservan por separado en `propuestas/M2-EC01-PM01`; todavía no forman parte de la aplicación principal.

La aplicación continúa en revisión. La navegación permanece abierta para probar módulos. Las fichas pedagógicas proponen reorganizaciones que no deben confundirse con funciones ya implementadas. Los tiempos principales de 120 minutos más 60 de ampliación son de diseño, pendientes de ensayo completo y aceptación del cliente.

## Descargar con todos los videos

Los videos y WAV se almacenan mediante Git LFS. Instalar Git y Git LFS y ejecutar:

```bash
git clone https://github.com/Carloscorredors/respira-sano.git
cd respira-sano
git lfs pull
python tools/verificar_copia.py
```

El repositorio es privado: se requiere acceso a la cuenta o al repositorio. Si se utiliza una descarga ZIP que no incluya los objetos LFS, faltarán los videos reales; preferir la clonación anterior y verificar el manifiesto. No publicar credenciales en archivos ni en enlaces.

## Probar la aplicación

```bash
python tools/serve_local_media.py --port 8780 --directory respira-sano-interactiva
```

Abrir `http://localhost:8780/index.html`. No requiere Node ni instalación de dependencias de la aplicación. El servidor es local y admite solicitudes de rangos para los videos. También existe el uso por apertura de `index.html`; las pruebas completas del protocolo `file://` siguen pendientes en el equipo de uso.

## Estructura

- `respira-sano-interactiva/`: copia completa de la aplicación principal y recursos.
- `documentacion/`: informes editables, fichas de módulos, observaciones, investigación, estado y manifiesto de conservación.
- `propuestas/`: avances provisionales separados de la aplicación principal.
- `materiales-complementarios/`: recursos de apoyo y materiales anteriores conservados; no sustituyen la aplicación principal.
- `tools/`: servidor local y comprobación de integridad.

La consulta de CT3D, la máscara externa de Sketchfab y las fuentes enlazadas requieren internet. Se conservan las alternativas locales disponibles. Los modelos y escenas son didácticos; no acreditan selección de un respirador, medición de exposición, aptitud del equipo ni prueba de ajuste real.

## Continuidad y alcance

El modelo M1.2, Audio01, sincronización, doce estructuras, controles y CT se conservan. Se mantienen notas y progreso; no restablecerlos para preparar capturas. Antes de modificar recursos, revisar `documentacion/ESTADO_DEL_AVANCE.json`, el inventario y el manifiesto. Una nueva copia debe respetar las instrucciones humanas más recientes.

Este repositorio guarda el avance técnico. No equivale a un sitio publicado, a la entrega final para participantes ni a la aceptación del cliente. No se añadió una licencia de redistribución: los materiales de terceros conservan sus avisos y créditos.
