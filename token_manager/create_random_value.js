module.exports = async() =>{
    const bcrypt = require("bcrypt")
    let return_value = []
    const lettre = "azertyuopqsdfghjklmwxcvbn"
    const Maj = "AZERTYUIOPQSDFGHJKLMWXCVBN"
    const number = [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0]
    const token_array = [lettre,number,Maj]
    let length = Math.floor(Math.random() * (100 - 50)) + 50
    let array_asembly;
    for(let x = 0; x <= length; x++){
        if(array_asembly == undefined){
            array_asembly = token_array[Math.floor(Math.random() * 2)][Math.floor(Math.random() * 25)]
        }else{
            array_asembly = array_asembly + token_array[Math.floor(Math.random() * 3)][Math.floor(Math.random() * 25)]
        }
    }
    // console.log(return_value)
    return array_asembly
}
//api est fonctionnel=