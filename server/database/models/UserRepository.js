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
}

module.exports = UserRepository;
