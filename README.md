# test-manager-library-3145555-page

> **Prueba técnica · Ficha ADSO 3145555**
> Horario: **miércoles 14 de octubre de 2026, de 6:50 a. m. a 11:00 a. m.** (hora Colombia). Entrega a las **11:00 a. m.**

Este repositorio es el **sitio público estático** de presentación de *Manager Library*; no habla con la API. **Empieza vacío a propósito**: se construye en el fork de cada aprendiz.

## Instrucciones

Cada aprendiz debe **crear el fork** de los seis repositorios del proyecto y **resolver el proyecto
con el spec planteado**.

1. Hacer fork, a su cuenta de GitHub, de cada repositorio de la tabla del final.
2. Leer el spec en [`test-manager-library-3145555-docs`](https://github.com/code-sena/test-manager-library-3145555-docs).
   Se entrega en dos versiones: `spec-python/` y `spec-.net/`.
3. Desarrollar en los forks.

## El reto se desarrolla con React y PHP (Laravel)

El spec está escrito para Python y para .NET, pero el reto **no** se hace en esos lenguajes:

| Capa | Tecnología del reto |
|---|---|
| Frontend | React |
| Backend | PHP con Laravel |

Lo que el spec define sobre el negocio —historias, criterios de aceptación, reglas, contrato de la
API, modelo de datos— se respeta. Lo que define sobre la tecnología se traduce a React y Laravel.

## La prueba no consiste en escribir el código

El propósito principal es ver la **capacidad de desempeño con SDD** (*Spec-Driven Development*,
desarrollo guiado por especificación): cómo se lee, se interpreta y se aplica una especificación
para llevarla a un stack distinto. El código es el medio, no el fin.

## Entrega

Cuenta lo que quede **subido a los forks antes de las 11:00 a. m.** Lo que llegue después no se revisa.
No hay prórroga: suban avances parciales con commits pequeños durante la prueba.

## Implementación de T-23

El [plan SDD previo](evidence/t-23-plan.md) delimita los requisitos y escenarios antes del código.
La página presenta Manager Library en español y conserva las funciones, roles y reglas del spec.
La [evidencia de T-23](evidence/t-23.md) distingue construcción, pruebas de navegador y revisión visual.

React 19.2.9 genera HTML durante la construcción mediante
[`renderToStaticMarkup`](https://react.dev/reference/react-dom/server/renderToStaticMarkup).
El navegador recibe únicamente HTML, CSS y dos SVG propios. No necesita JavaScript, API, Laravel,
base de datos, credenciales, fuentes remotas ni servicios de terceros para mostrar el contenido.
Laravel sigue siendo el backend del sistema en el repositorio `api`.

### Construcción y vista previa

Requiere Node.js 22–26 y npm. Las versiones exactas y su resolución están en `package-lock.json`.

```sh
npm ci --ignore-scripts
npm run build
npm test
npm run preview
```

La vista previa abre en `http://127.0.0.1:4174`; `PORT` permite elegir otro puerto. Ese servidor
solo entrega los cuatro archivos generados: no implementa rutas de negocio ni reemplaza la API.
Para detenerlo, usa Ctrl+C. La entrega publicable es el contenido de `dist/`, que puede servirse
desde la raíz o una subruta de cualquier alojamiento estático. Los assets usan rutas relativas.
Este PR guarda el sitio en el fork; no realiza una publicación en un servicio de hosting.

### Verificación de independencia, móvil y escritorio

```sh
docker build -f tests/Dockerfile -t library-page-check .
```

En PowerShell:

```powershell
New-Item -ItemType Directory -Path artifacts -Force | Out-Null
$pageArtifacts = Join-Path (Get-Location).Path 'artifacts'
docker run --rm --network none --mount "type=bind,source=$pageArtifacts,target=/work/artifacts" library-page-check
```

En Linux/macOS:

```sh
mkdir -p artifacts
docker run --rm --network none --mount "type=bind,source=$PWD/artifacts,target=/work/artifacts" library-page-check
```

La imagen de Chromium está fijada por digest y el contenedor de prueba no tiene red externa.
Sirve únicamente los archivos construidos bajo `/library/`, con JavaScript desactivado. Comprueba
320, 390, 768 y 1440 px, imágenes cargadas, enlaces por ancla, teclado, foco, contraste de texto,
ausencia de desbordamiento, errores de consola y solicitudes API/exteriores. Guarda capturas y
`browser-summary.json` en `artifacts/`. No instala confianza de certificados ni altera otros repositorios.
También comprueba que habilitar JavaScript no sea necesario para presentar la página.

Los dos controles de construcción/servidor y los cinco del detector de secretos se reproducen con:

```sh
npm test
python scripts/check_secrets.py
python -m unittest discover -s scripts -p test_check_secrets.py
```

En algunos equipos el ejecutable es `python3`. El escaneo revisa todos los archivos versionados,
incluidos pruebas, documentación y lockfile, sin imprimir los valores encontrados. CI ejecuta
estos controles y la prueba real de navegador, y conserva sus capturas aunque falle una comprobación.
El control de contraste/foco no se presenta como una auditoría integral de accesibilidad.

La presentación no ofrece operaciones, cuentas de socios, reservas, pagos ni renovaciones.
Los enlaces de documentación y repositorios llevan al fork y requieren conectividad al abrirlos;
no son dependencias de renderizado de esta página. Se mantiene el corte original de entrega:
los avances posteriores no cambian elegibilidad ni acreditan una demostración manual en feria.

## Mapa de repositorios

| Repositorio | Qué va ahí |
|---|---|
| [`test-manager-library-3145555-docs`](https://github.com/code-sena/test-manager-library-3145555-docs) | El spec: `spec-python/` y `spec-.net/` |
| [`test-manager-library-3145555-api`](https://github.com/code-sena/test-manager-library-3145555-api) | Backend en PHP (Laravel) |
| [`test-manager-library-3145555-app`](https://github.com/code-sena/test-manager-library-3145555-app) | Frontend en React |
| [`test-manager-library-3145555-page`](https://github.com/code-sena/test-manager-library-3145555-page) | Sitio público estático de presentación |
| [`test-manager-library-3145555-infra`](https://github.com/code-sena/test-manager-library-3145555-infra) | Contenedores, red, volúmenes y motor de base de datos vacío |
| [`test-manager-library-3145555-tool`](https://github.com/code-sena/test-manager-library-3145555-tool) | Utilidades: sembrador de datos de demostración |
