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
 const main =  async(name,mail,object,corps) => {
  try {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Service client CAPONMADA" <MS_RI1MPK@noreply.caponmada.com>', // sender address
        to: "contact@caponmada.com", // list of receivers
        subject: "New client", // Subject line
        text: `New task for ${name}<${mail}>`, // plain text body
        html: `<h5>Object of mail : \n ${object}</h5><p>Corps of mail : ${corps}</p>`, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

    
    main().catch(console.error);
  } catch (error) {
    console.log(`error : ${error}`)
  }
}

module.exports = {
    main : main
}
