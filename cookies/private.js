
const setCookies = function ({res,name,value}) {
    res.cookies(`${name}`,`${value}`)
}
const getCookies = function ({req,name}) {
    req.cookies(`${name}`)
}
module.exports = {
    setCookies,
    getCookies
}