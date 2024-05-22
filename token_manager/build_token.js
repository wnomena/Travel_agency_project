
module.exports = async(res) =>{
const value_to_return = []
const random_alphabet_for_token = ["a","z","e","r","t","y","u","i","o","p","q","s","d","f","g","h","j","k","l","m","w","x","c","v","b","n"]
const scrypt = require("bcrypt")
const token_value = require("./token_storage")
let random_for_token = random_alphabet_for_token[Math.floor(Math.random() * 25)]
console.log(random_for_token)
await scrypt.hash(`${random_for_token}`,10).then((a)=>{
    while (value_to_return.length !== 0) {
        value_to_return.pop()
    }
    let d = new Date(Date.now() + ((3600 * 8) * 1000))
    // console.log(d)
    token_value.push(btoa(random_for_token))
    value_to_return.push(a)
    res.cookie(`username_login_for_travel_agency=${btoa(random_for_token)}; expires=${d.toUTCString()},path="/"`)
    // console.log(`username_login=${btoa(random_for_token)}; expires=${d.toUTCString()},path="/"`)
    console.log(d.toUTCString())
    console.log("value_to_return[0] : " + value_to_return[0])
})
console.log("value_to_return[0] : " + value_to_return[0])
    return value_to_return[0]
}