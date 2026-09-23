const {onRequest}=require("firebase-functions/v2/https");
const {defineSecret}=require("firebase-functions/params");
const admin=require("firebase-admin");
const axios=require("axios");
admin.initializeApp();
const PAYSTACK_SECRET=defineSecret("PAYSTACK_SECRET_KEY");
exports.verifyPaystack=onRequest({cors:true,secrets:[PAYSTACK_SECRET]},async(req,res)=>{
 try{
  const ref=req.query.reference||req.body.reference;
  if(!ref)return res.status(400).json({error:"reference required"});
  const r=await axios.get(`https://api.paystack.co/transaction/verify/${encodeURIComponent(ref)}`,{headers:{Authorization:`Bearer ${PAYSTACK_SECRET.value()}`}});
  if(r.data?.data?.status!=="success")return res.status(400).json({status:"not_successful"});
  res.json({status:"success",data:r.data.data});
 }catch(e){res.status(500).json({error:"verification failed"});}
});