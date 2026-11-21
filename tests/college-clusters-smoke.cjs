/* One-page Ambassador Program: only current store-backed clusters are listed and available to submit. */
const assert=require('node:assert/strict'),fs=require('node:fs'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(p,'utf8');
const dom=new JSDOM(read('index.html'),{url:'https://gft-rewards-store-ambassadors.vercel.app/',runScripts:'outside-only',pretendToBeVisual:true});
const {window}=dom,d=window.document;
window.eval(read('college-clusters-data.js'));
const catalog=window.GFT_COLLEGE_PLAN;
assert.equal(catalog.clusters.length,11);assert.equal(catalog.stores.length,23);
assert.match(d.querySelector('h1').textContent,/Own your territory.*Grow rewards/);
assert(!read('index.html').includes('href="./college-clusters.html"'),'Navigation must remain on one page');
assert.match(read('college-clusters.html'),/location.replace\('\.\/#territories'\)/);
window.GFTLocale={getLocale:()=>window.document.documentElement.lang==='es'?'es':'en',refresh:()=>{}};
window.eval(read('app.js'));
const codes=[...d.querySelectorAll('#territory option')].map(o=>o.value).filter(Boolean);
assert.equal(codes.length,11);assert.equal(new Set(codes).size,11);
assert.equal(codes.filter(x=>x.startsWith('FL-')).length,9);
assert.equal(codes.filter(x=>x.startsWith('MA-')).length,1);
assert.equal(codes.filter(x=>x.startsWith('NY-')).length,1);
assert(!codes.includes('FL-01'));assert(!codes.includes('NY-20'));
assert.equal(d.querySelectorAll('.current-territory-card').length,11);
assert.equal(d.querySelectorAll('.current-territory-card .current-stores li').length,23);
assert(!d.querySelector('#territory-map'),'Legacy speculative city map must be removed');
const select=d.getElementById('territory');
select.value='MA-50';select.dispatchEvent(new window.Event('change',{bubbles:true}));
assert.equal(d.getElementById('state').value,'MA');
assert.match(read('index.html'),/not just students/);
assert.match(read('index.html'),/account-specific loyalty/);
const click=el=>el.dispatchEvent(new window.MouseEvent('click',{bubbles:true}));
click(d.querySelector('[data-territory-state="NY"]'));
assert.equal(d.querySelectorAll('.current-territory-card').length,1);
assert.match(d.querySelector('.current-territory-card h3').textContent,/Brooklyn|Canarsie/);
assert.match(read('i18n.js'),/Todos los territorios actuales/);

// Active compensation must be $25 per approved signup, 1¢ ongoing, and unchanged $500 bonus.
const site=read('index.html'),translations=read('i18n.js'),legacyCopy=read('college-clusters.js');
const comp=d.querySelector('#compensation');
assert.equal(comp.querySelectorAll('.comp-card').length,3);
assert.deepEqual([...comp.querySelectorAll('.comp-value')].map(x=>x.textContent),['$25','1¢','$500']);
assert.match(comp.textContent,/\$0\.01 for each verified, eligible reward redemption/);
assert.match(comp.textContent,/\$500 bonus/);
assert(!site.includes('$1 per unique first-promotion redemption'));
assert(!site.includes('2¢'));
assert(!site.includes('$0.02'));
assert(!site.includes('$1 per verified'));
assert(!translations.includes('2¢'));
assert(!translations.includes('$0.02'));
assert(!legacyCopy.includes('$1 per verified unique first-promotion'));

// Instagram and WhatsApp remain optional, validated client-side, and bilingual.
assert.equal(d.getElementById('instagram_handle').required,false);
assert.equal(d.getElementById('whatsapp_number').required,false);
assert.equal(d.getElementById('instagram_handle').name,'instagram_handle');
assert.equal(d.getElementById('whatsapp_number').name,'whatsapp_number');
const instagram=d.getElementById('instagram_handle'),whatsapp=d.getElementById('whatsapp_number');
instagram.value='@gft_test.official';whatsapp.value='+1 (555) 555-1234';
window.eval(read('i18n.js'));
const clickLocale=el=>el.dispatchEvent(new window.MouseEvent('click',{bubbles:true}));
clickLocale(d.querySelector('[data-language="es"]'));
assert.equal(d.documentElement.lang,'es');
assert.equal(d.querySelector('label[for="instagram_handle"]').textContent.trim(),'Usuario de Instagram (opcional)');
assert.equal(d.querySelector('label[for="whatsapp_number"]').textContent.trim(),'Número de WhatsApp (opcional)');
assert.match(d.querySelector('.contact-help').textContent,/WhatsApp son datos de contacto opcionales/);
assert.equal(instagram.value,'@gft_test.official','Language switching must preserve Instagram entry');
assert.equal(whatsapp.value,'+1 (555) 555-1234','Language switching must preserve WhatsApp entry');
assert.equal(d.querySelectorAll('#territory option').length,12,'Language switching must preserve all current territories');
clickLocale(d.querySelector('[data-language="en"]'));
assert.equal(d.documentElement.lang,'en');
assert.match(d.querySelector('label[for="instagram_handle"]').textContent,/Instagram handle/);


// User-supplied official Iconx.io logo replaces the old SVG in both visible placements.
const officialLogo='assets/iconx-official.webp';
const asset=fs.readFileSync(officialLogo);
assert.equal(asset.toString('ascii',0,4),'RIFF','Official logo binary must be a WebP');
assert.equal(asset.toString('ascii',8,12),'WEBP','WebP asset must be valid RIFF header');
assert.equal(asset.length,6770,'Exact optimized supplied-logo asset is committed');
const brandHeader=d.querySelector('.agency-brand');
const brandNote=d.querySelector('.agency-note-logo');
assert(brandHeader&&brandNote,'Header and inline logo must both be clickable');
assert.equal(brandHeader.getAttribute('href'),'./#top');
assert.equal(brandNote.getAttribute('href'),'./#top');
assert.equal(brandHeader.querySelector('img').getAttribute('src'),brandNote.querySelector('img').getAttribute('src'));
assert.match(brandHeader.querySelector('img').getAttribute('src'),/iconx-official\\.webp/);
assert(!site.includes('iconx-agency-logo.svg'),'No old V logo references remain on live page');
assert(!site.includes('href="https://iconx.io"'),'Iconx branding should not navigate away from this site');
assert(!site.includes('href="https://iconx-io.vercel.app'),'Iconx branding should not navigate away from this site');

console.log('Ambassador one-page QA passed: 23 stores, 11 selectable groups, restricted state, no speculative city map, internship optional.');
