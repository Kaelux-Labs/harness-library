# Enviar un harness

**Se aceptan nuevas propuestas.** Buscamos configuraciones prácticas y reutilizables para agentes, incluidas pequeñas carpetas de habilidades. Harneloop es opcional.

La vía más sencilla no requiere un fork ni una pull request:

1. [Abre el formulario de envío de GitHub](https://github.com/Ker102/harness-library/issues/new?template=submit-harness.yml). Comparte el repositorio, el nombre y la tarea/categoría.
2. Explica la instalación, la distribución específica, la versión/licencia y las conexiones manuales. Los detalles adicionales de composición y las pruebas de funcionamiento son opcionales.
3. Los mantenedores revisan tu issue, solicitan allí los datos que falten si es necesario y publican las entradas aprobadas. Los cambios posteriores pueden enviarse mediante otra issue o PR.

Solo necesitas una cuenta de GitHub para usar el formulario. La [guía del sitio web](https://ker102.github.io/harness-library/submit/) explica el mismo proceso.

Para una PR, copia `docs/listing.example.json` en `data/listings/your-slug.json`. Usa el mismo slug en minúsculas en el nombre del archivo y en `id`. Ejecuta `python scripts/catalog.py validate` y las pruebas descritas en el README.

Información obligatoria:

- Nombre, resumen breve, categoría, repositorio de origen, licencia y versión o revisión fijada.
- URL de distribución específica, qué contiene y si el repositorio de origen también contiene material irrelevante. Usa un paquete descargable o una rama dedicada al harness para repositorios mixtos; no obligues a los usuarios a clonar un gran proyecto ajeno a su propósito.
- Instrucciones de instalación claras y ordenadas. Indica el directorio de trabajo, los requisitos previos, la integración con el agente/cliente y cómo empezar. Enlaza la orientación específica del cliente cuando el mecanismo de descubrimiento difiera.
- Conexiones/configuración manuales, MCPs o herramientas obligatorios, credenciales si las hay y notas adicionales. Usa listas vacías cuando no haya requisitos. Nunca envíes secretos.

Opcional: recuentos de habilidades/referencias/archivos, recuento de herramientas MCP de nivel superior, herramientas de ejecución, composición detallada y una atribución «Built with Harneloop» con pruebas. Distingue las herramientas opcionales de las obligatorias y las herramientas de despacho de nivel superior de las operaciones posteriores.

Categorías permitidas: Creative, 3D & Blender, Coding, Research, Data, Operations, Other. Propón una nueva categoría en la issue si ninguna encaja.

No añadas campos de revisión o impulso a tu ficha ni modifiques los registros de los mantenedores. Los mantenedores controlan `data/reviews.json` y `data/boosts.json`. La atribución de origen y las afirmaciones sobre pruebas requieren evidencia; un paquete publicado por sí solo no demuestra que funcione correctamente. Los mantenedores inspeccionan instrucciones, alcance del código fuente, licencias, URLs y artefactos declarados; los scripts enviados nunca se ejecutan automáticamente.

Mantén los cambios centrados en su propósito. Las actualizaciones de paquetes de origen o pasos de instalación deben incluir la versión y lo que cambió. Los informes de instalaciones que no funcionan pueden enviarse mediante una issue normal.
