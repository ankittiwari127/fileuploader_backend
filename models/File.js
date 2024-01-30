const mongoose=require("mongoose");
const nodemailer=require("nodemailer");
const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        
    },
    tags:{
        type:String,
        
    },
    email:{
        type:String,
        
    },
})
//post middleware to send email
//ye doc means jo save hai db me 
//hamesa ye handler mongoose.model ke upar likha jata hai
fileSchema.post("save",async function(doc){
try {
    console.log(doc);
    //creation of transporter
    let transporter=nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS, 
        }
    })
    //SEND MAIL
    let info=await transporter.sendMail({
        from:`tiwari`,
        to:doc.email,
        subject:"file uploaded successfully land ho tm",
        html:`<h2>kya bsdk</h2> <p>file uploaded   view here:<a href="${doc.imageUrl}"> ${doc.imageUrl}</a></p>`
    })
    console.log("info",info);
    
} catch (error) {
    console.log(error);
    
}
})
const file=mongoose.model("File",fileSchema);
module.exports=file;
