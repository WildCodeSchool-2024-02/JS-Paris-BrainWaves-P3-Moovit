const AbstractRepository = require('./AbstractRepository')

class TemplateRepository extends AbstractRepository {
    constructor() {
        super({table: 'template'})
    }

    async readAllByUser(id) {
        const [rows] = await this.database.query(
            `SELECT * FROM ${this.table} WHERE user_id = ?`, [id]
        )
        return rows;
      };
    
    async create(title, duration, details, userId, sportId) {
        const newTemplate = await this.database.query(
            `INSERT INTO ${this.table} 
            (title, duration, details, user_id, sport_id) VALUE (?, ?, ?, ?, ?)
            `, [title, duration, details, userId, sportId]
        );
        return newTemplate
      }

}

module.exports = TemplateRepository;