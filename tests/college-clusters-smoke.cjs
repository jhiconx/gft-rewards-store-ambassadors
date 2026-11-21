/* Runtime and data checks for the College Ambassador Store Clusters page. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {JSDOM}=require('jsdom');
const read=path=>fs.readFileSync(path,'utf8');
const dom=new JSDOM(read('college-clusters.html'),{
 url:'https://gft-rewards-store-ambassadors.vercel.app/college-clusters.html',
 runScripts:'outside-only',pretendToBeVisual:true
});
const {window}=dom, d=window.document;
window.eval(read('college-clusters-data.js'));
const data=window.GFT_COLLEGE_PLAN;
assert.equal(data.stores.length,23);
assert.equal(data.stores.filter(s=>s.state==='FL').length,21);
assert.equal(data.stores.filter(s=>s.state==='NY').length,1);
assert.equal(data.stores.filter(s=>s.state==='MA').length,1);
assert.equal(data.colleges.length,28);
assert.equal(data.clusters.length,12);
const storeIds=new Set(data.stores.map(s=>s.id));
const collegeIds=new Set(data.colleges.map(c=>c.id));
const assigned=data.clusters.flatMap(c=>c.stores);
assert.equal(new Set(assigned).size,23,'No prospective store assigned twice');
assert.deepEqual(new Set(assigned),storeIds);
for(const c of data.clusters){
 assert(collegeIds.has(c.lead),'Missing primary campus '+c.lead);
 for(const a of c.alternates)assert(collegeIds.has(a),'Missing alternate campus '+a);
}
for(const c of data.colleges){
 assert(c.address.includes('USA'));
 assert(/^https:\/\//.test(c.url),'School source should be HTTPS');
}
window.eval(read('college-clusters.js'));
const click=el=>el.dispatchEvent(new window.MouseEvent('click',{bubbles:true}));
const list=()=>[...d.querySelectorAll('.cc-cluster-item')];
const cards=()=>[...d.querySelectorAll('.cc-store-card')];
assert.equal(list().length,12);
assert.equal(cards().length,4,'Default Kissimmee should have four store cards');
assert.match(d.getElementById('cc-selected-name').textContent,/Kissimmee/);
assert.match(d.getElementById('cc-route-link').href,/google\.com\/maps\/dir/);
assert.match(d.getElementById('cc-map').src,/maps\.google\.com/);
assert.equal(d.querySelectorAll('.cc-college-card').length,2);
click(d.querySelector('[data-state="NY"]'));
assert.equal(list().length,1);
assert.equal(cards().length,1);
assert.match(d.getElementById('cc-selected-name').textContent,/Brooklyn/);
click(d.querySelector('[data-cc-lang="es"]'));
assert.equal(d.documentElement.lang,'es');
assert.match(d.getElementById('cc-selected-name').textContent,/Canarsie/);
assert.match(d.querySelector('[data-i18n="explorerHeading"]').textContent,/universidad|Encuentra el campus/);
click(d.querySelector('[data-state="ALL"]'));
const search=d.getElementById('cc-search');
search.value='Santiago Market';
search.dispatchEvent(new window.Event('input',{bubbles:true}));
assert.equal(list().length,1);
assert.match(d.getElementById('cc-selected-name').textContent,/Winter Haven/);
const sourceLinks=[...d.querySelectorAll('.cc-college-links a')];
assert(sourceLinks.length>=1,'College source links visible');
assert(!read('college-clusters.html').includes('Sampling For Good'),'GFT site must not be presented as sampling');
console.log('College cluster QA passed: 23 stores, 28 campuses, 12 clusters, map links, search, state filters and EN/ES.');
