const AbstractRepository = require("./AbstractRepository");

class SportRepository extends AbstractRepository {
  constructor() {
    super({ table: "sport" });
  }
}

module.exports = SportRepository;
