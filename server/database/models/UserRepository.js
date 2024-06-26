const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async create(email, password, name, level) {
    const newUser = await this.database.query(
      `INSERT INTO ${this.table}
            (email, password, name, level)
            VALUE (?, ?, ?, ?)`,
      [email, password, name, level]
    );
    return newUser;
  }
}

module.exports = UserRepository;
