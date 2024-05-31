module.exports = async(commentary_model) =>{
    let table = []
    await commentary_model.find({}).then((a)=>{
        console.log(a)
        if(a == "" || a == []){
            table.push(1)
        }else{
            a.forEach(element => {
                table.push(element.id)
           });
        }
    })
    return Math.max(table) + 1

}