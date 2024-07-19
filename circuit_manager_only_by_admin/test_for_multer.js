const multer =require("../multer_middleware")
module.exports = (app) =>{
app.post('/image',multer, (req, res) => {
        res.send('File uploaded!');
    });
  };
  //tsy mety 
