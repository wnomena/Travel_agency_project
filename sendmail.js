const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailersend.net",
  port: 587,
  auth: {
    user: "MS_RI1MPK@noreply.caponmada.com",
    pass: "mssp.YgXsTGS.0p7kx4xnv6vg9yjr.x41cTIV",
  },
});

// async..await is not allowed in global scope, must use a wrapper
 const main =  async(name,mail,object,corps,mail2) => {
  try {
      // send mail with defined transport object
      return await transporter.sendMail({
        from: '"CAPONMADA noreply" <MS_RI1MPK@noreply.caponmada.com>', // sender address
        to: `contact@caponmada.com`, // list of receivers
        subject: "New client", // Subject line
        text: ``, // plain text body
        html: `<h1>New task for ${name} with mail : ${mail} </h1>  \n <h5>Object of mail : \n ${object}</h5><p>Corps of mail : ${corps}</p>`, // html body
      });
    
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

    
    main().catch(console.error);
  } catch (error) {
    console.log(`error : ${error}`)
  }
}

module.exports = {
    main : main
}
