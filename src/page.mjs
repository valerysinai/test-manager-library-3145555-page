import {createElement as h} from 'react';

const repository='https://github.com/valerysinai/test-manager-library-3145555-';
const documentation=repository+'docs';
const arrow=h('span',{'aria-hidden':true},' ↗');
const link=(href,text,className)=>h('a',{href,className},text,arrow);
const eyebrow=text=>h('p',{className:'eyebrow'},text);

function Brand(){return h('a',{href:'#inicio',className:'brand','aria-label':'Manager Library, inicio'},
  h('span',{className:'brand-mark','aria-hidden':true},'m',h('span',null,'l')),
  h('span',null,'manager',h('strong',null,'library')));
}
function Header(){return h('header',{className:'site-header shell'},h(Brand),
  h('nav',{'aria-label':'Navegación principal'},
    h('a',{href:'#sistema'},'El sistema'),h('a',{href:'#recorrido'},'Cómo funciona'),h('a',{href:'#proyecto'},'El proyecto')),
  link(documentation,'Documentación','header-link'));
}
function Hero(){return h('section',{id:'inicio',className:'hero shell','aria-labelledby':'hero-title'},
  h('div',{className:'hero-copy'},eyebrow('MENOS ENREDOS. MÁS LECTURAS.'),
    h('h1',{id:'hero-title'},'Cada préstamo,',h('br'),' en su ',h('em',null,'lugar.')),
    h('p',{className:'intro'},'El catálogo, los socios y los préstamos de tu biblioteca pequeña, en un mismo sistema. Para que el equipo se ocupe de lo que importa: acercar los libros a las personas.'),
    h('div',{className:'hero-actions'},h('a',{href:'#sistema',className:'button'},'Conocer el sistema',h('span',{'aria-hidden':true},' ↓')),link(documentation,'Explorar la documentación','text-link')),
    h('p',{className:'access-note'},h('span',{'aria-hidden':true},'● '),'La gestión está reservada al personal autorizado.')),
  h('figure',{className:'hero-art'},h('img',{src:'./library.svg',width:560,height:500,alt:'',decoding:'async'}),h('figcaption',null,'UN ESPACIO PARA CADA HISTORIA')));
}
const capabilities=[
  ['01','Un catálogo en orden','Consulta libros por título, autor o categoría. El personal autorizado mantiene los ejemplares y sus portadas opcionales.','Novela · Ciencia · Tecnología · Historia · Infantil'],
  ['02','Préstamos con seguimiento','Registra socios, presta libros y devuelve cada línea por separado. Consulta los préstamos abiertos, cerrados y vencidos.','14 días de plazo · Hasta 3 libros sin devolver'],
  ['03','Lecturas que dejan huella','El administrador consulta qué libros se prestaron más en un rango de fechas, conservando los datos del momento del préstamo.','Reporte agregado · Sin desglose por socio'],
];
function Capabilities(){return h('section',{id:'sistema',className:'capabilities shell','aria-labelledby':'system-title'},
  h('div',{className:'section-heading'},h('div',null,eyebrow('LO ESENCIAL, BIEN ORGANIZADO'),h('h2',{id:'system-title'},'De la estantería',h('br'),' a la próxima lectura.')),h('p',null,'Una herramienta para el día a día de una biblioteca pequeña. Cada función tiene un propósito claro.')),
  h('div',{className:'capability-grid'},...capabilities.map(([number,title,description,note])=>h('article',{key:number,className:'capability'},h('span',{className:'number','aria-hidden':true},number),h('h3',null,title),h('p',null,description),h('p',{className:'card-note'},note)))));
}
function Journey(){return h('section',{id:'recorrido',className:'journey','aria-labelledby':'journey-title'},h('div',{className:'shell'},
  h('div',{className:'section-heading'},h('div',null,eyebrow('UN CICLO SENCILLO'),h('h2',{id:'journey-title'},'Prestar. Leer. Devolver.')),h('p',null,'El personal registra cada movimiento. El sistema mantiene la disponibilidad y calcula el estado del préstamo.')),
  h('ol',{className:'journey-steps'},
    h('li',null,h('span',{className:'step-number','aria-hidden':true},'1'),h('h3',null,'Encuentra el libro'),h('p',null,'Busca en el catálogo y consulta los ejemplares disponibles.')),
    h('li',null,h('span',{className:'step-number','aria-hidden':true},'2'),h('h3',null,'Registra el préstamo'),h('p',null,'Selecciona al socio y de uno a tres libros distintos, respetando su límite total.')),
    h('li',null,h('span',{className:'step-number','aria-hidden':true},'3'),h('h3',null,'Recibe la devolución'),h('p',null,'Devuelve cada libro por separado para que su ejemplar vuelva a estar disponible.'))),
  h('p',{className:'journey-note'},'Si un socio tiene un libro vencido, debe devolverlo antes de recibir otro préstamo.')));
}
function Roles(){return h('section',{className:'roles shell','aria-labelledby':'roles-title'},h('div',{className:'roles-intro'},eyebrow('CADA PERSONA, SU PAPEL'),h('h2',{id:'roles-title'},'Un equipo conectado.',h('br'),' Accesos definidos.'),h('p',null,'Los socios son las personas que reciben los libros: no necesitan ni tienen una cuenta de acceso.')),
  h('div',{className:'role-list'},h('article',null,h('span',{className:'role-label'},'ADMINISTRADOR'),h('h3',null,'Organiza y consulta'),h('p',null,'Mantiene el catálogo, registra socios, da de alta bibliotecarios y consulta los reportes.')),
    h('article',null,h('span',{className:'role-label'},'BIBLIOTECARIO'),h('h3',null,'Acompaña cada préstamo'),h('p',null,'Consulta catálogo, socios y vencidos; registra socios, préstamos y devoluciones.'))));
}
function Project(){return h('section',{id:'proyecto',className:'project shell','aria-labelledby':'project-title'},h('div',null,eyebrow('EL PROYECTO'),h('h2',{id:'project-title'},'Una especificación.',h('br'),' Seis piezas que encajan.'),h('p',null,'Manager Library se construye con desarrollo guiado por especificación (SDD): leer los requisitos, justificar las decisiones y verificar el resultado.'),link(documentation,'Leer la especificación','text-link')),
  h('ul',{className:'repository-list'},...[
    ['docs','Especificación','Requisitos y decisiones'],['api','API','Reglas de negocio · Laravel'],['app','Aplicación','Interfaz de gestión · React'],['page','Presentación','Este sitio público estático'],['infra','Infraestructura','Contenedores y persistencia'],['tool','Utilidades','Demostración y medición por API'],
  ].map(([name,label,description])=>h('li',{key:name},h('a',{href:repository+name},h('span',null,label,h('small',null,description)),h('span',{'aria-hidden':true},'↗'))))));
}
export function Page(){return h('html',{lang:'es'},
  h('head',null,h('meta',{charSet:'utf-8'}),h('meta',{name:'viewport',content:'width=device-width, initial-scale=1'}),
    h('meta',{name:'description',content:'Manager Library: catálogo, socios y préstamos para bibliotecas pequeñas. Conoce el sistema, los roles y el proyecto.'}),
    h('meta',{name:'theme-color',content:'#f6f4ec'}),
    h('meta',{httpEquiv:'Content-Security-Policy',content:"default-src 'none'; style-src 'self'; img-src 'self'; font-src 'self'; base-uri 'none'; form-action 'none'; connect-src 'none'; script-src 'none'"}),
    h('title',null,'Manager Library · Cada préstamo, en su lugar'),h('link',{rel:'icon',href:'./favicon.svg',type:'image/svg+xml'}),h('link',{rel:'stylesheet',href:'./styles.css'})),
  h('body',null,h('a',{className:'skip-link',href:'#contenido'},'Saltar al contenido'),h(Header),h('main',{id:'contenido',tabIndex:-1},h(Hero),h(Capabilities),h(Journey),h(Roles),h(Project)),
    h('footer',{className:'site-footer shell'},h(Brand),h('p',null,'Un lugar para los libros.',h('br'),'Más tiempo para las personas.'),h('p',{className:'footer-note'},'Presentación pública · Ficha ADSO 3145555',h('br'),'La operación se realiza en la aplicación de gestión.'))));}
