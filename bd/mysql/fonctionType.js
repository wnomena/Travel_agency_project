const config = {
    USER : "caponmad_caponmada",
    NAME : "caponmad_database",
    HOST : "mala.gasyweb.com",
    PASS : "Caponmada.com2025",
    KEY : "azertyuiopqsdfghjklm"
}
const forceInt = function (res) {
    try {
        const a = parseInt(res.toString())
        if(a) return 1
    } catch (error) {
        return 0
    }
}
module.exports = {config,forceInt}
