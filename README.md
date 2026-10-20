# PGC Portfolio Next

Dos interpretaciones del portafolio de **Pablo Gallego Carmona**, en una única base de código con **Next.js 16, React 19 y TypeScript**. Contenido local, exportación estática y sin CMS externo.

## Rutas

| Diseño    | Español          | English          |
| --------- | ---------------- | ---------------- |
| Editorial | `/es/editorial/` | `/en/editorial/` |
| Clásico   | `/es/clasico/`   | `/en/clasico/`   |

La raíz `/` muestra la versión editorial en español.

- **Clásico:** mantiene el concepto del original: portada audiovisual oscura, biografía con fotografía, tecnologías, experiencias y formación. Reconstrucción técnica, no copia píxel a píxel.
- **Editorial:** nuevo diseño con tipografía protagonista, composición asimétrica, tonos grises, degradados suaves y superficies claras.
- Ambos ofrecen navegación móvil, cambio de idioma y diseño, detalles de experiencias con diálogo nativo, búsqueda y filtros de cursos, orden cronológico, enlaces de contacto y descarga del CV.

Repositorio: https://github.com/Galleguras/pgc-portfolio-next\n\nEl diseño editorial incluye siete figuras abstractas de líneas y redes neuronales, señales animadas y trayectorias diagonales con distintas velocidades al hacer scroll. Se respeta la preferencia de reducir movimiento.\n\n## Ejecutar

Requiere Node.js 22.18 o posterior y npm.

```sh
npm ci
npm run dev
```

Visita `http://localhost:3000`.

## Comprobar y compilar

```sh
npm test
npm run build
npm run typecheck
npm run verify:export
```

`out/` contiene el sitio estático que puede servirse en Firebase Hosting, Netlify, Vercel o un servidor estático. `npm start` permite servir la carpeta generada en local. `next start` no sirve una exportación estática; para producción usa el contenido de `out/`. Se incluye `firebase.json` sin asociar el proyecto antiguo, para evitar reemplazarlo por accidente. El workflow de GitHub valida y adjunta `out/` como artefacto; no publica automáticamente sobre la web actual.

## Editar contenido

- `src/data/trabajos.json`: 7 experiencias en español e inglés, funciones, clientes y tecnologías completos.
- `src/data/formacion.json`: 22 cursos por idioma.
- `src/data/es.json` y `en.json`: textos originales preservados, incluida la biografía.
- `src/lib/content.ts`: datos de contacto y enlaces.
- `src/lib/copy.ts`: interfaz de las dos versiones.
- `src/app/globals.css`: tokens y estilos responsive de ambos diseños.
- `public/media/`: fotografía optimizada, fondo, vídeo y CV original.

## Contacto y privacidad

Email, teléfono, WhatsApp, LinkedIn, GitHub, ubicación y enlace de apoyo proceden del portafolio original. No hay formularios que simulen enviar mensajes: el contacto usa email, teléfono o WhatsApp. No se envían mensajes automáticamente. No se incluyen tokens de DatoCMS, Google Maps ni EmailJS; el mapa se abre mediante un enlace y no carga seguimiento de Google al visitar la página.

## Datos pendientes de confirmar

Fechas confirmadas por Pablo: MENSOFT finalizó en 2013 y T-SYSTEMS en 2023. Se representan solo los años porque no se ha confirmado el día ni el mes. La descarga del CV y la presentación de la biografía no muestran la etiqueta de año. El PDF del CV mantiene su contenido original; no se ha sustituido por un documento actualizado. Los logotipos perdidos de DatoCMS no se han recuperado ni recreado como si fueran originales.

## Diseño y accesibilidad

HTML semántico, un h1 por página, navegación por anclas, labels, estados de filtros, aria-live para resultados, foco visible, diálogo nativo con cierre por Escape, restauración de foco, tamaños táctiles y soporte de movimiento reducido. CSS contempla 320, 360, 680, 900, 1180 y 1600 px. Las pruebas automatizadas y revisión de CSS no equivalen a una auditoría completa de accesibilidad o a QA visual en dispositivos reales.

## Procedencia

Información y recursos conservados desde `https://github.com/Galleguras/miportafolio`, rama `master`, consultada el 20/10/2026. Los textos de presentación nuevos son editoriales, sin proyectos, clientes o resultados inventados. No se añaden porcentajes de dominio ni métricas de negocio.

Consulta `docs/INFORME.md` para el informe completo de cambios y verificación.
