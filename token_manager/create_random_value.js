module.exports = (res,navigation_token,bcrypt) =>{
    let return_value = []
    const lettre = "azertyuopqsdfghjklmwxcvbn"
    const Maj = "AZERTYUIOPQSDFGHJKLMWXCVBN"
    const number = [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0]
    const caratere = "&é(-è_çà)=:!()<>|+‹›⁽⁾-{}«»&é(-è_çà)=:!()<>|+‹›⁽⁾-{}«»"
    const token_array = [lettre,number,caratere,Maj]
    let length = Math.floor(Math.random() * (100 - 50)) + 50
    let array_asembly;
    for(let x = 0; x <= length; x++){
        if(array_asembly == undefined){
            array_asembly = token_array[Math.floor(Math.random() * 3)][Math.floor(Math.random() * 25)]
        }else{
            array_asembly = array_asembly + token_array[Math.floor(Math.random() * 3)][Math.floor(Math.random() * 25)]
        }
    }
    let d;
    if(navigation_token == "usename_to_navigate_and_register_on_bd"){
        d = new Date(Date.now() + ((3600 * 8) * 1000))
    }else{
        d = new Date(Date.now() + ((3600 /2) * 1000))
    }
    console.log('res.cookie(`usename_to_navigate_and_register_on_bd=${btoa(array_asembly).toString()} ;expires=${d.toUTCString().toString()};path:"/"`)'.length,'res.cookie(`usename_to_navigate_and_register_on_bd=${btoa(array_asembly).toString()} ;expires=${d.toUTCString().toString()};path:"/"`)'[58])
    res.cookie(`${navigation_token}=${array_asembly} ;expires=${d.toUTCString().toString()};path:"/"`)   
    bcrypt.hash(array_asembly,10).then((g)=>{
        return_value.push(g)
    })
    return return_value[0]
}