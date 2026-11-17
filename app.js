(() => {
  'use strict';
  // Proposed city-centered planning territories. Coordinates are representative city centers,
  // not property boundaries, city limits, store assignments, or guaranteed exclusivity.
  const territories = [
    {state:'FL',city:'Miami',region:'Miami-Dade',lat:25.7617,lng:-80.1918},
    {state:'FL',city:'Fort Lauderdale',region:'Broward County',lat:26.1224,lng:-80.1373},
    {state:'FL',city:'West Palm Beach',region:'Palm Beach County',lat:26.7153,lng:-80.0534},
    {state:'FL',city:'Port St. Lucie',region:'Treasure Coast',lat:27.2730,lng:-80.3582},
    {state:'FL',city:'Orlando',region:'Central Florida',lat:28.5383,lng:-81.3792},
    {state:'FL',city:'Kissimmee',region:'Osceola County',lat:28.29196,lng:-81.4076},
    {state:'FL',city:'Tampa',region:'Tampa Bay',lat:27.9506,lng:-82.4572},
    {state:'FL',city:'St. Petersburg',region:'Pinellas County',lat:27.7676,lng:-82.6403},
    {state:'FL',city:'Lakeland',region:'Polk County',lat:28.0395,lng:-81.9498},
    {state:'FL',city:'Sarasota',region:'Suncoast',lat:27.3364,lng:-82.5307},
    {state:'FL',city:'Fort Myers',region:'Southwest Florida',lat:26.6406,lng:-81.8723},
    {state:'FL',city:'Naples',region:'Collier County',lat:26.1420,lng:-81.7948},
    {state:'FL',city:'Jacksonville',region:'Northeast Florida',lat:30.3322,lng:-81.6557},
    {state:'FL',city:'Gainesville',region:'North Central Florida',lat:29.6516,lng:-82.3248},
    {state:'FL',city:'Ocala',region:'Marion County',lat:29.1872,lng:-82.1401},
    {state:'FL',city:'Daytona Beach',region:'Volusia County',lat:29.2108,lng:-81.0228},
    {state:'FL',city:'Tallahassee',region:'Big Bend',lat:30.4383,lng:-84.2807},
    {state:'FL',city:'Pensacola',region:'Western Panhandle',lat:30.4213,lng:-87.2169},
    {state:'NY',city:'Manhattan',region:'New York City',lat:40.7831,lng:-73.9712},
    {state:'NY',city:'Brooklyn',region:'New York City',lat:40.6782,lng:-73.9442},
    {state:'NY',city:'Queens',region:'New York City',lat:40.7282,lng:-73.7949},
    {state:'NY',city:'The Bronx',region:'New York City',lat:40.8448,lng:-73.8648},
    {state:'NY',city:'Staten Island',region:'New York City',lat:40.5795,lng:-74.1502},
    {state:'NY',city:'Yonkers',region:'Lower Hudson Valley',lat:40.9312,lng:-73.8987},
    {state:'NY',city:'White Plains',region:'Westchester County',lat:41.0340,lng:-73.7629},
    {state:'NY',city:'Hempstead',region:'Western Long Island',lat:40.7062,lng:-73.6187},
    {state:'NY',city:'Huntington',region:'Central Long Island',lat:40.8682,lng:-73.4257},
    {state:'NY',city:'Islip',region:'Suffolk County',lat:40.7298,lng:-73.2109},
    {state:'NY',city:'Poughkeepsie',region:'Mid-Hudson Valley',lat:41.7004,lng:-73.9210},
    {state:'NY',city:'Newburgh',region:'Orange County',lat:41.5034,lng:-74.0104},
    {state:'NY',city:'Albany',region:'Capital Region',lat:42.6526,lng:-73.7562},
    {state:'NY',city:'Saratoga Springs',region:'Capital District North',lat:43.0831,lng:-73.7846},
    {state:'NY',city:'Buffalo',region:'Western New York',lat:42.8864,lng:-78.8784},
    {state:'NY',city:'Niagara Falls',region:'Niagara County',lat:43.0962,lng:-79.0377},
    {state:'NY',city:'Rochester',region:'Finger Lakes West',lat:43.1566,lng:-77.6088},
    {state:'NY',city:'Syracuse',region:'Central New York',lat:43.0481,lng:-76.1474},
    {state:'NY',city:'Utica',region:'Mohawk Valley',lat:43.1009,lng:-75.2327},
    {state:'NY',city:'Binghamton',region:'Southern Tier',lat:42.0987,lng:-75.9180}
  ].map((t, i) => ({...t, id:`${t.state}-${String(i+1).padStart(2,'0')}`}));

  const $ = id => document.getElementById(id);
  const list = $('territory-list'), search = $('territory-search'), formState = $('state'), select = $('territory');
  let state = 'FL', chosen = null, map = null, layers = null;
  const mapFallback=document.querySelector('#territory-map .map-fallback');
  const svgNamespace='http://www.w3.org/2000/svg';
  let imageryReady=false,mapCheckTimer;
  function svgElement(parent,tag,attributes,label){
 const element=document.createElementNS(svgNamespace,tag);
 Object.entries(attributes||{}).forEach(([key,value])=>element.setAttribute(key,String(value)));
 if(label!==undefined)element.textContent=label;
 parent.append(element);return element;
}
  function updateMapFallback(){
 if(!mapFallback||!chosen)return;
 const panel=document.createElement('div');panel.className='map-schematic';
 const heading=document.createElement('div');heading.className='map-schematic-heading';
 heading.textContent=`${chosen.city}, ${state} · Your proposed 20 × 20-mile territory`;
 panel.append(heading);
 const svg=svgElement(panel,'svg',{viewBox:'0 0 680 344',role:'img',
 'aria-label':`Geographic overview centered on ${chosen.city}, ${state}, with a 20 by 20 mile square highlighted`,
 preserveAspectRatio:'xMidYMid meet'});
 svgElement(svg,'rect',{x:0,y:0,width:680,height:344,rx:12,fill:'#edf4fc'});
 for(let col=40;col<680;col+=40)svgElement(svg,'line',{x1:col,y1:0,x2:col,y2:344,stroke:'#d9e4f3','stroke-width':1});
 for(let row=24;row<344;row+=40)svgElement(svg,'line',{x1:0,y1:row,x2:680,y2:row,stroke:'#d9e4f3','stroke-width':1});
 const scale=7.2,cx=340,cy=166;
 const px=t=>cx+(t.lng-chosen.lng)*69.172*Math.cos(chosen.lat*Math.PI/180)*scale;
 const py=t=>cy-(t.lat-chosen.lat)*69*scale;
 const half=10*scale;
 svgElement(svg,'rect',{x:cx-half,y:cy-half,width:half*2,height:half*2,rx:6,fill:'#ec69b8','fill-opacity':'.30',stroke:'#be308c','stroke-width':4});
 svgElement(svg,'line',{x1:cx-half,y1:cy+half+13,x2:cx+half,y2:cy+half+13,stroke:'#8b3c92','stroke-width':2});
 svgElement(svg,'text',{x:cx,y:cy+half+31,'text-anchor':'middle',fill:'#6f407c','font-family':'Arial,sans-serif','font-size':15,'font-weight':700},'20 miles');
 svgElement(svg,'circle',{cx,cy,r:7,fill:'#be308c',stroke:'#fff','stroke-width':3});
 const nearby=territories.filter(t=>t.state===state&&t.id!==chosen.id)
 .map(t=>({...t,dist:Math.hypot(px(t)-cx,py(t)-cy)}))
 .filter(t=>t.dist>70&&t.dist<230).sort((a,b)=>a.dist-b.dist).slice(0,6);
 for(const t of nearby){
  const x=px(t),y=py(t);if(x<35||x>635||y<25||y>305)continue;
  svgElement(svg,'circle',{cx:x,cy:y,r:4,fill:'#7659bc',stroke:'#fff','stroke-width':1.7});
  svgElement(svg,'text',{x:x+9,y:y-8,fill:'#594b76','font-family':'Arial,sans-serif','font-size':12,'font-weight':700},t.city);
 }
 svgElement(svg,'text',{x:cx+11,y:cy-13,fill:'#402a58','font-family':'Arial,sans-serif','font-size':17,'font-weight':700},chosen.city);
 svgElement(svg,'text',{x:640,y:25,'text-anchor':'middle',fill:'#64517e','font-family':'Arial,sans-serif','font-size':13,'font-weight':700},'N ↑');
 const note=document.createElement('p');note.className='map-schematic-note';
 note.textContent='City-centered geographic diagram (not a street map). Pink square = approximately 20 × 20 miles; final assignments require approval.';
 panel.append(note);mapFallback.replaceChildren(panel);
}
  function showMapFallback(){
 if(!mapFallback)return;
 updateMapFallback();mapFallback.classList.remove('is-hidden');imageryReady=false;
}
  function visibleTileCoverage(){
 const viewport=$('territory-map').getBoundingClientRect();
 if(viewport.width<100||viewport.height<100)return 0;
 const tiles=Array.from(document.querySelectorAll('#territory-map .leaflet-tile-loaded'))
 .filter(img=>img.complete&&img.naturalWidth>0).map(img=>img.getBoundingClientRect());
 let hits=0;const columns=10,rows=8;
 for(let y=0;y<rows;y++)for(let x=0;x<columns;x++){
  const xx=viewport.left+(x+.5)*viewport.width/columns;
  const yy=viewport.top+(y+.5)*viewport.height/rows;
  if(tiles.some(tile=>tile.left<=xx&&xx<tile.right&&tile.top<=yy&&yy<tile.bottom))hits++;
 }
 return hits/(columns*rows);
}
  function hideMapFallbackIfTilesReady(){
 if(!mapFallback)return;
 imageryReady=visibleTileCoverage()>=0.95;
 mapFallback.classList.toggle('is-hidden',imageryReady);
}
  function scheduleMapCheck(){
 clearTimeout(mapCheckTimer);
 mapCheckTimer=setTimeout(hideMapFallbackIfTilesReady,200);
}

  $('fl-count').textContent = territories.filter(t => t.state === 'FL').length;
  $('ny-count').textContent = territories.filter(t => t.state === 'NY').length;

  // Approximate geodesic 20 x 20 statute-mile square: ±10 miles N/S and E/W.
  function bounds(t) {
    const latHalf = 10/69.0;
    const lngHalf = 10/(69.172*Math.cos(t.lat*Math.PI/180));
    return [[t.lat-latHalf, t.lng-lngHalf], [t.lat+latHalf, t.lng+lngHalf]];
  }
  function selectedByID(id) { return territories.find(t=>t.id===id); }
  function setSelected(t, scrollToList = false) {
    if (!t) return;
    chosen = t;
    state = t.state;
    $('selected-name').textContent = `${t.city}, ${t.state}`;
    $('selected-meta').textContent = `${t.region} · 20 × 20 miles · About 400 square miles · Final roster assigned in writing`;
    document.querySelectorAll('.state-tab').forEach(btn=>{
      const active=btn.dataset.state===state; btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active));
    });
    $('territory-title').textContent=state==='FL'?'Florida territories':'New York territories';
    renderList();
    showMapFallback();
    renderMap(true);
    if(scrollToList) document.querySelector('.territory-toolbar').scrollIntoView({behavior:'smooth',block:'start'});
  }
  function renderList(){
 const q=search.value.trim().toLowerCase();
 const items=territories.filter(t=>t.state===state&&`${t.city} ${t.region}`.toLowerCase().includes(q));
 $('territory-count').textContent=`${items.length} cities`;
 const previousScroll=list.scrollTop;list.replaceChildren();
 if(!items.length){const p=document.createElement('p');p.className='muted';p.style.padding='12px';p.textContent='No matching territories. Try another city.';list.append(p);return;}
 for(const t of items){
  const btn=document.createElement('button');btn.type='button';btn.setAttribute('role','listitem');
  btn.className=`territory-option${chosen?.id===t.id?' active':''}`;
  btn.innerHTML=`<span><strong>${t.city.replaceAll('&','&amp;')}</strong><small>${t.region} · 20 × 20 miles</small></span><span class="arrow" aria-hidden="true">→</span>`;
  btn.setAttribute('aria-label',`View ${t.city}, ${t.state} territory`);
  btn.addEventListener('click',()=>setSelected(t));list.append(btn);
 }
 list.scrollTop=previousScroll;
 const selectedOption=list.querySelector('.territory-option.active');
 if(selectedOption){
  const listRect=list.getBoundingClientRect(),optionRect=selectedOption.getBoundingClientRect();
  if(optionRect.top<listRect.top)list.scrollTop-=listRect.top-optionRect.top+8;
  else if(optionRect.bottom>listRect.bottom)list.scrollTop+=optionRect.bottom-listRect.bottom+8;
 }
}
  function renderMap(focusChosen){
 if(!map||!window.L)return;
 layers.clearLayers();
 const items=territories.filter(t=>t.state===state),all=[];
 items.forEach(t=>{
  const active=chosen?.id===t.id;
  const rectangle=L.rectangle(bounds(t),{
   color:active?'#c23191':'#7952e8',weight:active?4:1.5,
   fillColor:active?'#ee80c2':'#9577df',fillOpacity:active?.28:.09
  }).addTo(layers);
  rectangle.bindPopup(`<strong>${t.city}, ${t.state}</strong><p>Proposed 20 × 20-mile territory.<br>Final store roster confirmed in writing.</p>`);
  rectangle.on('click',()=>setSelected(t));all.push(bounds(t));
 });
 map.invalidateSize({pan:false});
 if(focusChosen&&chosen?.state===state)map.fitBounds(bounds(chosen),{padding:[45,45],maxZoom:11,animate:false});
 else if(all.length)map.fitBounds(L.latLngBounds(all.flat()),{padding:[24,24],animate:false});
 scheduleMapCheck();
}
  function initMap(){
 showMapFallback();if(!window.L)return;
 try{
  map=L.map('territory-map',{scrollWheelZoom:false,zoomControl:true}).setView([27.9,-81.6],7);
  const imagery=L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{
   maxZoom:18,attribution:'&copy; OpenStreetMap contributors &copy; CARTO',subdomains:'abcd',crossOrigin:true
  });
  imagery.on('loading',()=>{if(!imageryReady)showMapFallback()});
  imagery.on('tileload',scheduleMapCheck);
  imagery.on('tileerror',showMapFallback);
  imagery.on('load',scheduleMapCheck);
  imagery.addTo(map);layers=L.layerGroup().addTo(map);
  map.on('moveend',scheduleMapCheck);
  renderMap(false);map.whenReady(()=>scheduleMapCheck());
  if(window.ResizeObserver)new ResizeObserver(()=>{map.invalidateSize({pan:false});scheduleMapCheck()}).observe($('territory-map'));
 }catch(error){
  console.warn('Street map unavailable; geographic territory diagram remains visible.');
  showMapFallback();
 }
}
  document.querySelectorAll('.state-tab').forEach(btn=>btn.addEventListener('click',()=>{
    state=btn.dataset.state; chosen=territories.find(t=>t.state===state);search.value='';setSelected(chosen);
    renderMap(false);
  }));
  search.addEventListener('input',renderList);
  $('territory-apply-link').addEventListener('click',()=>{
    if(!chosen)return;
    formState.value=chosen.state;
    populateTerritories(chosen.id);
  });
  function populateTerritories(selected='') {
    select.replaceChildren();
    const first=document.createElement('option');first.value='';first.textContent=formState.value?'Select your territory':'Choose a state first';select.append(first);
    select.disabled=!formState.value;
    territories.filter(t=>t.state===formState.value).forEach(t=>{
      const option=document.createElement('option');option.value=t.id;option.textContent=`${t.city} — ${t.region}`;
      select.append(option);
    });
    if(selected && selectedByID(selected)?.state===formState.value)select.value=selected;
  }
  formState.addEventListener('change',()=>populateTerritories());
  chosen=territories[0];setSelected(chosen);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initMap,{once:true});else initMap();

  function applicationText(d){
    const t=selectedByID(d.territory);
    return `GFT Rewards Store Ambassador Application\n\nFull name: ${d.full_name}\nEmail: ${d.email}\nMobile: ${d.mobile}\nState: ${d.state}\nPreferred territory: ${t?.city || d.territory}, ${d.state}\nBased in: ${d.base_city}\nEnglish and Spanish bilingual: Yes\nGFT platform training acknowledged: Yes\nExperience: ${d.retail_experience || 'Not provided'}\nApplication contact consent: Yes\n`;
  }
  function openEmailDraft(d){
    const subject=`GFT Store Ambassador Application — ${selectedByID(d.territory)?.city || 'Territory'}, ${d.state}`;
    const url=`mailto:rcramer@iconx.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(applicationText(d))}`;
    // Do not claim that an email was sent; an applicant still needs to send the draft.
    window.location.href=url;
    return url;
  }
  const form=$('ambassador-form'),status=$('form-status'),button=$('submit-application');
  form.addEventListener('submit', async e=>{
    e.preventDefault(); if(button.disabled || !form.reportValidity())return;
    const d=Object.fromEntries(new FormData(form).entries());
    d.bilingual=!!d.bilingual; d.consent=!!d.consent;
    status.textContent='';status.className='status';
    if(!d.bilingual || !d.consent){status.textContent='Bilingual confirmation and contact consent are required.';status.className='status error';return;}
    if(d.website){status.textContent='Please contact the recruiting team to apply.';status.className='status error';return;}
    button.disabled=true;button.textContent='Submitting application…';
    try {
      if(!['http:','https:'].includes(window.location.protocol)) throw new Error('Email submission needed');
      const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),12000);
      let r;
      try{r=await fetch('/api/apply',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d),signal:controller.signal});}
      finally{clearTimeout(timer);}
      const result=await r.json().catch(()=>({}));
      if(!r.ok||!result.ok)throw new Error('Email submission needed');
      status.className='status ok';status.textContent='Application received by the recruiting service. Thank you!';
      form.reset();populateTerritories();
    } catch(err) {
      openEmailDraft(d);
      status.className='status notice';
      status.replaceChildren(document.createTextNode('An email draft should open. Please send it to complete your application. If no email app opens, '));
      const a=document.createElement('a');a.href=`mailto:rcramer@iconx.io?subject=${encodeURIComponent(`GFT Store Ambassador Application — ${d.state}`)}&body=${encodeURIComponent(applicationText(d))}`;
      a.textContent='open the email draft here';a.style.textDecoration='underline';status.append(a,document.createTextNode('. No application has been recorded by the website.'));
    } finally {button.disabled=false;button.textContent='Submit my application →';}
  });
})();