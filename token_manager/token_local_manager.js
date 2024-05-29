module.exports = () =>{
    console.log("set_timeout_lancé")
    setTimeout(() => {
        for(let i = 0;i < require("../bd/local_storage_for_token").length + 1 ; i++){
            require("../bd/local_storage_for_token").pop()
        }
    }, 288000000);
}