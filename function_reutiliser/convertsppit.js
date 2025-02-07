module.exports = async (name) => {
    return`https://travel-agency-project.onrender.com/get/${await name.split(" ").join("_")}`
}