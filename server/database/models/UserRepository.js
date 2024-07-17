const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async create(email, password, name, level) {
    const [newUser] = await this.database.query(
      `INSERT INTO ${this.table}
            (email, password, name, level)
            VALUE (?, ?, ?, ?)`,
      [email, password, name, level]
    );
    return newUser.insertId;
  }

  async readByEmail(email) {
    const user = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email = ?`, [email]
    )
    return user;
  }

  async insertName(name, id) {
    const [inserted] = await this.database.query(
      `UPDATE ${this.table} SET name = ? WHERE id = ?`,
      [name, id]
    )
    return inserted.affectedRows
  }

  async updateLevel(level, id) {
    const [inseted] = await this.database.query(
      `UPDATE ${this.table} SET level = ? WHERE id = ?`,
      [level, id]
    )
    return inseted.affectedRows
  }

  async totalTrainingAmonth(id, body) {
    const [totalTraining] = await this.database.query(`SELECT COUNT(*) AS total_training FROM training WHERE user_id = ? AND date BETWEEN ? AND ?`, 
    [id, body.firstDay, body.lastDay]
  );
  return totalTraining
  }

  async totalValidateTraining(id, body) {
    const [totalTraining] = await this.database.query(`SELECT COUNT(*) AS total_validate FROM training WHERE user_id = ? AND is_completed = 1 AND date BETWEEN ? AND ?`, 
      [id, body.firstDay, body.lastDay]
  );
  return totalTraining
  }

  async totalSportValidate(id, body) {
    const [total] =  await this.database.query(`SELECT sport.name, COUNT(*) AS total FROM sport 
      JOIN training ON sport.id = training.sport_id 
      WHERE user_id = ? AND is_completed = 1 AND date BETWEEN ? AND ? GROUP BY sport.name`,
      [id, body.firstDay, body.lastDay]
    )
    return total
  }
}

module.exports = UserRepository;
