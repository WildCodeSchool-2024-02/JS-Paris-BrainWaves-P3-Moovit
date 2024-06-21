const AbstractRepository = require("./AbstractRepository");

class TipsRepository extends AbstractRepository {
  constructor() {
    super({ table: "tip" });
  }

  async readType(type) {
    const tips = await this.database.query(
      `SELECT * FROM ${this.table} WHERE type = ?`, [type]
  );
  return tips;
  }


}

module.exports = TipsRepository;
