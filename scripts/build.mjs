import {mkdirSync,writeFileSync,copyFileSync} from 'node:fs';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Page} from '../src/page.mjs';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
export function build(output=join(root,'dist')){
  mkdirSync(output,{recursive:true});
  writeFileSync(join(output,'index.html'),'<!doctype html>\n'+renderToStaticMarkup(createElement(Page))+'\n');
  for(const file of ['styles.css','library.svg','favicon.svg'])copyFileSync(join(root,'src',file),join(output,file));
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){build();console.log('Static React page generated in dist/.');}
