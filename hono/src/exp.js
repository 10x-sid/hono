import { Hono } from "hono";
import { stream, streamText } from "hono/streaming";
import {v4 as uuidv4} from "uuid" //random stirng which is universly unquie atlest till 3100

let videos =[];

//all the vidoes on the server

const app = new Hono()
app.get('/', async c =>{
    return streamText(c ,async(stream)=>{
       for(const video of videos){
        await stream.writeln(JSON.stringify(video))
        await stream.sleep(1000)
       }
    })
})

//find route 
app.get('/find/:id',async (c)=>{
    const id  =  c.req.param('id')
    const res = await  videos.find( video => video.id === id)
    return c.json(res)

})


//update the video usign id (uuid)

app.put('/update/:id',async (c)=>{
    const id = c.req.param('id')
    const res = await c.req.json()

    const index = videos.findIndex(video=> video.id === id)
    if(index ===-1){
        return c.text("indvalid id")
    }
   
     videos[index]={
            ...videos[index],
            videoName: res.videoName,
            duration:res.duration
        }
    
    
    return c.json(videos[index])
})

//delted using id

app.delete('/del/:id',async(c)=>{
    const id = c.req.param('id')
     videos = videos.filter(video=> video.id!== id)
     return c.json(videos)
})

//delte all
app.delete('/',async(c)=>{
    videos=[]
    return c.text("all delted")
})

app.post('/video',async (c)=>{
    const res = await c.req.json()
    const video = {
        id:uuidv4(),
        videoName:res.videoName,
        channelName:res.channelName,
        duration:res.duration


    }
    videos.push(video)
    console.log(videos);
    return c.json(videos)
})

export default app;
