const AbstractRepository = require("./AbstractRepository");

class TrainingRepository extends AbstractRepository {
  constructor() {
    super({ table: "training" });
  }
 

  async readToday(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE DATE(date) = CURDATE() AND user_id = ?`, [id],
    );
    return rows;
  }

  async create(title, date, duration, details, timeOfDay, userId, sportId) {
    const newTraining = await this.database.query(
        `INSERT INTO ${this.table} 
        (title, date, duration, details, time_of_day, user_id, sport_id) VALUE (?, ?, ?, ?, ?, ?, ?)
        `, [title, date, duration, details, timeOfDay, userId, sportId]
    );
    return newTraining
  }
}

module.exports = TrainingRepository;
