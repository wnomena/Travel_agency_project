const boucle_infinie = () =>{
    let intervalleID = setInterval(() => {
        if(require("../bd/local_storage_for_token").length !== 0){
            clearInterval(intervalleID)
            console.log("xnxx")
            let x = setTimeout(() => {
                while (require("../bd/local_storage_for_token").length !== 0) {
                    require("../bd/local_storage_for_token").pop()
                }
                clearInterval(y)
                boucle_infinie()
            }, 3600000*8);
            let y = setInterval(() => {
                console.log("commencement")
                if(require("../bd/local_storage_for_token").length == 0){
                    clearTimeout(x)
                    clearInterval(y)
                    console.log("fin")
                    boucle_infinie()
                }
            }, 1000);
        }
    }, 1000);

}
module.exports = boucle_infinie