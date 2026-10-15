# Plan previo · T-23

Base `main`: `88e36574dfa65e4cbae8d06320b17feac1c7a1d8`.
Rama: `feature/page-library`. Este documento se publica antes de la primera línea de implementación.
Docs revisado: `8e62f0f349ddb8b0f3d6b3a79d33242dcfcee973`.

## Lectura e interpretación

Fuentes: README de page/docs; auditoría documental, adaptación React/Laravel, revisión SDD;
constitution artículos IX, XI, XII; spec §1/§2 y HU-03 a HU-10;
tasks T-23 y arquitectura panorámica en las dos versiones equivalentes.

T-23 exige un sitio público estático de presentación que abra sin la API y sea correcto en móvil
y escritorio. No tiene dependencia de otra tarea. No es el catálogo público ni la aplicación de
operación. El socio no inicia sesión. Se conservan alcance, entidades y contratos; las diferencias
de pluralidad ya reportadas no se renombran. La documentación técnica no modifica el producto.

## Decisiones antes de implementar

- React genera HTML estático durante la construcción, con CSS y una ilustración vectorial local.
  Esto satisface React sin exigir servidor PHP, API, autenticación ni JavaScript en el navegador.
  Laravel continúa siendo el backend en api; no se añade otro backend.
- Contenido en español: propósito para bibliotecas pequeñas, catálogo/socios/préstamos/devoluciones,
  vencidos y reporte agregado. Diferenciar admin, bibliotecario y socio; conservar 14 días, máximo
  tres libros sin devolver y reporte solo admin. No ofrecer reservas, pagos, renovaciones ni avisos.
- Navegación interna por anclas y enlaces explícitos a documentación/repositorios del fork.
  Sin botones de login falsos, dominio de aplicación inventado, formularios ni datos personales.
- Diseño adaptable con tipografía del sistema, recursos propios, HTML semántico, enlace de salto,
  foco visible y respeto por reducción de movimiento. Sin analítica, fuentes remotas ni solicitudes API.
- Salida `dist/` servible por cualquier alojamiento estático, incluso bajo subruta. Generación con
  dependencias exactas y lockfile; previsualización local con servidor de archivos, sin reescribir API.

## Escenarios de aceptación preparados

| Requisito | Verificación prevista |
|---|---|
| Sin API | Chromium real en contenedor sin red externa, servidor solo de archivos; rechazar solicitudes API/exteriores, fetch/XHR/WebSocket y errores de consola |
| Estático | Abrir con JavaScript desactivado; mismo contenido, enlaces y navegación por anclas; recursos relativos bajo subruta |
| Móvil/escritorio | Capturas 390×844 y 1440×1000; revisar también 320 y 768 px, sin desbordamiento horizontal ni controles recortados |
| Semántica y teclado | Un h1, landmarks y títulos coherentes; salto al contenido, enlaces alcanzables y foco visible |
| Contraste y texto | Revisar colores de texto, contenido y capturas; no presentar la comprobación como auditoría integral de accesibilidad |
| Alcance | Contrastar textos con spec y roles; ninguna función operacional ni cambio a otro repositorio |
| Artículo IX | Escaneo de todos los archivos versionados y pruebas del detector; no secretos ni configuración privada en assets/logs |
| Evidencia | Guardar comandos, revisiones, resultados reales y límites; distinguir análisis, implementación y verificación ejecutada |

Los commits serán pequeños y el PR en inglés, como solicitó la usuaria. No se publica en un servicio
de hosting ni se fusiona el PR; se entrega el cambio en el fork para revisión. El corte original de
las 11:00 a. m. se conserva: estos avances posteriores no alteran elegibilidad ni certifican la feria.
