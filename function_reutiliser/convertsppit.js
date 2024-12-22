module.exports = async (name) => {
    return`http://localhost:5000/get/${await name.split(" ").join("_")}`
}