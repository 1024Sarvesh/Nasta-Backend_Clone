// express install karne ke liye "npm i -D express " likhna padata hai aur phir
//  nodemon install karne ke liye "npm i -D nodemon " likhna padata hai 
import express from 'express'
import{prisma} from "./prisma/prisma_client.mjs"
const server = express()

const port = 3000;

server.use(express.json())


server.post("/signup",async(req,res)=>{
    console.log(req.body)
    const user1 = await prisma.user1.create({
        data:{

            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }
    })
    res.json({user1})
})

server.post("/login",async(req,res)=>{
    const user1 = await prisma.user1.findUnique({
        where:{
            email:req.body.email
        }
    }) 
    if(!user1){
        res.status(404).json({
            "error":"user not found"
        })
        return
    }
    if(user1.password !== req.body.password){
        res.status(401).json({
            "error":"password not found"
        })
        return
    }
    res.json({massage:"login successfull"})
})


server.listen(port,()=>{
    console.log(`server started on ${port} `)
})