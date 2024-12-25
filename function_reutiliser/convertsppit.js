module.exports = async (name) => {
    return`https://nomena.caponmada.com/get/${await name.split(" ").join("_")}`
}