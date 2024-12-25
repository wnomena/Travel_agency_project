
const find = async(a) => {
    let array = []
    a.find().then((response) => {
        array = [...response]
    })

    return array
}
module.exports = {
    find : find
}