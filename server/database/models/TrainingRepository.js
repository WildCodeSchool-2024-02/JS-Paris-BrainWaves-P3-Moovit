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

  async readOne(id) {
    const [training] = await this.database.query(
        `select * from ${this.table} WHERE id = ?`, [id]
    )
    return training;
  }

  async readToday(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE DATE(date) = CURDATE() AND user_id = ?`, [id],
    );
    return rows;
  }

  async readOneDay(id, day) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE date = ? AND user_id = ?`, [day, id],
    );
    return rows;
  }

  async create(title, date, duration, details, timeOfDay, userId) {
    const newTraining = await this.database.query(
        `INSERT INTO ${this.table} 
        (title, date, duration, details, time_of_day, user_id) VALUE (?, ?, ?, ?, ?, ?)
        `, [title, date, duration, details, timeOfDay, userId]
    );
    return newTraining
  }

  async update(training, id) {
    const updatedTraining = await this.database.query(
        `UPDATE ${this.table} SET ? WHERE id = ?`, [training, id]
    );
    return updatedTraining;
  }

  async deleteOne(id) {
    const deletedTraining = await this.database.query(
        `DELETE FROM ${this.table} WHERE id = ?`, [id]
    );
    return deletedTraining;
  }
}

module.exports = TrainingRepository;
