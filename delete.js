module.exports = (mongoose) => {
    mongoose.deleteMany().then((res) => {
        console.log(res)
    })
}