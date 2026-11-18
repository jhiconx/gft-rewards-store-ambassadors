// GFT Store Ambassador email delivery is handled by the existing Iconx Supabase
// Edge Function, which securely stores applications and sends with Resend.
// This same-origin endpoint is a fallback for browsers blocking cross-origin fetch.
// It does not hold, request, or expose Resend or Supabase service credentials.
const EDGE='https://yxfqfrgjjbxagrioeqzz.supabase.co/functions/v1/gft-store-ambassador-apply';
module.exports=async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  res.setHeader('X-Content-Type-Options','nosniff');
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({ok:false,error:'Method not allowed'});}
  if(Number(req.headers['content-length']||0)>6500)return res.status(413).json({ok:false,error:'Request too large'});
  let body=req.body;
  if(typeof body==='string'){try{body=JSON.parse(body)}catch{return res.status(400).json({ok:false,error:'Invalid request'})}}
  if(!body||typeof body!=='object'||Array.isArray(body))return res.status(400).json({ok:false,error:'Invalid request'});
  try{
    const response=await fetch(EDGE,{
      method:'POST',
      headers:{'Content-Type':'application/json','Origin':'https://gft-rewards-store-ambassadors.vercel.app'},
      body:JSON.stringify(body),
      signal:AbortSignal.timeout(12000),
    });
    const data=await response.json().catch(()=>({ok:false,error:'The recruiting service returned an invalid response'}));
    return res.status(response.status).json(data);
  }catch{
    return res.status(503).json({ok:false,error:'Recruiting service is temporarily unavailable. Please try again later.'});
  }
};