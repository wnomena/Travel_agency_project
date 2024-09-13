const boucle_infinie = () =>{
    let intervalleID = setInterval(() => {
        // console.log("token lancé")
        if(require("../bd/local_storage_for_token").length !== 0){
            console.log(require("../bd/local_storage_for_token")[0])
            clearInterval(intervalleID)
            let x = setTimeout(() => {
                // console.log("reset")
                while (require("../bd/local_storage_for_token").length !== 0) {
                    require("../bd/local_storage_for_token").pop()
                }
                clearInterval(y)
                boucle_infinie()
            }, 3600000*8);
            let y = setInterval(() => {
                if(require("../bd/local_storage_for_token").length == 0){
                    clearTimeout(x)
                    clearInterval(y)
                    // console.log("fin")
                    boucle_infinie()
                }
            }, 1000);
        }
    }, 1000);

}
module.exports = boucle_infinie