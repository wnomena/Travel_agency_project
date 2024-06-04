function boucle_infinie(){
    let intervalleID = setInterval(() => {
        if(require("../bd/storage_to_begin_set_time_out_for_delete_forget_pass").length !== 0){
            clearInterval(intervalleID)
            let compter_log_out =  setTimeout(() => {
                while (require("../bd/storage_to_begin_set_time_out_for_delete_forget_pass").length !== 0){
                    require("../bd/storage_to_begin_set_time_out_for_delete_forget_pass").pop()
                }
                boucle_infinie()
            }, 1800000);
            let log_out_detector = setInterval(() => {
                if(require("../bd/storage_to_begin_set_time_out_for_delete_forget_pass").length == 0 && compter_log_out){
                    clearTimeout(compter_log_out)
                    clearInterval(log_out_detector)
                }
                boucle_infinie()
            }, 1000);
        }
    }, 1000);
}
module.exports = boucle_infinie