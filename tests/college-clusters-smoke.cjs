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
assert.equal(data.colleges.length,41);
assert.equal(data.clusters.length,11);
assert.equal(data.territoryModel.widthMiles,20);
assert.equal(data.territoryModel.heightMiles,20);
assert.equal(data.territoryModel.isVerified,false);
assert.equal(data.clusters.find(c=>c.id==='broward').stores.length,5);
assert.equal(data.clusters.find(c=>c.id==='broward').boundaryReview,true);
assert.equal(data.stores.find(s=>s.id==='S04').zip,'34744');
assert.equal(data.stores.find(s=>s.id==='S16').street,'4099 NW 31st Ave');
assert.equal(data.stores.find(s=>s.id==='S22').zip,'02122');
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
assert.equal(list().length,11);
assert.equal(cards().length,4,'Default Kissimmee should have four store cards');
assert.equal(d.querySelectorAll('#cc-wave-one .cc-wave-item').length,5,'Five first-wave college clusters');
assert.equal(d.querySelectorAll('#cc-wave-two .cc-wave-item').length,6,'Six expansion-wave college clusters');
assert.equal(data.clusters.filter(c=>c.priority===1).reduce((n,c)=>n+c.stores.length,0),17);

assert.match(d.getElementById('cc-selected-name').textContent,/Kissimmee/);
assert.match(d.getElementById('cc-route-link').href,/google\.com\/maps\/dir/);
assert.match(d.getElementById('cc-map').src,/maps\.google\.com/);
assert.equal(d.querySelectorAll('.cc-college-card').length,2);
assert.match(d.getElementById('cc-selected-badges').textContent,/20 × 20/);
assert.match(d.querySelector('[data-i18n="territoryPolicy"]').textContent,/20 × 20/);
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
click(d.querySelector('#cc-wave-one .cc-wave-item'));
assert.equal(list().length,12,'Selecting a wave item resets filters');
assert(d.querySelector('.cc-cluster-item.active'),'Wave item selects a cluster');
assert(!read('college-clusters.html').includes('Sampling For Good'),'GFT site must not be presented as sampling');
console.log('College cluster QA passed: 23 stores, 41 campuses, 11 recruiting groups, map links, search, state filters and EN/ES.');
