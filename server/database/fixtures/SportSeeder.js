const AbstractSeeder = require("./AbstractSeeder");

class SportSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "sport", truncate: true });
  }

  run() {
    const sports = [
      { name: "fitness", refName: "sport_0" },
      { name: "running", refName: "sport_1" },
      { name: "poney", refName: "sport_2" },
    ];

    sports.forEach((sport) => this.insert(sport));
  }
}

module.exports = SportSeeder;
