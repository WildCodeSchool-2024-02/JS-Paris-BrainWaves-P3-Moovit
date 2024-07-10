const tables = require("../../database/tables");

const add = async (req, res, next) => {
    const {id, sports} = req.body
    const newTab = []
    if (sports){
        sports.forEach((sport) => newTab.push([id, sport]))
    }
    try {
        if (sports.length > 0){
            const response = await tables.userHasSport.create(newTab)
            return res.status(201).json(response)
        }
        return res.sendStatus(200)
    } catch (error) {
        return next(error)
    }
}


module.exports = { add }