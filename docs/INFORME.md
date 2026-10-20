# Informe de renovación del portafolio

**Pablo Gallego Carmona | 20 de octubre de 2026**

## Resultado

Proyecto independiente de Next.js con dos versiones visuales, en español e inglés. La raíz utiliza la versión editorial. No se ha modificado el repositorio ni la publicación del portafolio original durante esta renovación.

| Versión               | Propósito                                            | Tratamiento visual                                                                                                                             |
| --------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Clásica refactorizada | Conservar la identidad del original y mejorar su uso | Portada oscura con el vídeo original opcional, blanco y negro, fotografía en biografía, tarjetas de experiencia y formación sobre fondo oscuro |
| Editorial             | Propuesta alternativa más personal y tipográfica     | Blancos, grises y grafito, degradados suaves, retrato monocromo, composición asimétrica y trayectoria en lista editorial                       |

No se afirma que la versión clásica sea idéntica píxel a píxel: conserva el concepto y reconstruye los componentes.

## Contenido conservado

- Se conservan las 7 experiencias y los 22 cursos por idioma. Las fechas de fin de MENSOFT (2013) y T-SYSTEMS (2023) se actualizan según confirmación de Pablo; se guarda solo el año, sin inventar mes ni día.
- Se mantienen funciones, clientes, tecnologías, fechas originales y biografía completa. La biografía extensa se despliega para facilitar la lectura.
- Se mantienen email, teléfono, WhatsApp, LinkedIn, GitHub, ubicación, enlace de apoyo, fotografía, vídeo y PDF del CV.
- La imagen de retrato se optimiza a WebP (164 KB frente a aproximadamente 695 KB del JPG original). El fondo pasa a WebP (228 KB frente a aproximadamente 9,5 MB del JPG original). Son tamaños de archivo, no métricas de carga medidas en navegador.
- Los logotipos originales de DatoCMS no estaban disponibles. No se presentan marcas reconstruidas como si fueran originales; se usan iniciales y elementos tipográficos.
- El contenido es el histórico del portafolio. No se añaden clientes, proyectos, testimonios, métricas de negocio ni niveles porcentuales inventados.

## Refactorización técnica

- Migración de Gatsby 4 a Next.js 16.4.2, React 19.3.1 y TypeScript.
- App Router con exportación estática: no necesita servidor de aplicación, base de datos ni token de DatoCMS.
- Componentes de cabecera, portada, biografía, experiencia, formación y contacto; renderizado seguro de texto enriquecido sin HTML arbitrario.
- Datos, interfaz, formatos de fechas y reglas de búsqueda separados de la presentación.
- Estilos compartidos con tokens y dos variantes visuales; breakpoints explícitos de 320 a 1600 px y comportamiento de impresión.
- React sin MUI, styled-components, carrusel antiguo, Formik, Yup, EmailJS ni SDK de Google Maps.
- Rutas estáticas para cada idioma y diseño; metadatos, Open Graph, favicon y enlaces sociales.
- Dependencias fijadas y package-lock.json; Node 22; workflow de validación y artefacto estático en GitHub Actions.

## Fallos corregidos o tratados

| Problema detectado                                                                     | Solución                                                                                                                  |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| DatoCMS eliminado impedía construir la web                                             | Todos los datos y medios necesarios se sirven desde el proyecto                                                           |
| Listas srcSet utilizadas como una URL                                                  | Recursos locales con rutas individuales; no se consulta el CDN perdido                                                    |
| Uso de alturas y pie fijos que podían ocultar contenido                                | Flujo normal del documento y rejillas que se reorganizan                                                                  |
| Datos de fin no indicados se interpretaban como empleo actual                          | Se muestra «fin no indicado», sin afirmar que sigue siendo el puesto actual                                               |
| Fechas de fin confirmadas por el usuario                                               | MENSOFT: 2013. T-SYSTEMS: 2023. Sin mes ni día inventados; las advertencias anteriores ya no aparecen en estos registros. |
| Fechas de cursos día-mes-año                                                           | Conversión explícita y orden numérico, sin depender del parser regional                                                   |
| Curso con texto duplicado                                                              | Presentación de la descripción una sola vez; fuente intacta                                                               |
| Envío del formulario cerraba antes de confirmar resultado y mezclaba nombres de campos | Se sustituye por enlaces reales de email, teléfono y WhatsApp. No hay envío simulado                                      |
| Claves y SDK externos incrustados                                                      | Eliminados del nuevo proyecto; mapa mediante enlace externo                                                               |
| Listas sin claves y registros de depuración                                            | Claves estables y eliminación de logs con información de formularios                                                      |
| Navegación y controles basados en iconos sin contexto                                  | Textos, etiquetas accesibles, menú móvil y estados visibles                                                               |

## Interacciones

- Cambio entre los dos diseños y entre español e inglés.
- Menú móvil con estado accesible y cierre al seleccionar una sección.
- Filtros frontend/backend en la experiencia.
- Diálogo nativo para explorar funciones y clientes; cierre con Escape, foco inicial, devolución del foco y navegación entre etapas.
- Búsqueda de cursos sin distinción de mayúsculas ni tildes, categorías, orden temporal y estado sin resultados.
- Lista inicial resumida con opción de mostrar todos los cursos.
- Barra discreta de progreso de lectura.
- Contacto directo, copia del email con confirmación y error controlado, descarga del CV y ubicación externa.
- El vídeo original solo se carga si el visitante decide activarlo. Se respeta la preferencia de movimiento reducido.

## Verificación

- Compilación estática de producción: superada.
- TypeScript estricto: superado.
- 9 pruebas de reglas de búsqueda, fechas, duplicados, categorías y conservación de contenido: superadas.
- 4 pruebas de exportación: una por cada combinación de diseño e idioma. Comprueban un h1, idioma del documento, secciones, empresas, medios locales y ausencia de DatoCMS o URLs de localhost.
- Comprobación adicional de anclas, IDs duplicados y archivos de imagen: superada.
- Auditoría npm de dependencias de producción: 0 vulnerabilidades conocidas en la ejecución del 20/10/2026. Esto no equivale a una auditoría de seguridad completa.
- Formato de código con Prettier y workflow reproducible incluidos.

**Límite de verificación:** en este entorno no se ha ejecutado QA interactiva ni capturas de las páginas en un navegador. El diseño responsive y la accesibilidad se han revisado en el código y mediante comprobaciones estáticas; falta validarlos visualmente en móvil y escritorio. No se atribuyen puntuaciones Lighthouse ni cumplimiento WCAG certificado.

## Entrega y mantenimiento

El proyecto se conserva en https://github.com/Galleguras/pgc-portfolio-next, con código, recursos locales y workflow de comprobación. La copia publicada de Sites conserva su acceso privado.\n\nSe entrega también un ZIP del código, sin node_modules ni archivos de compilación. El repositorio original se mantiene independiente.\n\n### Archivos que editar

| Cambio                        | Ubicación                  |
| ----------------------------- | -------------------------- |
| Experiencia                   | src/data/trabajos.json     |
| Formación                     | src/data/formacion.json    |
| Biografía original            | src/data/es.json y en.json |
| Contacto y tecnologías        | src/lib/content.ts         |
| Textos de interfaz            | src/lib/copy.ts            |
| Estilos                       | src/app/globals.css        |
| Fotografía, fondo, vídeo y CV | public/media/              |

### Comandos

```sh
npm ci
npm test
npm run build
npm run typecheck
npm run verify:export
npm run format:check
```

`npm run dev` inicia el desarrollo. `npm start` sirve la exportación local de `out/` tras compilar.

### Antes de convertirlo en portafolio principal

1. Confirmar el puesto actual y revisar si es necesario actualizar el contenido del PDF del CV. Las fechas de fin de MENSOFT y T-SYSTEMS ya están confirmadas.
2. Elegir el diseño preferido y hacer la revisión visual en dispositivos reales.
3. Sustituir las iniciales por logotipos originales si se dispone de los archivos y derechos necesarios.
4. Configurar el dominio final y NEXT_PUBLIC_SITE_URL.
5. Publicar desde el nuevo repositorio. La configuración Firebase incluida no vincula ni sobrescribe el proyecto anterior.

## Fuentes

- Repositorio original: https://github.com/Galleguras/miportafolio
- Commit de referencia: `8e26ed5a343f57a9482375bad0c77639157caf5c`.
- Next.js, documentación oficial de exportación estática: https://nextjs.org/docs/app/guides/static-exports

## Corrección confirmada por Pablo (20/10/2026)

- MENSOFT: fin en 2013.
- T-SYSTEMS: fin en 2023.
- Se retira la referencia de año de la presentación de la biografía y del enlace y nombre de descarga del CV.
- Se conserva el contenido del PDF del CV. No se presenta como una edición actualizada.

## Evolución visual solicitada (20/10/2026)

La versión editorial adopta una paleta gris minimalista. Se añaden degradados suaves, cabecera translúcida fija, transiciones de entrada al desplazarse, reflejos discretos en tarjetas, microinteracciones y apertura animada de los detalles. Se respetan las preferencias de movimiento reducido y hay mejoras progresivas para navegadores sin las funciones CSS más recientes. La versión clásica se conserva. La barra de lectura ya no provoca renderizados de toda la página al desplazarse.
\n## Fondo abstracto y conexiones\n\nSiete figuras SVG ligeras: órbita, cinta, esfera, constelación conectada, red neuronal por capas, malla ondulada y núcleo de comunicaciones. Presentan desplazamientos ascendentes, descendentes y diagonales a distintas velocidades, con giros suaves y señales que recorren las conexiones. Se reduce su presencia en móvil y se detienen las animaciones al solicitar movimiento reducido.\n