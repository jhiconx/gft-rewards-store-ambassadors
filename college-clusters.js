(() => {
  'use strict';
  const data = window.GFT_COLLEGE_PLAN;
  const $ = id => document.getElementById(id);
  if (!data || data.stores.length !== 23 || data.clusters.length !== 12) {
    $('cc-cluster-list').textContent = 'Cluster data is unavailable. Please refresh.';
    return;
  }
  const dict = {
    en: {
      explorerNav:'Explore clusters',ambassadorNav:'Ambassador program',apply:'Apply to be an ambassador',
      eyebrow:'01 / GFT college-to-store field program',hero1:'One campus.',hero2:'A neighborhood of stores.',
      lede:'Build a locally recruited, bilingual college ambassador team around stores GFT Rewards is attempting to onboard. Each cluster connects an actual college campus to a practical list of prospective grocery-store visits.',
      explore:'Explore store clusters',workflow:'View the visit playbook',
      targetDisclaimer:'Prospective distribution targets only — no store participation or campus partnership is represented as confirmed.',
      modelTitle:'LOCAL FIELD MODEL',v1:'Recruit a campus lead',v1small:'Identify a bilingual student close to target stores',
      v2:'Assign a store cluster',v2small:'Keep visits within a manageable local route',
      v3:'Visit, verify, report',v3small:'Confirm decision makers and POS readiness',
      suggestedNotAssigned:'Suggested assignments — none have been staffed or approved.',
      statStores:'Prospective stores',statClusters:'Field clusters',statCampuses:'Campus candidates',statStates:'States in this list',
      explorerEyebrow:'02 / Visit territories',explorerHeading:'Find the college. See the stores. Plan the visit.',
      explorerSub:'Start with the recommended lead campus. Alternate campuses expand recruiting reach; they do not indicate signed partnerships.',
      planNotice:'Rankings and visit loops are planning recommendations, not measured driving times.',
      allMarkets:'All markets',allWaves:'All launch waves',waveOne:'Wave 1 · Multi-store',waveTwo:'Wave 2 · Single/specialty',
      clusterMenu:'College-led clusters',loading:'Loading clusters…',clusterDetail:'Selected field cluster',routeAll:'Open planning visit route',
      locationMap:'Location map',mapCaption:'Map centers on one selected campus or store. Use the route link for suggested stops.',openMap:'Open larger map',
      collegeHeading:'Campuses to recruit',storesHeading:'Stores to visit',visitHeading:'Suggested visit sequence',
      validationHeading:'Validate before visiting',validationCopy:'Store names and addresses came from the supplied target list; business operations, store approvals, and meeting permissions have not been verified. Source entries with incomplete or inconsistent ZIP/street data are flagged on the relevant cluster.',
      playEyebrow:'03 / Campus-to-store operations',playTitle:'One accountable ambassador. Clear weekly actions.',
      playSub:'Proposed operating rhythm, not existing store commitments or guaranteed workload. GFT approves which locations can be approached.',
      play1:'Recruit on campus',play1b:'Start with campus career services, student clubs and bilingual community organizations. Confirm English/Spanish fluency, transportation and availability.',
      play2:'Train before visits',play2b:'Complete GFT Rewards platform training, sales messaging, checkout-phone-number flow, approved outreach rules and retail POS readiness checklist.',
      play3:'Visit in a cluster',play3b:'Schedule appointments, bundle nearby stops into the same field session and avoid assigning outlying stores without a second visit block.',
      play4:'Report and escalate',play4b:'Log manager contact, meeting outcome, POS platform, implementation requirements, follow-up date and the store’s approved attribution.',
      compEyebrow:'Existing compensation model',compText:'Qualified ambassadors use the current written GFT program: $25 per approved store signup, $1 per verified unique first-promotion redemption, 2¢ per eligible ongoing redemption and $500 per completed approved territory roster. Actual eligibility and payment timing follow the signed agreement.',
      viewComp:'Review full terms',methodEyebrow:'04 / Sources & decisions',
      methodTitle:'Built from your store list, with campus sources checked.',
      methodText:'Store addresses and market labels are reproduced from your prospect list. Candidate college addresses link to institutional pages. “Lead” and “alternate” rankings reflect geographic and field-operational judgment, not university endorsement, student enrollment data, measured route duration, or a confirmed ambassador relationship.',
      methodNote:'In particular, the supplied ZIP for Unidos 2 in Kissimmee, the street suffix at Ocho Rios III, and the Boston ZIP need confirmation before dispatch. Map searches may omit those questionable ZIPs.',
      nextSteps:'Before assigning a cluster',check1:'Confirm each target store’s exact address and decision maker',
      check2:'Secure store outreach approval from GFT',check3:'Recruit and train a local bilingual college ambassador',
      check4:'Approve a written roster, visit window and attribution rules',
      footerHome:'Store Ambassador Program',footerAgency:'— A Registered GFT Rewards Agency'
    },
    es: {
      explorerNav:'Explorar grupos',ambassadorNav:'Programa de embajadores',apply:'Solicitar ser embajador',
      eyebrow:'01 / Programa GFT de universidades y tiendas',hero1:'Un campus.',hero2:'Una comunidad de tiendas.',
      lede:'Forma un equipo local de embajadores universitarios bilingües cerca de las tiendas que GFT Rewards busca incorporar. Cada grupo vincula un campus real con una lista práctica de visitas a supermercados prospectivos.',
      explore:'Explorar grupos de tiendas',workflow:'Ver el plan de visitas',
      targetDisclaimer:'Tiendas prospectivas solamente: no se ha confirmado la participación de tiendas ni acuerdos con universidades.',
      modelTitle:'MODELO DE CAMPO LOCAL',v1:'Reclutar en el campus',v1small:'Encontrar un estudiante bilingüe cerca de las tiendas',
      v2:'Asignar un grupo de tiendas',v2small:'Organizar visitas dentro de una ruta local manejable',
      v3:'Visitar, verificar, informar',v3small:'Confirmar responsables y preparación del punto de venta',
      suggestedNotAssigned:'Asignaciones sugeridas: aún no hay personal ni aprobaciones confirmadas.',
      statStores:'Tiendas prospectivas',statClusters:'Grupos de trabajo',statCampuses:'Campus candidatos',statStates:'Estados incluidos',
      explorerEyebrow:'02 / Territorios de visitas',explorerHeading:'Encuentra el campus. Identifica las tiendas. Planifica la visita.',
      explorerSub:'Comienza con el campus principal recomendado. Los campus alternativos amplían el reclutamiento; no representan convenios firmados.',
      planNotice:'Las prioridades y rutas son recomendaciones de planificación, no tiempos de manejo medidos.',
      allMarkets:'Todos los mercados',allWaves:'Todas las fases',waveOne:'Fase 1 · Varias tiendas',waveTwo:'Fase 2 · Zona pequeña',
      clusterMenu:'Grupos dirigidos desde campus',loading:'Cargando grupos…',clusterDetail:'Grupo seleccionado',routeAll:'Abrir ruta de visitas sugerida',
      locationMap:'Mapa de ubicación',mapCaption:'El mapa se centra en un campus o tienda seleccionada. Usa el enlace de ruta para las paradas sugeridas.',openMap:'Abrir mapa grande',
      collegeHeading:'Campus para reclutar',storesHeading:'Tiendas para visitar',visitHeading:'Secuencia sugerida de visitas',
      validationHeading:'Verificar antes de visitar',validationCopy:'Los nombres y direcciones de tiendas provienen de la lista proporcionada; no se han verificado operaciones, aprobaciones ni permisos para reuniones. Los datos postales incompletos o inconsistentes se señalan en cada grupo.',
      playEyebrow:'03 / Operaciones de campus a tienda',playTitle:'Un embajador responsable. Acciones semanales claras.',
      playSub:'Ritmo de trabajo propuesto; no representa compromisos existentes ni cargas laborales garantizadas. GFT aprueba los comercios que pueden contactarse.',
      play1:'Reclutar en el campus',play1b:'Contacta orientación profesional, clubes estudiantiles y organizaciones bilingües. Confirma dominio de inglés/español, transporte y disponibilidad.',
      play2:'Capacitar antes de visitar',play2b:'Completa la capacitación de GFT Rewards, mensajes comerciales, uso del número telefónico en caja, reglas de contacto y lista de preparación de POS.',
      play3:'Visitar por grupos',play3b:'Agenda reuniones, combina paradas cercanas en la misma salida y no asignes tiendas lejanas sin otra jornada de visitas.',
      play4:'Informar y escalar',play4b:'Registra contacto del gerente, resultado, plataforma POS, requisitos, fecha de seguimiento y atribución aprobada de la tienda.',
      compEyebrow:'Modelo de compensación existente',compText:'Los embajadores elegibles siguen el plan escrito de GFT: $25 por tienda aprobada inscrita, $1 por canje único verificado en la primera promoción, 2¢ por cada canje posterior elegible y $500 por completar la lista territorial aprobada. Los requisitos y plazos dependen del acuerdo firmado.',
      viewComp:'Consultar condiciones',methodEyebrow:'04 / Fuentes y decisiones',
      methodTitle:'A partir de tu lista de tiendas y campus verificados.',
      methodText:'Los nombres, direcciones y mercados de las tiendas vienen de tu lista. Las direcciones de universidades enlazan a páginas institucionales. Las categorías “principal” y “alternativo” son criterios geográficos y operativos; no indican respaldo universitario, matrícula, duración medida de rutas ni relaciones confirmadas.',
      methodNote:'En particular, deben confirmarse el código postal de Unidos 2 en Kissimmee, el sufijo de la calle de Ocho Rios III y el código postal de Boston. Los mapas pueden omitir estos códigos cuestionables.',
      nextSteps:'Antes de asignar un grupo',check1:'Confirmar dirección exacta y responsable de cada tienda',
      check2:'Obtener aprobación de GFT para contactar las tiendas',check3:'Reclutar y capacitar a un estudiante bilingüe local',
      check4:'Aprobar por escrito la lista, horario y reglas de atribución',
      footerHome:'Programa de Embajadores de Tiendas',footerAgency:'— Agencia registrada de GFT Rewards'
    }
  };
  const spanishCluster = {
    treasure:{label:'Costa del Tesoro / Fort Pierce',pitch:'Recluta a un estudiante local de Indian River State College para visitar una tienda en Fort Pierce.',plan:['Confirma el contacto y la autorización de la tienda.','Reúnete con el gerente; registra información de POS y del responsable.','Registra el seguimiento y la próxima visita.'],note:'Grupo inicial de una tienda; coordina la búsqueda con organizaciones de estudiantes y programas de servicio de IRSC.'},
    space:{label:'Costa Espacial / Merritt Island',pitch:'El campus Cocoa de EFSC es la base estudiantil local para esta tienda.',plan:['Recluta en las organizaciones estudiantiles de EFSC Cocoa.','Coordina una visita a la tienda en Merritt Island.','Informa sobre el propietario y la preparación para incorporar la tienda.'],note:'Mantén la cobertura de Brevard separada de Orlando para evitar desplazamientos largos.'},
    hendry:{label:'Condado de Hendry / LaBelle',pitch:'El centro Hendry/Glades de FSW está en LaBelle; prioriza a un estudiante que ya vive allí.',plan:['Contacta la oficina de participación estudiantil de FSW Hendry/Glades.','Visita Azteca durante una cita aprobada.','Registra la decisión de la tienda, requisitos y siguiente paso.'],note:'Zona rural: no asignes un estudiante de Fort Myers sin confirmar su disponibilidad real.'},
    kissimmee:{label:'Kissimmee / Osceola',pitch:'Uno de los mejores grupos iniciales: cuatro supermercados prospectivos y dos campus locales de Valencia.',plan:['Jornada A: Valencia Osceola → Unidos 2 → Thrifty Fancy Produce.','Jornada B: Kissimmee Meats & Produce → Unidos Pleasant Hill; coordina con Valencia Poinciana.','Recopila contactos, datos POS y decisiones de cada tienda.'],note:'Es más práctico dividir las cuatro tiendas en dos días. Verifica el código postal de Unidos 2.'},
    polk:{label:'Winter Haven / Polk',pitch:'Ambas tiendas están en Winter Haven; un embajador de Polk State podría atenderlas.',plan:['Contacta grupos estudiantiles de Polk State Winter Haven.','Agenda Santiago Market y La Plaza Mexico en una salida local.','Registra seguimientos y cualquier revisión de compatibilidad POS.'],note:'Polk State Lakeland sirve como apoyo; empieza con estudiantes de Winter Haven.'},
    tampa:{label:'Tampa / Brandon',pitch:'Tres tiendas en el centro de Tampa y una en Valrico; recluta en varios campus de Hillsborough.',plan:['Jornada Tampa: Caribbean Club → Huracan 2 → Huracan Supermarket, con alumnos de Dale Mabry/Ybor.','Jornada Brandon/Valrico: Latinos Supermarket, con alumnos de Hillsborough Brandon.','Un coordinador reúne los cuatro informes, sin suponer que se cubre todo en un día.'],note:'Dos recorridos reducen los traslados. USF Tampa amplía el reclutamiento, pero no es el campus más cercano a todas las tiendas.'},
    bradenton:{label:'Bradenton / Manatee',pitch:'Un embajador de SCF Bradenton podría visitar las dos tiendas de 15th Street E.',plan:['Recluta a través de la vida estudiantil o grupos de servicio de SCF.','Visita Samoset Fresh Market y Manasota Fresh Market en el mismo bloque.','Documenta si las relaciones comerciales requieren aprobaciones coordinadas.'],note:'New College of Florida es la alternativa; las antiguas instalaciones de USF Sarasota-Manatee cambiaron en 2026.'},
    broward:{label:'Broward / Lauderdale Lakes y Dania',pitch:'Prioriza el campus Central de Broward, con FAU, el centro Holcombe y NSU como alternativas.',plan:['Ruta norte: verifica Ocho Rios III → Caribbean Best Market 1 en Lauderdale Lakes.','Ruta sur: Ideal Foods Dania; recluta a alguien con acceso práctico a Dania Beach.','Usa un coordinador de informes y separa las dos rutas.'],note:'Falta el sufijo de la calle de Ocho Rios III; confirma su dirección antes de elaborar rutas.'},
    northmiami:{label:'Norte de Miami / Hialeah',pitch:'MDC Hialeah sirve para Jomara; FIU Biscayne Bay y MDC North son opciones para el norte.',plan:['Ruta Hialeah: Jomara Wholesale tras reclutar en MDC Hialeah.','Ruta norte de Miami: Caribbean Best Market 2 desde FIU Biscayne Bay o MDC North.','El coordinador consolida los informes de ambas jornadas.'],note:'Separa Hialeah del norte de Miami en dos salidas para reducir desplazamientos.'},
    daytona:{label:'Daytona Beach',pitch:'Daytona State es la primera opción; Embry-Riddle ofrece otro grupo estudiantil.',plan:['Contacta orientación profesional y organizaciones de Daytona State.','Confirma al gerente y la elegibilidad de La Placita.','Registra pasos siguientes; amplía solo con más tiendas confirmadas.'],note:'Un piloto de una tienda: prioriza disponibilidad local en lugar de notoriedad universitaria.'},
    boston:{label:'Dorchester / Boston',pitch:'UMass Boston está en Dorchester; Roxbury Community College es una alternativa.',plan:['Recluta un estudiante de la zona de Dorchester, idealmente en UMass Boston.','Confirma la visita al supermercado en Bowdoin Street.','Registra el resultado y la preparación técnica.'],note:'El código postal de Boston se proporcionó sin el cero inicial; confirma el formato completo.'},
    brooklyn:{label:'Canarsie / Brooklyn',pitch:'Brooklyn College es la primera opción, con Medgar Evers y Kingsborough como alternativas.',plan:['Recluta a un estudiante de Brooklyn College que conozca Canarsie.','Confirma una reunión en la tienda de Rockaway Parkway.','Registra resultados y preparación técnica.'],note:'Prioriza acceso real a Canarsie; no se presume convenio con ningún campus.'}
  };
  const words = {
    en:{lead:'Best first target',alt:'Additional option',campusSource:'Official campus source',mapCampus:'Show campus',mapStore:'Show store',directions:'Directions',prospective:'Prospective • unverified',stores:'stores',store:'store',college:'college',colleges:'colleges',wave1:'Wave 1',wave2:'Wave 2',noMatch:'No clusters match your search.',currentCampus:'Campus',currentStore:'Store',flag:'Source-data verification:',cluster:'cluster',based:'Campus pool',source:'Source',campuses:'campuses'},
    es:{lead:'Primera opción',alt:'Opción adicional',campusSource:'Fuente oficial del campus',mapCampus:'Ver campus',mapStore:'Ver tienda',directions:'Cómo llegar',prospective:'Prospectiva • sin verificar',stores:'tiendas',store:'tienda',college:'campus',colleges:'campus',wave1:'Fase 1',wave2:'Fase 2',noMatch:'No hay grupos que coincidan con la búsqueda.',currentCampus:'Campus',currentStore:'Tienda',flag:'Datos que requieren verificación:',cluster:'grupo',based:'Reclutamiento',source:'Fuente',campuses:'campus'}
  };
  let lang='en',stateFilter='ALL',waveFilter='all',selected='kissimmee',searchTerm='';
  try{lang=localStorage.getItem('gft-ambassador-language')==='es'?'es':'en';}catch(e){}
  const stores=Object.fromEntries(data.stores.map(o=>[o.id,o]));
  const colleges=Object.fromEntries(data.colleges.map(o=>[o.id,o]));
  const text=(a,b)=>lang==='es'?b:a, w=()=>words[lang];
  function dom(tag,cl,content){
    const node=document.createElement(tag);
    if(cl)node.className=cl;
    if(content!==undefined)node.textContent=content;
    return node;
  }
  function elLink(textContent,href,cl){
    const a=dom('a',cl,textContent);
    a.href=href;a.target='_blank';a.rel='noopener noreferrer';
    return a;
  }
  function urlAddress(o){
    return o.address || [o.street,o.city,o.state,'USA'].filter(Boolean).join(', ');
  }
  function mapsLocation(address){
    return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(address);
  }
  function mapFrame(address){
    return 'https://maps.google.com/maps?q='+encodeURIComponent(address)+'&z=12&t=m&output=embed';
  }
  function clusterName(c){return lang==='es'?(spanishCluster[c.id]?.label||c.label):c.label;}
  function getPitch(c){return lang==='es'?spanishCluster[c.id].pitch:c.pitch;}
  function getPlan(c){return lang==='es'?spanishCluster[c.id].plan:c.plan;}
  function getNote(c){return lang==='es'?spanishCluster[c.id].note:c.note;}
  function getWave(c){return c.priority===1?w().wave1:w().wave2;}
  function selectedCluster(){return data.clusters.find(c=>c.id===selected)||data.clusters[0];}
  function routeLink(c){
    const from=colleges[c.lead].address;
    const destinations=c.stores.map(id=>urlAddress(stores[id]));
    const params=new URLSearchParams({api:'1',origin:from,destination:destinations[destinations.length-1],travelmode:'driving'});
    if(destinations.length>1)params.set('waypoints',destinations.slice(0,-1).join('|'));
    return 'https://www.google.com/maps/dir/?'+params.toString();
  }
  function filterList(){
    const q=searchTerm.trim().toLowerCase();
    return data.clusters.filter(c=>{
      if(stateFilter!=='ALL'&&c.state!==stateFilter)return false;
      if(waveFilter!=='all'&&String(c.priority)!==waveFilter)return false;
      if(!q)return true;
      const list=[c.label,c.market,...c.stores.flatMap(id=>[stores[id].name,stores[id].city]),
        colleges[c.lead]?.name,...c.alternates.map(id=>colleges[id].name)].join(' ').toLowerCase();
      return list.includes(q);
    }).sort((a,b)=>a.priority-b.priority || b.stores.length-a.stores.length || a.label.localeCompare(b.label));
  }
  function renderList(){
    const items=filterList(),list=$('cc-cluster-list');
    list.replaceChildren();
    $('cc-visible-count').textContent=String(items.length);
    if(items.length===0){list.append(dom('p','cc-empty',w().noMatch));return;}
    for(const c of items){
      const btn=dom('button','cc-cluster-item'+(c.id===selected?' active':''));
      btn.type='button';btn.setAttribute('role','option');btn.setAttribute('aria-selected',String(c.id===selected));
      const first=dom('div','cc-item-top');
      first.append(dom('strong','',clusterName(c)),dom('span','cc-item-arrow','→'));
      btn.append(first,dom('span','cc-item-college',colleges[c.lead].name));
      const foot=dom('div','cc-item-bottom');
      foot.append(dom('span','cc-small-pill',c.stores.length+' '+(c.stores.length===1?w().store:w().stores)));
      foot.append(dom('span','cc-small-pill '+(c.priority===1?'wave1':'wave2'),getWave(c)));
      foot.append(dom('span','cc-small-pill',c.state));
      btn.append(foot);
      btn.addEventListener('click',()=>select(c.id,true));
      list.append(btn);
    }
  }
  function focusMap(name,address,kind){
    const iframe=$('cc-map');
    iframe.src=mapFrame(address);
    iframe.title=text('Location map: ','Mapa de ubicación: ')+name;
    $('cc-map-focus').textContent=(kind==='campus'?w().currentCampus:w().currentStore)+': '+name;
    $('cc-open-map').href=mapsLocation(address);
  }
  function renderCollege(c,id,primary){
    const college=colleges[id];
    const card=dom('article','cc-college-card'+(primary?' primary':''));
    card.append(dom('span','cc-college-role'+(primary?'':' alt'),primary?w().lead:w().alt));
    card.append(dom('h5','',college.name));
    card.append(dom('small','',college.address));
    const links=dom('div','cc-college-links');
    links.append(elLink(w().campusSource,college.url,''));
    const loc=dom('button','cc-show-campus',w().mapCampus);
    loc.type='button';
    loc.addEventListener('click',()=>focusMap(college.name,college.address,'campus'));
    links.append(loc);
    card.append(links);
    return card;
  }
  function renderStore(id){
    const store=stores[id];
    const card=dom('article','cc-store-card');
    card.append(dom('span','cc-biz-status',w().prospective));
    card.append(dom('strong','',store.name));
    const address=[store.street,store.city,store.state,store.zip].filter(Boolean).join(', ');
    card.append(dom('small','',address));
    if(store.note){
      const translated=({
        S04:'El código postal proporcionado es 24744; confírmalo antes de visitar.',
        S16:'Falta el sufijo de la calle; confirma la dirección exacta antes de visitar.',
        S22:'El código postal se proporcionó como 2122; confirma el cero inicial.'
      });
      card.append(dom('span','cc-data-warning',w().flag+' '+(lang==='es'?translated[store.id]:store.note)));
    }
    const links=dom('div','cc-store-actions');
    const button=dom('button','',w().mapStore);button.type='button';
    button.addEventListener('click',()=>focusMap(store.name,urlAddress(store),'store'));
    links.append(button,elLink(w().directions,mapsLocation(urlAddress(store)),''));
    card.append(links);
    return card;
  }
  function renderDetail(){
    const c=selectedCluster();
    $('cc-selected-name').textContent=clusterName(c);
    $('cc-pitch').textContent=getPitch(c);
    $('cc-store-count').textContent=c.stores.length+' '+(c.stores.length===1?w().store:w().stores);
    const badges=$('cc-selected-badges');badges.replaceChildren();
    badges.append(dom('span','',c.state),dom('span','',getWave(c)),dom('span','',c.stores.length+' '+(c.stores.length===1?w().store:w().stores)));
    $('cc-route-link').href=routeLink(c);
    const lead=colleges[c.lead];focusMap(lead.name,lead.address,'campus');
    const campuses=$('cc-colleges');campuses.replaceChildren();
    campuses.append(renderCollege(c,c.lead,true));
    for(const id of c.alternates)campuses.append(renderCollege(c,id,false));
    const storeList=$('cc-stores');storeList.replaceChildren();
    for(const id of c.stores)storeList.append(renderStore(id));
    const steps=$('cc-visit-steps');steps.replaceChildren();
    for(const step of getPlan(c))steps.append(dom('li','',step));
    $('cc-cluster-note').textContent=getNote(c);
  }
  function select(id,changeURL=false){
    if(!data.clusters.some(c=>c.id===id))return;
    selected=id;
    renderList();renderDetail();
    if(changeURL){
      const u=new URL(location.href);u.searchParams.set('cluster',id);
      history.replaceState(null,'',u.pathname+u.search+u.hash);
    }
  }
  function refreshLocale(){
    document.documentElement.lang=lang;
    document.title=text('College Ambassador Store Clusters | GFT Rewards × Iconx.io',
      'Grupos de tiendas para embajadores universitarios | GFT Rewards × Iconx.io');
    for(const el of document.querySelectorAll('[data-i18n]')){
      const key=el.getAttribute('data-i18n');
      el.textContent=dict[lang][key]||dict.en[key]||el.textContent;
    }
    const q=$('cc-search');
    q.placeholder=q.dataset['placeholder'+(lang==='es'?'Es':'En')];
    q.setAttribute('aria-label',text('Search clusters by school, store or market','Buscar grupos por universidad, tienda o mercado'));
    for(const btn of document.querySelectorAll('[data-cc-lang]')){
      const active=btn.dataset.ccLang===lang;
      btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active));
    }
    $('cc-state-filters').setAttribute('aria-label',text('Filter clusters by state','Filtrar grupos por estado'));
    $('cc-cluster-list').setAttribute('aria-label',text('Select a store cluster','Seleccionar un grupo de tiendas'));
    $('cc-priority').setAttribute('aria-label',text('Filter by launch wave','Filtrar por fase de lanzamiento'));
    renderList();renderDetail();
  }
  for(const button of document.querySelectorAll('[data-cc-lang]')){
    button.addEventListener('click',()=>{
      lang=button.dataset.ccLang;
      try{localStorage.setItem('gft-ambassador-language',lang);}catch(e){}
      refreshLocale();
    });
  }
  for(const button of document.querySelectorAll('[data-state]')){
    button.addEventListener('click',()=>{
      stateFilter=button.dataset.state;
      for(const b of document.querySelectorAll('[data-state]')){
        const selected=b.dataset.state===stateFilter;
        b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));
      }
      const first=filterList()[0];
      if(first)selected=first.id;
      renderList();renderDetail();
    });
  }
  $('cc-search').addEventListener('input',event=>{
    searchTerm=event.target.value;
    const matches=filterList();
    if(matches.length&&!matches.some(c=>c.id===selected))selected=matches[0].id;
    renderList();
    if(matches.length)renderDetail();
  });
  $('cc-priority').addEventListener('change',event=>{
    waveFilter=event.target.value;
    const matches=filterList();
    if(matches.length)selected=matches[0].id;
    renderList();
    if(matches.length)renderDetail();
  });
  const param=new URL(location.href).searchParams.get('cluster');
  if(param&&data.clusters.some(c=>c.id===param))selected=param;
  $('cc-store-total').textContent=String(data.stores.length);
  $('cc-cluster-total').textContent=String(data.clusters.length);
  $('cc-campus-total').textContent=String(data.colleges.length);
  refreshLocale();
})();
