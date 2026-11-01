# Paleta Keralty en Respira Sano

Solicitud de Carlos: usar la gama de Keralty / Sanitas Colombia en el diseño.
Aplicación: 18 de octubre de 2026, exclusivamente en respira-sano-interactiva/.
Se conserva el trabajo del otro chat en presentacion-facilitador/.

## Fuente y transcripción

Manual de Identidad Corporativa Keralty, versión 02, 27-02-2018,
sección 3.6, página impresa 17 (índice PDF 16), publicado por Colsanitas:
https://portal.colsanitas.com/funcionarios/documents/10183/2367019/Manual_Keralty_V3.pdf

Los HEX se convierten directamente desde los RGB del manual, sin usar una
conversión Pantone externa. Es la edición pública consultada, no una afirmación
de que no existan actualizaciones internas posteriores.

|Referencia|RGB|HEX|
|---|---|---|
|287 C, azul corporativo|0, 47, 135|#002F87|
|288 C, azul profundo|0, 46, 88|#002E58|
|307 C|0, 113, 163|#0071A3|
|285 C|0, 113, 206|#0071CE|
|279 C|62, 142, 222|#3E8EDE|
|306 C|0, 180, 227|#00B4E3|
|339 C|0, 178, 136|#00B288|
|3258 C|73, 195, 177|#49C3B1|
|376 C|140, 198, 63|#8CC63F|
|362 C|78, 157, 45|#4E9D2D|
|400 C|220, 213, 203|#DCD5CB|
|Blanco|255, 255, 255|#FFFFFF|

## Aplicación

Azul corporativo en títulos, navegación y botones; azul profundo en el visor;
cian, verde y turquesa como acentos. Fondos y bordes claros son tintas de los
azules para evitar superficies oscuras en textos largos. No se usa blanco sobre
cian o verde en textos pequeños. El estado seleccionado usa azul profundo sobre
turquesa, con aria-pressed y textos para no depender solo del color.

El modelo anatómico conserva tejidos rosados, sangre roja/azul y los indicadores
distintos de O2/CO2. Los agentes conservan sus colores y leyendas. Las alertas
conservan su diferencia semántica. La ilustración decorativa de inicio sí adopta
azules y turquesa de marca. No se dibujaron ni alteraron logotipos.

Tokens: respira-sano-interactiva/assets/brand-tokens.css.
Aplicador idempotente: work/apply_keralty_brand.py; se llama también al final de
work/build_experiences.py para que una regeneración conserve el diseño.

La caja original caja-respira-sano/ no se modifica; su copia integrada en
respira-sano-interactiva/herramientas/ sí recibe los colores.

Verificación y capturas: work/qa-marca-keralty/.
