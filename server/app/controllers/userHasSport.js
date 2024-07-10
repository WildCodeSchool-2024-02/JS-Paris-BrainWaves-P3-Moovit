const tables = require("../../database/tables");

const add = async (req, res, next) => {
    const {id, sports} = req.body
    const newTab = []
    if (sports.length > 0){
        sports.forEach((sport) => newTab.push([id, sport]))
    } else {
        await tables.userHasSport.deleteSports(id)
        return res.sendStatus(204)
    }
    try {
        if (sports.length > 0){
            const response = await tables.userHasSport.create(newTab, id)
            return res.status(201).json(response)
        }
        return res.sendStatus(200)
    } catch (error) {
        return next(error)
    }
}


module.exports = { add }