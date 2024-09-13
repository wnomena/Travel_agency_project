

module.exports = (mongoose) =>{
    (async()=>{
        try {
          await mongoose.connect("mongodb+srv://sandaarnaud:yuW3J1CASUSwfc0q@capsurmada.yqfib.mongodb.net/?retryWrites=true&w=majority&appName=Capsurmada/all_value")
          console.log("Connexion reussi")
        } catch (error) {
            console.log("Le serveur ne veut pas se lancer ")
        }
    })()
}
// mongodb+srv://sandaarnaud:yuW3J1CASUSwfc0q@capsurmada.yqfib.mongodb.net/?retryWrites=true&w=majority&appName=Capsurmada
//mongodb://localhost:27017/agence_de_voyage