const AbstractRepository = require("./AbstractRepository");

class SportRepository extends AbstractRepository {
  constructor() {
    super({ table: "sport" });
  }

  async readOneWithSports(id){
    const sports = this.database.query(
      `SELECT ${this.table}.* FROM user JOIN user_has_sport AS uh ON user.id =uh.user_id JOIN sport ON uh.sport_id = sport.id WHERE user.id = ?`,
      [id]
    );
    return sports
  }


  
}

module.exports = SportRepository;
