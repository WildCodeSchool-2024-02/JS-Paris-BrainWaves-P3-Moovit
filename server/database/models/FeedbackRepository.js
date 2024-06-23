const AbstractRepository = require("./AbstractRepository");

class FeedbackRepository extends AbstractRepository {
  constructor() {
    super({ table: "feedback" });
  }

  async readAll(query) {
    if (!query.id){
      const [rows] = await this.database.query(
        `SELECT * FROM ${this.table}`)
        return rows
    }
    const [rows] = await this.database.query(
      `SELECT ${this.table}.*, training.details AS training_details, training.sport_id, training.title FROM ${this.table} JOIN training ON feedback.training_id = training.id WHERE feedback.id = ?`, [query.id]
    )
    return rows
    }

  async create(feedback) {
    const [newFeedback] = await this.database.query(
        `INSERT INTO ${this.table} 
        (duration, global, difficulty, after, details, training_id) VALUE (?, ?, ?, ?, ?, ?)
        `, [feedback.duration, feedback.global, feedback.difficulty, feedback.after, feedback.details, feedback.training_id]
    );
    return newFeedback.insertId
  }

  async readByDay(date){
    const [feedbacks] = await this.database.query(
        `SELECT feedback.id as id, feedback.duration, feedback.global, feedback.difficulty, feedback.after, feedback.details, training.time_of_day, training.title, training.sport_id, training.id as training_id FROM ${this.table} 
        JOIN training ON feedback.training_id = training.id WHERE training.date = ?`,
        [date]
    );
    return feedbacks
  }

  async readToday(){
    const [feedbacks] = await this.database.query(
        `SELECT feedback.id as id, feedback.duration, feedback.global, feedback.difficulty, feedback.after, feedback.details, training.time_of_day, training.title, training.sport_id, training.id as training_id FROM ${this.table} 
        JOIN training ON feedback.training_id = training.id WHERE training.date = CURDATE()`
    );
    return feedbacks
  }

  async changeStatus(id){
    await this.database.query(
      `UPDATE training SET is_completed = 0 WHERE id = ?`, [id]
    )
  }
}

module.exports = FeedbackRepository;
