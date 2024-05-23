import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";
import { logger } from "hono/logger";
import DBconnect from "./db/connect"
import Youtube from "./db/utube"
const app = new Hono()

//middlewares
app.use(poweredBy())
app.use(logger())

//handel db connect and on the failure also 

DBconnect().then(()=>{
  //get all 
    app.get('/',async c=>{
      const res =  await Youtube.find()
      return c.json(res.map(value=>{
        return value.toObject() //to remove all the mongo db related information
      }),200) //to send status jsut a comma after the actual res 
    })

  //create teh video document 

  app.post('/',async c=>{
    let body = await c.req.json()
    if(!body.thumbnailUrl){
      delete body.thumbnailUrl
    }

    
    const data = new Youtube(body) //another method to update data just maek a copy of model and parse the data which is in the schmea format of the model
    try{
      let res = await data.save() // save the 
      return c.json(res.toObject(),200)
    }catch(err){
      return c.json((err as any)?.message || "interanl server error",500) // thsi is err.message but where we assign implitticty tyoe to err to make it err as any and optiona l changing that if err exit then give msg but if not and then throuw intenal server error

    }
    

  })



}).catch(err=>{
  app.get('/*',c=>{
    return c.json( {msg:`fail to connet db ${err.message}`})
  })
})

app.onError((err,c)=>{
  return c.text("app failed"+err.message)
})