const tables = require("../../database/tables");

const browse = async (req, res, next) => {
    try {
        const users = await tables.sport.readAll();
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

module.exports = { browse };