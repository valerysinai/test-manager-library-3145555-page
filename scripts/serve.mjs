import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const files=new Map([['','index.html'],['index.html','index.html'],['styles.css','styles.css'],['library.svg','library.svg'],['favicon.svg','favicon.svg']]);
const types={html:'text/html; charset=utf-8',css:'text/css; charset=utf-8',svg:'image/svg+xml'};
export function createStaticServer(directory=join(root,'dist'),prefix='/'){
  return createServer(async(req,res)=>{
    res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Cache-Control','no-store');
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'}).end();return;}
    let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
    const name=pathname.startsWith(prefix)?files.get(pathname.slice(prefix.length)):undefined;
    if(!name){res.writeHead(404).end();return;}
    try{const bytes=await readFile(join(directory,name));res.writeHead(200,{'Content-Type':types[name.split('.').at(-1)],'Content-Length':bytes.length});res.end(req.method==='HEAD'?undefined:bytes);}catch{res.writeHead(404).end();}
  });
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const port=Number(process.env.PORT||4174);createStaticServer().listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
}
