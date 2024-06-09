module.exports = async(commentary_model) =>{
    let table = []
    await commentary_model.find({}).then((a)=>{
        if(a == "" || a == []){
            
            table.push(0)
        }else{
            a.forEach(element => {
                table.push(element.identifiant)
           });
        }
    })
    return parseInt(table.reduce((a,b) => Math.max(a,b))) + 1

}