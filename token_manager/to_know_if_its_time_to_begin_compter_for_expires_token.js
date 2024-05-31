module.exports = (fonction) =>{
     let set_intervalle = setInterval(() => {
        if(require("../bd/storage_for_value_to_start_token")[require("../bd/storage_for_value_to_start_token").length - 1] == 1){
            clearInterval(set_intervalle)
            fonction()
            console.log(1)
        }
    }, 1000);
}