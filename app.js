(() => {
  'use strict';
  // Only approved-to-list, store-backed recruiting targets appear as applicant choices.
  // Codes are distinct from the historical broad planning grid; backend independently validates.
  const $ = id => document.getElementById(id);
  const data = window.GFT_COLLEGE_PLAN;
  const available = [["treasure","FL-41"],["space","FL-42"],["hendry","FL-43"],["kissimmee","FL-44"],["polk","FL-45"],["tampa","FL-46"],["bradenton","FL-47"],["broward","FL-48"],["daytona","FL-49"],["boston","MA-50"],["brooklyn","NY-51"]].map(([id,code]) => {
    const cluster=data?.clusters?.find(c=>c.id===id);
    if(!cluster)throw new Error('Missing catalog cluster: '+id);
    return {...cluster,code};
  });
  const stores = Object.fromEntries(data.stores.map(s=>[s.id,s]));
  const formState=$('state'),select=$('territory');
  const cards=$('current-territory-list'),search=$('territory-search');
  let filter='ALL';
  const isSpanish=()=>window.GFTLocale?.getLocale?.()==='es';
  const say=(en,es)=>isSpanish()?es:en;
  const esLabels={
    treasure:'Fort Pierce / Costa del Tesoro',space:'Merritt Island / Costa Espacial',
    hendry:'LaBelle / Hendry',kissimmee:'Kissimmee',polk:'Winter Haven',
    tampa:'Gran Tampa y Valrico',bradenton:'Bradenton',
    broward:'Sur de Florida / corredor Broward–Miami-Dade',
    daytona:'Daytona Beach',boston:'Dorchester / Boston',brooklyn:'Canarsie / Brooklyn'
  };
  const label=c=>isSpanish()?(esLabels[c.id]||c.label):c.label;
  const address=store=>store.address||[store.street,store.city,store.state,store.zip,'USA'].filter(Boolean).join(', ');
  const mapLink=store=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(address(store));
  function populateTerritories(chosen=''){
    select.replaceChildren();
    const placeholder=document.createElement('option');
    placeholder.value='';placeholder.textContent=say('Select a current store territory','Selecciona un territorio actual');
    select.append(placeholder);
    for(const c of available){
      const option=document.createElement('option');
      option.value=c.code;option.textContent=label(c)+' ('+c.stores.length+' '+say(c.stores.length===1?'store':'stores',c.stores.length===1?'tienda':'tiendas')+')';
      select.append(option);
    }
    select.value=available.some(c=>c.code===chosen)?chosen:'';
    formState.value=select.value?select.value.slice(0,2):'';
  }
  function chooseTerritory(c){
    select.value=c.code;formState.value=c.state;
    document.querySelectorAll('.current-territory-card').forEach(card=>card.classList.toggle('active',card.dataset.cluster===c.id));
    $('ambassador-application').scrollIntoView?.({behavior:'smooth',block:'start'});
    select.focus?.({preventScroll:true});
  }
  function renderTerritories(){
    const q=search.value.toLowerCase().trim();
    const results=available.filter(c=>(filter==='ALL'||c.state===filter)&&[
      c.label,c.market,...c.stores.flatMap(id=>[stores[id].name,stores[id].city])
    ].join(' ').toLowerCase().includes(q));
    cards.replaceChildren();
    for(const c of results){
      const article=document.createElement('article');article.className='current-territory-card';
      article.dataset.cluster=c.id;
      const head=document.createElement('div');head.className='current-territory-head';
      const title=document.createElement('h3');title.textContent=label(c);
      const count=document.createElement('span');count.className='count-pill';
      count.textContent=c.stores.length+' '+say(c.stores.length===1?'store':'stores',c.stores.length===1?'tienda':'tiendas');
      head.append(title,count);
      const summary=document.createElement('p');summary.textContent=say('Store-backed recruiting group · '+c.state,'Grupo de reclutamiento con tiendas · '+c.state);
      const details=document.createElement('details');details.className='current-stores';
      const marker=document.createElement('summary');marker.textContent=say('View target stores','Ver tiendas objetivo');details.append(marker);
      const ul=document.createElement('ul');
      for(const id of c.stores){
        const store=stores[id],li=document.createElement('li'),a=document.createElement('a');
        a.href=mapLink(store);a.target='_blank';a.rel='noopener noreferrer';
        a.textContent=store.name;
        const small=document.createElement('small');small.textContent=address(store);
        li.append(a,small);ul.append(li);
      }
      details.append(ul);
      if(c.boundaryReview){
        const alert=document.createElement('p');alert.className='current-territory-warning';
        alert.textContent=say('Regional recruiting corridor; exact 20 × 20-mile student field coverage is not verified.','Corredor regional; todavía no se han verificado límites de 20 × 20 millas para estudiantes.');
        details.append(alert);
      }
      const apply=document.createElement('button');apply.type='button';apply.className='pillbtn gradient';
      apply.textContent=say('Apply for this territory →','Solicitar este territorio →');
      apply.addEventListener('click',()=>chooseTerritory(c));
      article.append(head,summary,details,apply);cards.append(article);
    }
    $('territory-count').textContent=String(results.length)+' '+say('listed groups','grupos publicados');
    if(results.length===0){
      const empty=document.createElement('p');empty.className='muted';
      empty.textContent=say('No current store groups match your search.','Ningún grupo actual coincide con tu búsqueda.');
      cards.append(empty);
    }
  }
  document.querySelectorAll('[data-territory-state]').forEach(button=>button.addEventListener('click',()=>{
    filter=button.dataset.territoryState;
    document.querySelectorAll('[data-territory-state]').forEach(b=>{
      const on=b===button;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));
    });
    renderTerritories();
  }));
  search.addEventListener('input',renderTerritories);
  select.addEventListener('change',()=>{
    const chosen=available.find(c=>c.code===select.value);
    formState.value=chosen?chosen.state:'';
    document.querySelectorAll('.current-territory-card').forEach(card=>card.classList.toggle('active',Boolean(chosen&&chosen.id===card.dataset.cluster)));
  });
  document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>{
    queueMicrotask(()=>{
      const selected=select.value;
      populateTerritories(selected);
      renderTerritories();
    });
  }));
  populateTerritories();
  renderTerritories();
 
  // Browser posts directly to the existing Iconx Supabase + Resend stack.
  // The applicant's email application is never invoked.
  const applicationEndpoint='https://yxfqfrgjjbxagrioeqzz.supabase.co/functions/v1/gft-store-ambassador-apply';
  const form=$('ambassador-form'),status=$('form-status'),button=$('submit-application');
  let submitting=false,submitted=false,submissionId=null;
  const generateId=()=>{
    if(globalThis.crypto?.randomUUID)return crypto.randomUUID();
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g,c=>(Number(c)^(Math.random()*16>>Number(c)/4)).toString(16));
  };
  async function postApplication(url,payload,timeout=15000){
    const controller=new AbortController(), timer=setTimeout(()=>controller.abort(),timeout);
    try{
      const r=await fetch(url,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload),
        signal:controller.signal,
      });
      const data=await r.json().catch(()=>({}));
      return {status:r.status,ok:r.ok,data};
    }finally{clearTimeout(timer);}
  }
  form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    if(submitting||submitted||!form.reportValidity())return;
    const d=Object.fromEntries(new FormData(form).entries());
    d.bilingual=!!d.bilingual;
    d.consent=!!d.consent;
    d.language=window.GFTLocale?.getLocale?.()==='es'?'es':'en';
    const chosenTerritory=available.find(c=>c.code===d.territory&&c.state===d.state);
    if(!chosenTerritory){
      status.className='status error';
      status.textContent='Please select a listed store territory.';
      return;
    }
    d.submission_id=submissionId ||= generateId();
    status.className='status';
    status.textContent='';
    if(!d.bilingual||!d.consent){
      status.className='status error';
      status.textContent='Bilingual confirmation and contact consent are required.';
      window.GFTLocale?.refresh?.();return;
    }
    if(d.website){
      status.className='status error';
      status.textContent='Please contact the recruiting team to apply.';
      window.GFTLocale?.refresh?.();return;
    }
    submitting=true;
    button.setAttribute('aria-busy','true');
    button.disabled=true;
    button.textContent='Sending your application securely…';
    window.GFTLocale?.refresh?.();
    try{
      let response;
      try{
        response=await postApplication(applicationEndpoint,d);
      }catch(networkError){
        // Same-origin proxy if the external endpoint is blocked by browser CORS/network rules.
        response=await postApplication('/api/apply',d,12000);
      }
      if(!response.ok||!response.data?.ok||!response.data?.received||!response.data?.emailed){
        status.className='status error';
        status.textContent=response.data?.received
          ? 'Your application was saved, but the recruiting email could not be sent. Please try again later.'
          : 'We could not submit your application right now. Please try again later.';
        return;
      }
      submitted=true;submissionId=null;
      form.reset();populateTerritories();
      status.className=response.data.confirmationSent===false?'status notice':'status ok';
      status.textContent=response.data.confirmationSent===true
        ? 'Application received! A confirmation email was accepted for delivery from GFTAmbassadors@iconx.io.'
        : response.data.confirmationSent===false
          ? 'Application received, but your acknowledgment email could not be sent. Our recruiting team has your application.'
          : 'Application received and sent for delivery to the recruiting team. Thank you!';
    }catch(error){
      status.className='status error';
      status.textContent='We could not submit your application right now. Please try again later.';
    }finally{
      submitting=false;
      button.removeAttribute('aria-busy');
      button.classList.toggle('is-submitted',submitted);
      button.textContent=submitted?'Application submitted ✓':'Submit my application →';
      button.disabled=submitted;
      window.GFTLocale?.refresh?.();
    }
  });
})();