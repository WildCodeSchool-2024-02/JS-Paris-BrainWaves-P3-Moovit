const AbstractRepository = require("./AbstractRepository");

class UserHasSportRepository extends AbstractRepository {
  constructor() {
    super({ table: "user_has_sport" });
  }

  async create(newTab){
    const format = `INSERT INTO ${this.table} (user_id, sport_id) VALUES ?`
    const [newSport] = await this.database.query(format, [newTab]);
      return newSport.affectedRows
  }

  
}

module.exports = UserHasSportRepository;
