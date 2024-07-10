const AbstractRepository = require("./AbstractRepository");

class TrainingRepository extends AbstractRepository {
  constructor() {
    super({ table: "training" });
  }

  async readOne(id) {
    const [[training]] = await this.database.query(
      `select * from ${this.table} WHERE id = ?`,
      [id]
    );
    return training;
  }

  async readOneDay(id, day) {
    const [rows] = await this.database.query(
      `SELECT ${this.table}.*, sport.name FROM ${this.table} JOIN sport ON ${this.table}.sport_id = sport.id WHERE date = ? AND user_id = ? AND is_completed = 0`,
      [day, id]
    );
    return rows;
  }

  async create(title, date, duration, details, timeOfDay, userId, sportId) {
    const newTraining = await this.database.query(
      `INSERT INTO ${this.table} 
        (title, date, duration, details, time_of_day, user_id, sport_id) VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
      [title, date, duration, details, timeOfDay, userId, sportId]
    );
    return newTraining;
  }

  async readInterval(body, id){
    const [interval] = await this.database.query(
      `SELECT date FROM ${this.table} WHERE user_id = ? AND date BETWEEN ? AND ?`, [id, body.firstDay, body.lastDay]
    );
    return interval
  }
}

module.exports = TrainingRepository;
