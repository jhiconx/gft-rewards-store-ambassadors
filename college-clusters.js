(() => {
  'use strict';
  const data = window.GFT_COLLEGE_PLAN;
  const $ = id => document.getElementById(id);
  if (!data || data.stores.length !== 23 || data.clusters.length !== 11) {
    $('cc-cluster-list').textContent = 'Cluster data is unavailable. Please refresh.';
    return;
  }
  const dict = {
    en: {
      explorerNav:'Ambassador Program',ambassadorNav:'Program overview',apply:'Apply to be an ambassador',
      eyebrow:'01 / GFT Ambassador Program · College-to-store',hero1:'One campus.',hero2:'A neighborhood of stores.',
      wavesEyebrow:'Proposed recruitment rollout',wavesTitle:'Recruit the first five multi-store leads. Then expand.',
      wavesSub:'Five multi-store groups cover 17 stores. Six standalone sites follow. 20 × 20 miles is a student planning limit, not a surveyed boundary.',
      wave1Tag:'WAVE 1',wave2Tag:'WAVE 2',wave1Title:'Multi-store recruiting',wave2Title:'Single-store coverage',waveStores:'stores',
      lede:'Recruit one bilingual college ambassador for each proposed 20 × 20-mile student square. The five-store South Florida corridor is a regional group, not a verified single student territory.',
      explore:'View current territories',workflow:'View the visit playbook',
      targetDisclaimer:'Prospective distribution targets only — no store participation or campus partnership is represented as confirmed.',
      modelTitle:'LOCAL FIELD MODEL',v1:'Recruit a campus lead',v1small:'Identify a bilingual student close to target stores',
      v2:'Assign a store cluster',v2small:'One 20 × 20-mile student square; coordinate longer corridors',
      v3:'Visit, verify, report',v3small:'Confirm decision makers and POS readiness',
      suggestedNotAssigned:'20 × 20-mile student planning squares; none are mapped, staffed or approved yet.',
      statStores:'Prospective stores',statClusters:'Recruiting groups',statCampuses:'Campus candidates',statStates:'States in this list',
      explorerEyebrow:'02 / Visit territories',explorerHeading:'Find the college. See the stores. Plan the visit.',
      explorerSub:'Start with the recommended lead campus. Alternate campuses expand recruiting reach; they do not indicate signed partnerships.',
      planNotice:'Each student is assigned a proposed 20 × 20-mile square (not a radius). Store locations and boundaries need validation; South Florida may need two local student cells.',
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
      methodNote:'The revised target list supplied 34744 for Unidos 2, NW 31st Ave for Ocho Rios III and 02122 for Bowdoin. Verify each full store address and square boundary before dispatch.',
      nextSteps:'Before assigning a cluster',check1:'Confirm each target store’s exact address and decision maker',
      check2:'Secure store outreach approval from GFT',check3:'Recruit and train a local bilingual college ambassador',
      check4:'Approve a written roster, visit window and attribution rules',
      territoryPolicy:'Student territory: a proposed 20 × 20-mile square (400 sq. miles), NOT a 20-mile radius. South Florida is a recruiting corridor and may require two separate student squares. Boundaries and drive times are unverified.',
      growthEyebrow:"An expanding Ambassador Program",
      growthTitle:"These are the store clusters we have listed today.",
      growthBody:"The 23 prospective stores and 11 recruiting groups shown here are our current starting footprint, not a permanent limit. As more approved grocery stores join GFT Rewards, new clusters and territories will be added. These locations are recruiting targets, not guaranteed open assignments.",
      growthStudentLink:"College student? See the internship track",
      internEyebrow:"College student internship track",
      internHeading:"The same Ambassador Program. A hands-on internship opportunity.",
      internIntro:"Students can apply to the existing Ambassador Program and request the internship track. Keep the same responsibilities and bilingual training while learning how brands, grocers, and loyalty programs operate in the real world.",
      internBrandTitle:"Major brand campaigns",
      internBrandCopy:"Get experience supporting approved major-brand promotions, campaign preparation, retail launch coordination, and reporting.",
      internRetailTitle:"Retailer management",
      internRetailCopy:"Work hands-on with grocery managers, store onboarding, staff training, retailer communications, and account follow-up.",
      internShopperTitle:"Shopper loyalty",
      internShopperCopy:"Learn how shoppers unlock offers, redeem at checkout, and engage with rewards across participating retailers.",
      internAccountTitle:"Account-specific loyalty",
      internAccountCopy:"Understand store-specific promotions, account-level loyalty offers, tracking, measurement, and retailer engagement.",
      internVerifiedTitle:"Documented, verifiable internship experience",
      internVerifiedCopy:"For eligible students, approved work can be documented through an agreed work plan, activity or hours records, and supervisor review. Academic credit or acceptance as a verified internship requires school approval and written program terms; neither is automatic.",
      internApply:"Apply through the Ambassador Program →",
      footerHome:'Store Ambassador Program',footerAgency:'— A Registered GFT Rewards Agency'
    },
    es: {
      explorerNav:'Programa de embajadores',ambassadorNav:'Resumen del programa',apply:'Solicitar ser embajador',
      eyebrow:'01 / Programa de embajadores GFT · Universidades y tiendas',hero1:'Un campus.',hero2:'Una comunidad de tiendas.',
      wavesEyebrow:'Lanzamiento propuesto',wavesTitle:'Recluta los primeros cinco grupos de varias tiendas. Después amplía.',
      wavesSub:'Cinco grupos de varias tiendas abarcan 17 tiendas; después siguen seis sitios aislados. El cuadrado de 20 × 20 millas es una propuesta sin límites medidos.',
      wave1Tag:'FASE 1',wave2Tag:'FASE 2',wave1Title:'Reclutamiento para varias tiendas',wave2Title:'Cobertura de una sola tienda',waveStores:'tiendas',
      lede:'Recluta a un embajador bilingüe por cada cuadrado estudiantil propuesto de 20 × 20 millas. El corredor de cinco tiendas del sur de Florida no es una sola zona verificada.',
      explore:'Ver territorios actuales',workflow:'Ver el plan de visitas',
      targetDisclaimer:'Tiendas prospectivas solamente: no se ha confirmado la participación de tiendas ni acuerdos con universidades.',
      modelTitle:'MODELO DE CAMPO LOCAL',v1:'Reclutar en el campus',v1small:'Encontrar un estudiante bilingüe cerca de las tiendas',
      v2:'Asignar un grupo de tiendas',v2small:'Un cuadrado de 20 × 20 millas por estudiante',
      v3:'Visitar, verificar, informar',v3small:'Confirmar responsables y preparación del punto de venta',
      suggestedNotAssigned:'Cuadrados propuestos de 20 × 20 millas; aún sin límites, personal ni aprobaciones confirmadas.',
      statStores:'Tiendas prospectivas',statClusters:'Grupos de reclutamiento',statCampuses:'Campus candidatos',statStates:'Estados incluidos',
      explorerEyebrow:'02 / Territorios de visitas',explorerHeading:'Encuentra el campus. Identifica las tiendas. Planifica la visita.',
      explorerSub:'Comienza con el campus principal recomendado. Los campus alternativos amplían el reclutamiento; no representan convenios firmados.',
      planNotice:'Cada estudiante recibe un cuadrado propuesto de 20 × 20 millas (no es un radio). Los límites deben verificarse; el sur de Florida puede requerir dos zonas locales.',
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
      methodNote:'La lista actualizada indica 34744 para Unidos 2, NW 31st Ave para Ocho Rios III y 02122 para Bowdoin. Confirma las direcciones y los límites antes de visitar.',
      nextSteps:'Antes de asignar un grupo',check1:'Confirmar dirección exacta y responsable de cada tienda',
      check2:'Obtener aprobación de GFT para contactar las tiendas',check3:'Reclutar y capacitar a un estudiante bilingüe local',
      check4:'Aprobar por escrito la lista, horario y reglas de atribución',
      territoryPolicy:'Territorio estudiantil: un cuadrado propuesto de 20 × 20 millas (400 mi²), NO un radio de 20 millas. El corredor del sur de Florida puede requerir dos cuadrados. Límites y tiempos sin verificar.',
      growthEyebrow:"Programa de embajadores en expansión",
      growthTitle:"Estos son los grupos de tiendas publicados actualmente.",
      growthBody:"Las 23 tiendas prospectivas y los 11 grupos de reclutamiento constituyen la cobertura inicial, no un límite permanente. A medida que más supermercados aprobados se unan a GFT Rewards, se añadirán grupos y territorios. Son objetivos de reclutamiento, no asignaciones garantizadas.",
      growthStudentLink:"¿Eres estudiante? Consulta la modalidad de prácticas",
      internEyebrow:"Prácticas profesionales para estudiantes universitarios",
      internHeading:"El mismo Programa de Embajadores. Una oportunidad de prácticas reales.",
      internIntro:"Los estudiantes pueden solicitar la modalidad de prácticas dentro del Programa de Embajadores existente. Mantienen las funciones y capacitación bilingüe mientras conocen de primera mano a las marcas, los supermercados y los programas de lealtad.",
      internBrandTitle:"Campañas de grandes marcas",
      internBrandCopy:"Participa en promociones aprobadas de grandes marcas, preparación de campañas, coordinación de lanzamientos e informes.",
      internRetailTitle:"Gestión de comercios",
      internRetailCopy:"Trabaja directamente con gerentes de supermercados, incorporación de tiendas, capacitación, comunicación y seguimiento de cuentas.",
      internShopperTitle:"Lealtad del comprador",
      internShopperCopy:"Aprende cómo los compradores activan ofertas, canjean recompensas en caja y participan en las promociones de los comercios.",
      internAccountTitle:"Lealtad específica por cuenta",
      internAccountCopy:"Conoce promociones por tienda, ofertas de lealtad por cuenta, seguimiento, medición e interacción con los comercios.",
      internVerifiedTitle:"Experiencia de prácticas documentada y verificable",
      internVerifiedCopy:"Para estudiantes elegibles, el trabajo aprobado puede documentarse con un plan acordado, registros de actividades u horas y revisión del supervisor. El crédito académico o el reconocimiento como prácticas verificadas requieren aprobación de la institución y condiciones escritas; ninguno es automático.",
      internApply:"Solicita ingreso al Programa de Embajadores →",
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
    broward:{label:'Sur de Florida / corredor Broward–Miami-Dade',pitch:'Cinco tiendas en un mismo corredor de reclutamiento, pero todavía no en un único cuadrado verificado de 20 × 20 millas.',plan:['Bloque Broward: Ocho Rios III → Caribbean Best Market 1 → Ideal Foods Dania.','Bloque Miami-Dade: Caribbean Best Market 2 (North Miami) → Jomara Wholesale (Hialeah).','Revisa la cobertura exacta y asigna otro estudiante local si el corredor supera un cuadrado.','Un coordinador reúne los contactos, POS y seguimientos.'],note:'REVISAR LÍMITES: el corredor de cinco tiendas NO es un cuadrado verificado de 20 × 20 millas. Podría requerir dos células; confirma coordenadas y tiempos antes de asignar.'},
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
      foot.append(dom('span','cc-small-pill',text('20 × 20 mi proposed','20 × 20 mi propuesto')));
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
        S04:'Código postal corregido a 34744 según la lista actualizada; confirma la dirección.',
        S16:'Sufijo de la calle añadido según la lista actualizada; confirma la dirección.',
        S22:'Código postal normalizado a 02122 según la lista actualizada; confirma la dirección.'
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
    badges.append(dom('span','',c.state),dom('span','',getWave(c)),dom('span','',c.stores.length+' '+(c.stores.length===1?w().store:w().stores)),dom('span','',text('20 × 20 mi target','Meta 20 × 20 mi')));
    if(c.boundaryReview)badges.append(dom('span','cc-boundary-alert',text('CORRIDOR · footprint unverified','CORREDOR · límites sin verificar')));
    $('cc-route-link').href=routeLink(c);
    const lead=colleges[c.lead];focusMap(lead.name,lead.address,'campus');
    const campuses=$('cc-colleges');campuses.replaceChildren();
    campuses.append(renderCollege(c,c.lead,true));
    for(const id of c.alternates.slice(0,5))campuses.append(renderCollege(c,id,false));
    if(c.alternates.length>5){
      const more=dom('details','cc-more-colleges');
      more.append(dom('summary','',text('Show ','Mostrar ')+(c.alternates.length-5)+text(' more campuses',' campus adicionales')));
      const other=dom('div','cc-more-colleges-list');
      for(const id of c.alternates.slice(5))other.append(renderCollege(c,id,false));
      more.append(other);campuses.append(more);
    }
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
  function renderWaves(){
    for(const n of [1,2]){
      const pane=$('cc-wave-'+(n===1?'one':'two'));
      pane.replaceChildren();
      const wave=data.clusters.filter(c=>c.priority===n).sort((a,b)=>b.stores.length-a.stores.length||a.label.localeCompare(b.label));
      for(const c of wave){
        const item=dom('button','cc-wave-item');
        item.type='button';
        const label=dom('span','cc-wave-item-name',clusterName(c));
        const campus=dom('small','',colleges[c.lead].name);
        label.append(campus);
        const count=dom('b','',String(c.stores.length));
        item.append(label,count);
        item.addEventListener('click',()=>{
          stateFilter='ALL';waveFilter='all';searchTerm='';
          $('cc-priority').value='all';$('cc-search').value='';
          for(const btn of document.querySelectorAll('[data-state]')){
            const active=btn.dataset.state==='ALL';
            btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active));
          }
          select(c.id,true);
          $('explorer').scrollIntoView?.({behavior:'smooth',block:'start'});
        });
        pane.append(item);
      }
    }
  }
  function refreshLocale(){
    document.documentElement.lang=lang;
    document.title=text('Ambassador Program — Current Store Territories | GFT Rewards × Iconx.io',
      'Programa de embajadores — Territorios actuales | GFT Rewards × Iconx.io');
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
    renderList();renderDetail();renderWaves();
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
