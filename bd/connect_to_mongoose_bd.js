

module.exports = (mongoose) =>{
    (async()=>{
        try {
          await mongoose.connect("mongodb://localhost:27017/agence_de_voyage")
          console.log("Connexion reussi")
        } catch (error) {
            console.log("Le serveur ne veut pas se lancer ")
        }
    })()
}
// new Promise((resolve)=>{
//     resolve(mongoose.connect("mongodb://localhost:27017/agence_de_voyage"))
// }).then((a)=>{
//     if(a){
//         console.log("c est bon")
//     }
// }).catch(error=>{
//     console.log("fdrgdxfg")
// })