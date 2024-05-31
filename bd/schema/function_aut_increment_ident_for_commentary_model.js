module.exports = async(commentary_model) =>{
    let table = []
    await commentary_model.find({}).then((a)=>{
        const c =  a.reduce((a,b)=> Math.max(a.id,b.id))
        table.push(c + 1)
    })
    return table[0]
}