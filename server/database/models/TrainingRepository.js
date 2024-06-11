const AbstractRepository = require("./AbstractRepository");

class TrainingRepository extends AbstractRepository {
  constructor() {
    super({ table: "training" });
  }

  async readAll() {
    const [rows] = await this.database.query(
        `select * from ${this.table}`
    )
    return rows;
  }

  async readByDay(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where date(date) = curdate() and user_id = ?`, [id],
    );
    return rows;
  }
}

module.exports = TrainingRepository;
