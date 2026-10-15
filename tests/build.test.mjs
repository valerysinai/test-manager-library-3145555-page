import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,readFileSync,readdirSync,unlinkSync,rmdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {once} from 'node:events';
import {build} from '../scripts/build.mjs';
import {createStaticServer} from '../scripts/serve.mjs';

test('build produces a complete static document without browser scripts or external resource dependencies',t=>{
  const dir=mkdtempSync(join(tmpdir(),'library-page-'));
  t.after(()=>{for(const file of readdirSync(dir))unlinkSync(join(dir,file));rmdirSync(dir);});
  build(dir);const html=readFileSync(join(dir,'index.html'),'utf8');
  assert.match(html,/^<!doctype html>/);assert.match(html,/<html lang="es">/);
  assert.equal((html.match(/<h1\b/g)||[]).length,1);assert.equal((html.match(/<main\b/g)||[]).length,1);
  assert.doesNotMatch(html,/<script\b|<iframe\b|<form\b|\son\w+=/i);
  assert.match(html,/connect-src &#x27;none&#x27;/);assert.match(html,/script-src &#x27;none&#x27;/);
  for(const [,url] of html.matchAll(/(?:src|href)="([^"]+)"/g)){
    if(url.startsWith('#'))assert.ok(html.includes(`id="${url.slice(1)}"`));
    else if(url.startsWith('./'))assert.ok(readdirSync(dir).includes(url.slice(2)));
    else assert.match(url,/^https:\/\/github\.com\/valerysinai\/test-manager-library-3145555-(docs|api|app|page|infra|tool)$/);
  }
  const css=readFileSync(join(dir,'styles.css'),'utf8');assert.doesNotMatch(css,/@import|url\s*\(/i);
});
test('static server supports subpaths and cannot accidentally answer API or traversal requests with HTML',async t=>{
  const server=createStaticServer(undefined,'/library/');server.listen(0,'127.0.0.1');await once(server,'listening');
  t.after(()=>new Promise(resolve=>{server.closeAllConnections();server.close(resolve);}));
  const base=`http://127.0.0.1:${server.address().port}`;
  assert.equal((await fetch(base+'/library/')).status,200);
  assert.match((await fetch(base+'/library/styles.css')).headers.get('content-type'),/^text\/css/);
  assert.equal((await fetch(base+'/library/library.svg',{method:'HEAD'})).status,200);
  for(const path of ['/api/v1/books','/library/../package.json','/library/%2e%2e%2fpackage.json','/library/missing'])assert.equal((await fetch(base+path)).status,404);
  assert.equal((await fetch(base+'/library/',{method:'POST'})).status,405);
});
