const path = require("node:path")
const fs = require("node:fs")
module.exports = (app) => {
    app.get("/get/:name",(req,res)=> {
        const imageName = req.params.name;
        console.log(imageName)
        const imagePath = path.join(__dirname, '../file', imageName);
        console.log(imagePath)
        try {
          if (fs.existsSync(imagePath)) {
            res.sendFile(imagePath);
          } else {
            res.status(404).send('Image not found');
          }
        } catch (error) {
          console.error(error);
          res.status(500).send('Server error');
        }
      });
    }
    