const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailersend.net",
  port: 587,
  auth: {
    user: "MS_m62Ww2@trial-0r83ql37r3pgzw1j.mlsender.net",
    pass: "mssp.37N3n3X.zr6ke4ne7r94on12.ReCnLgE",
  },
});

// async..await is not allowed in global scope, must use a wrapper
 const main =  async(name,mail,object,corps) => {
  try {
      // send mail with defined transport object
      return await transporter.sendMail({
        from: '"Service client CAPONMADA" <MS_m62Ww2@trial-0r83ql37r3pgzw1j.mlsender.net>', // sender address
        to: "sandaarnaud@gmail.com", // list of receivers
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
