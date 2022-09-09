
const express = require ("express")
const hbs =require("hbs")
const path = require("path")
const bodyParser=require("body-parser")
const nodemailer = require("nodemailer")
const dotenv= require("dotenv")
dotenv.config()
const app = express()

const transporter= nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: 587,
    secure:false,
    requireTLS:true,
    auth:{
        user:process.env.MAILSENDER,
        pass:process.env.PASSWORD
    }

})
app.use(express.static("./views"))
//app.set("views,"./views")
app.set("view engine","hbs")
hbs.registerPartials(path.join(__dirname,"./views/partials"))

const encoder = bodyParser.urlencoded()

app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/about",(req,res)=>{
    res.render("about")
})
app.get("/faq",(req,res)=>{
    res.render("faq")
})
app.get("/services",(req,res)=>{
    res.render("services")
})
app.get("/contact",(req,res)=>{
    console.log(process.env.MAILSENDER);
    res.render("contact",{show:false})
})
app.post("/contact",encoder,(req,res)=>{
    let mailOption = {
        from:process.env.MAILSENDER,
        to:req.body.email,
        subject:"Your Query Recieved !!! : Team Luxury Furniture",
        text:"Thanks to Share Your Query With Us !!!\nOur Team Will Contact You Soon!!!"
    }
    transporter.sendMail(mailOption,(error,data)=>{
        if(error)
        console.log(error);
    })
     mailOption = {
        from:process.env.MAILSENDER,
        to:process.env.MAILSENDER,
        subject:"One New Query Recieved!!!",
        text:`
             One New Query Recieved
             Name      : ${req.body.name}
             Email     : ${req.body.email}
             Phone     : ${req.body.phone}
             Subject   : ${req.body.subject}
             Message   : ${req.body.message}
        `
    }
    transporter.sendMail(mailOption,(error,data)=>{
        if(error)
        console.log(error);
    })

    res.render("contact",{show:true})
})
app.get("/gallery",(req,res)=>{
    res.render("gallery")
})

var PORT = process.env.PORT||8000
app.listen(PORT,()=>console.log(`Server is Running at Port ${PORT}`))