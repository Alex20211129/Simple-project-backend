import express from 'express';
import nodemailer from 'nodemailer';

const emailRouter = express.Router();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.Email_user,
    pass: process.env.Email_pass,
  }
});


emailRouter.post('/', (req, res) => {
    const main = async () => {
      const info = await transporter.sendMail({
        from: `"${req.body.name}" <foo@example.com>`, 
        to: 'kale51882cheryu@gmail.com', 
        subject: req.body.title, 
        text: req.body.text + `郵件來自於${req.body.email}`, 
      });
      console.log("Message sent: %s", info.messageId);
     res.status(200).send('success');   
    }
    main().catch(error=>{
        console.log(error);
        res.status(401).send('Failure')
    })
});



export default emailRouter