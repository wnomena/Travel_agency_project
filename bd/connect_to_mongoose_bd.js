

module.exports = (mongoose) =>{
    (async()=>{
        try {
          await mongoose.connect("mongodb://localhost:27017/agence_de_voyage")
          console.log("Connexion reussi")
        } catch (error) {
            console.log("Le serveur ne veut pas se lancer ", error)
        }
    })()
}
// mongodb+srv://sandaarnaud:yuW3J1CASUSwfc0q@capsurmada.yqfib.mongodb.net/?retryWrites=true&w=majority&appName=Capsurmada
//mongodb+srv://wnomena58:Fifaliana2712@cluster0.2z4ay.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0