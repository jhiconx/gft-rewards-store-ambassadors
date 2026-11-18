// Vercel serverless API. Requires RESEND_API_KEY and GFT_APPLICATION_FROM
// configured as Vercel environment variables before direct website delivery works.
// No secret is sent to or stored in the browser. No applicant data is logged.
// Both recruiting teams receive each application. GFT_APPLICATION_TO may add optional recipients.
const requiredRecipients = ['rcramer@iconx.io', 'support@gftrewards.com'];
const extraRecipients = (process.env.GFT_APPLICATION_TO || '').split(/[,;]/).map(v => v.trim().toLowerCase()).filter(Boolean);
const recipients = [...new Set([...requiredRecipients, ...extraRecipients])];
const validStates = new Set(['FL','NY']);
const MAX_LENGTHS={full_name:150,email:254,mobile:40,state:2,territory:12,base_city:120,retail_experience:1600,website:200};
function clean(body){
  const x={};
  for(const [key,max] of Object.entries(MAX_LENGTHS)) x[key]=String(body[key]??'').trim().slice(0,max+1);
  x.bilingual=body.bilingual===true;
  x.consent=body.consent===true;
  return x;
}
function safe(value){return String(value||'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');}
module.exports = async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({ok:false,error:'Method not allowed'});}
  if(Number(req.headers['content-length']||0)>10000)return res.status(413).json({ok:false,error:'Request too large'});
  let body=req.body;
  if(typeof body==='string'){try{body=JSON.parse(body);}catch{return res.status(400).json({ok:false,error:'Invalid application'});}}
  if(!body||typeof body!=='object'||Array.isArray(body))return res.status(400).json({ok:false,error:'Invalid application'});
  const d=clean(body);
  if(d.website)return res.status(400).json({ok:false,error:'Invalid application'});
  if(Object.entries(MAX_LENGTHS).some(([key,max])=>d[key].length>max))return res.status(400).json({ok:false,error:'A field is too long'});
  if(d.full_name.length<2||!/^\S+@\S+\.\S+$/.test(d.email)||d.mobile.replace(/\D/g,'').length<7||d.base_city.length<2||!validStates.has(d.state)||!new RegExp(`^${d.state}-\\d{2}$`).test(d.territory)||!d.bilingual||!d.consent)return res.status(400).json({ok:false,error:'Please complete all required fields'});
  if(!process.env.RESEND_API_KEY||!process.env.GFT_APPLICATION_FROM)return res.status(503).json({ok:false,error:'Recruiting service is not configured. Use email draft fallback.'});
  const html=`<h2>GFT Rewards Store Ambassador Application</h2><table border="0" cellpadding="8" cellspacing="0">${[
    ['Name',d.full_name],['Email',d.email],['Mobile',d.mobile],['State',d.state],['Territory',d.territory],['Applicant city or ZIP',d.base_city],['Bilingual English / Spanish','Confirmed'],['GFT platform training','Acknowledged'],['Applicant consent','Confirmed'],['Retail experience',d.retail_experience||'Not provided']
  ].map(([a,b])=>`<tr><th align="left">${safe(a)}</th><td>${safe(b)}</td></tr>`).join('')}</table>`;
  try{
    const result=await fetch('https://api.resend.com/emails',{
      method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},
      body:JSON.stringify({from:process.env.GFT_APPLICATION_FROM,to:recipients,reply_to:d.email,subject:`GFT Store Ambassador — ${d.territory} — ${d.full_name}`,html})
    });
    const data=await result.json().catch(()=>({}));
    if(!result.ok||!data.id)return res.status(502).json({ok:false,error:'Delivery was not confirmed. Use email draft fallback.'});
    return res.status(200).json({ok:true,received:true});
  }catch{return res.status(502).json({ok:false,error:'Delivery was not confirmed. Use email draft fallback.'});}
};