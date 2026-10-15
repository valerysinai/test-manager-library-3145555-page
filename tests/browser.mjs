import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {once} from 'node:events';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {createStaticServer} from '../scripts/serve.mjs';

const server=createStaticServer(undefined,'/library/');let browser;let stage='startup';
const artifacts=new URL('../artifacts/',import.meta.url);mkdirSync(artifacts,{recursive:true});
const summary={screens:[],javascript_disabled:true,api_requests:0,external_requests:0,console_errors:0,keyboard:false,text_contrast:false,subpath:true,passed:false};
try{
  server.listen(0,'127.0.0.1');await once(server,'listening');const base=`http://127.0.0.1:${server.address().port}`;
  browser=await chromium.launch({headless:true,args:['--disable-background-networking']});
  for(const width of [320,390,768,1440]){
    stage='viewport-'+width;const context=await browser.newContext({javaScriptEnabled:false,serviceWorkers:'block',viewport:{width,height:width===1440?1000:844},reducedMotion:'reduce'});
    const page=await context.newPage();const problems=[];
    await context.route('**/*',async route=>{const request=route.request(),url=new URL(request.url());if(url.origin!==base){summary.external_requests++;problems.push('external');await route.abort();return;}if(url.pathname.includes('/api/')||['fetch','xhr','websocket'].includes(request.resourceType())){summary.api_requests++;problems.push('api');await route.abort();return;}await route.continue();});
    page.on('pageerror',()=>{summary.console_errors++;problems.push('page-error');});page.on('console',message=>{if(message.type()==='error'){summary.console_errors++;problems.push('console-error');}});
    const response=await page.goto(base+'/library/',{waitUntil:'networkidle'});assert.equal(response.status(),200);assert.equal(await page.locator('html').getAttribute('lang'),'es');
    assert.equal(await page.locator('h1').count(),1);assert.equal(await page.getByRole('main').count(),1);assert.equal(await page.getByRole('navigation',{name:'Navegación principal'}).count(),1);
    assert.equal(await page.locator('script,form,iframe,input,button').count(),0);
    assert.equal(await page.locator('img').evaluateAll(images=>images.every(image=>image.complete&&image.naturalWidth>0)),true);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    const contrastPassed=await page.evaluate(()=>{
      const rgb=color=>(color.match(/[\d.]+/g)||[]).slice(0,3).map(Number);
      const luminance=color=>rgb(color).map(n=>{const s=n/255;return s<=.04045?s/12.92:((s+.055)/1.055)**2.4;}).reduce((sum,n,i)=>sum+n*[.2126,.7152,.0722][i],0);
      return [...document.querySelectorAll('h1,h2,h3,p,em,figcaption,.role-label,nav a,.button,.text-link')].every(element=>{
        const style=getComputedStyle(element);if(style.display==='none')return true;let parent=element,background;
        while(parent){const value=getComputedStyle(parent).backgroundColor;if(value!=='rgba(0, 0, 0, 0)'&&value!=='transparent'){background=value;break;}parent=parent.parentElement;}
        const fg=luminance(style.color),bg=luminance(background||'rgb(255,255,255)');const ratio=(Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05);
        const large=parseFloat(style.fontSize)>=24||(parseFloat(style.fontSize)>=18.66&&parseInt(style.fontWeight,10)>=700);return ratio>=(large?3:4.5);
      });
    });assert.equal(contrastPassed,true);summary.text_contrast=true;
    for(const id of ['sistema','recorrido','proyecto']){
      await page.getByRole('navigation').locator(`a[href="#${id}"]`).click();assert.equal(new URL(page.url()).hash,'#'+id);assert.equal(await page.locator('#'+id).isVisible(),true);
    }
    const anchors=await page.locator('a').evaluateAll(items=>items.map(a=>({href:a.getAttribute('href'),text:a.textContent.trim(),width:a.getBoundingClientRect().width,height:a.getBoundingClientRect().height,display:getComputedStyle(a).display})));
    assert.ok(anchors.every(a=>a.text.length>0&&a.href));
    assert.ok(anchors.filter(a=>a.display!=='none').every(a=>a.width>0&&a.height>0));
    await page.goto(base+'/library/',{waitUntil:'networkidle'});await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.textContent),'Saltar al contenido');
    assert.equal(await page.locator('.skip-link').evaluate(element=>element.getBoundingClientRect().top>=0),true);
    const outline=await page.locator('.skip-link').evaluate(element=>({style:getComputedStyle(element).outlineStyle,width:parseFloat(getComputedStyle(element).outlineWidth)}));assert.notEqual(outline.style,'none');assert.ok(outline.width>=2);
    await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'contenido');summary.keyboard=true;
    await page.goto(base+'/library/',{waitUntil:'networkidle'});
    if(width===390||width===1440){const name=width===390?'mobile':'desktop';await page.screenshot({path:fileURLToPath(new URL(name+'.png',artifacts)),fullPage:true,animations:'disabled'});await page.screenshot({path:fileURLToPath(new URL(name+'-viewport.png',artifacts)),animations:'disabled'});}
    assert.equal(problems.length,0);summary.screens.push({width,height:width===1440?1000:844,horizontal_overflow:false});await context.close();
  }
  stage='javascript-enabled';const context=await browser.newContext();const page=await context.newPage();await page.goto(base+'/library/');assert.match(await page.title(),/Manager Library/);assert.equal(await page.locator('script').count(),0);await context.close();
  summary.passed=true;writeFileSync(new URL('browser-summary.json',artifacts),JSON.stringify(summary,null,2)+'\n');console.log('T-23 real browser checks passed: no API, no external requests, no JavaScript required; four viewport widths and keyboard navigation.');
}catch{console.error('T-23 browser verification failed at '+stage);process.exitCode=1;}
finally{await browser?.close();server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
