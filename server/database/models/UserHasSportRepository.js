const AbstractRepository = require("./AbstractRepository");

class UserHasSportRepository extends AbstractRepository {
  constructor() {
    super({ table: "user_has_sport" });
  }

  async create(newTab, id){
    await this.database.query(`DELETE FROM ${this.table} WHERE user_id = ?`, [id])
    const format = `INSERT INTO ${this.table} (user_id, sport_id) VALUES ?`
    const [newSport] = await this.database.query(format, [newTab]);
      return newSport.affectedRows
  }

  async deleteSports(id) {
    const deletedTraining = await this.database.query(
      `DELETE FROM ${this.table} WHERE user_id = ?`,
      [id]
    );
    return deletedTraining;
  }

  
}

module.exports = UserHasSportRepository;
