# Respira Sano — seis introducciones con audio

Versión candidata para revisión, creada el 18 de octubre de 2026. Abrir `index.html` para reproducir los seis clips, activar o desactivar subtítulos y leer su narración exacta.

## Entrega

| Micromódulo | Duración |
| --- | ---: |
| Viaje fantástico: una misión dentro de ti | 38,86 s |
| No te hagas el loco con los gases y vapores | 38,86 s |
| CSI del aire: sigue las pistas | 38,90 s |
| Misión posible: controla la fuente | 39,56 s |
| Cazadores de mitos: ¿qué protege de qué? | 39,46 s |
| Pit stop respiratorio: revisa, ajusta y cuida | 41,60 s |

Cada carpeta contiene MP4 con voz y subtítulos seleccionables integrados, VTT/SRT externos, narración WAV, transcripción exacta, póster y fuentes de las cuatro escenas. `manifest.json` identifica los textos narrados, tiempos reales, recursos y huellas de archivos. Las locuciones son sintéticas: Microsoft Sabina, español de México, generadas localmente sin compras ni consumo de créditos. No se imitó la voz de una persona. Sin música.

## Mejoras realizadas

Los cuatro videos silenciosos sirvieron de base narrativa. Se separaron evaluación/controles y selección/uso para obtener seis introducciones acordes con la ficha actual de micromódulos. Se conserva la paleta Keralty, se reduce el texto simultáneo a ideas clave, se incorporan diagramas grandes y se reserva espacio inferior para subtítulos. Cada escena plantea una pregunta o una acción que continúa en la actividad. Se conservan los casos simulados y los límites del material.

Los fragmentos de voz mantienen su velocidad nativa. Se ajustó cada escena a la duración de su locución y se añadieron pausas. Los subtítulos se sincronizan con las duraciones efectivamente sintetizadas de cada frase; no se estiman solamente contando palabras. No se realizó alineación fonética palabra por palabra.

Los seis clips son introducciones. No constituyen cobertura audiovisual íntegra de los puntos del temario ni sustituyen actividades, práctica con el respirador o prueba de ajuste. La agenda total permanece en 120 minutos y conserva sus decisiones pendientes. No se modificaron los HTML, los videos originales ni los ZIP existentes. Estos candidatos todavía no se integraron en el sitio del participante.

## Verificación completada y límites reales

Se verificaron los seis MP4: H.264, 1280 × 720, 25 fps, audio AAC mono y subtítulos `mov_text`. Todos se decodificaron completos sin errores. La diferencia entre duración de audio y video es de 0 a 0,02 s. El volumen integrado quedó entre −18,01 y −18,34 LUFS; los picos verdaderos entre −1,94 y −1,99 dBTP. La voz fuente es de 16 kHz; el AAC se entrega a 48 kHz, lo cual no agrega detalle acústico al sintetizador original.

Se revisaron visualmente las 24 escenas mediante seis hojas de contacto, con texto principal y gráficos sin cortes. La comparación de 48 cuadros decodificados —inicio y final de cada escena— confirmó su correspondencia con la escena prevista. Los tres MP4 originales con huellas disponibles coinciden con la QA anterior.

Evidencia: `qa-tecnica.json`, `qa-layout.json`, `qa-escenas-decodificadas.json`, las seis hojas `qa-contacto.png` y los cuadros de `fuentes/`.

**Pendiente:** comprobación funcional del índice en navegador, reproducción con CC y vista móvil. La solicitud de ejecutar Edge fuera del entorno restringido no se completó y fue abortada; no existe un resultado aprobado de esa prueba. El archivo `work/verify_audiovisual_index.cjs` queda preparado para retomarla. La inspección estática del índice no sustituye esta comprobación.

**Pendiente:** escucha humana de la voz para valorar naturalidad, pronunciación y ritmo, y aceptación pedagógica del conjunto. Las mediciones de audio y la decodificación no equivalen a una escucha perceptual. No se afirma aprobación final ni publicación.

## Fuentes y reproducción del trabajo

Alcance: `work/ALCANCE_DIDACTICO_RESPIRA_SANO.md`; seis temas: `work/NARRATIVA_SEIS_MICROMODULOS.json`; identidad: `work/IDENTIDAD_KERALTY.md`; guiones y recursos previos de `work/pilot-cuerpo-aire/` y `work/clips-restantes/`.

Fuentes técnicas primarias revisadas durante la coordinación:

- [NHLBI: sistema respiratorio](https://www.nhlbi.nih.gov/es/salud/pulmones/sistema-respiratorio).
- [NIOSH: selección y uso de respiradores](https://www.cdc.gov/niosh/ppe/respirators/selection.html).
- [NIOSH: jerarquía de controles](https://www.cdc.gov/niosh/hierarchy-of-controls/about/index.html).

Estas fuentes sustentan anatomía, selección/uso y jerarquía preventiva. No se presentan como legislación colombiana.

Scripts guardados en `work/`: `prepare_audiovisual.py`, `synthesize_audiovisual.ps1`, `render_audiovisual.cjs`, `assemble_audiovisual.py` y `qa_audiovisual_frames.py`. El sintetizador utiliza Windows WinRT; el render utiliza Playwright/Edge y el ensamblaje FFmpeg. Regenerar los archivos reemplaza los candidatos dentro de esta carpeta: conservar una copia si se hacen cambios editoriales manuales.

El encargo persistente está en `work/ENCARGO_AGENTE_AUDIOVISUAL.json`. Es una ficha de continuidad, no un agente funcionando en segundo plano ni una automatización.
