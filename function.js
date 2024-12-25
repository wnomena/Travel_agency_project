
module.exports = (app) => {
    app.deleteMany({}).then((res) => {
        console.log(res)
    })
}