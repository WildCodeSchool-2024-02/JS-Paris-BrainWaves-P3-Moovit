const tables = require("../../database/tables");

const add = async (req, res, next) => {
    const {id, sports} = req.body
    const newTab = []
    if (sports){
        sports.forEach((sport) => newTab.push([id, sport]))
    }
    try {
        if (sports.length === 0){
            res.sendStatus(200)
        }
        if (sports.length > 0){
            const response = await tables.userHasSport.create(newTab)
            res.status(201).json(response)
        }
    } catch (error) {
        next(error) 
    }
}

module.exports = { add }