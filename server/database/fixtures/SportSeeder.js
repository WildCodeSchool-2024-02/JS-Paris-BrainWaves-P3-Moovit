const AbstractSeeder = require("./AbstractSeeder");

class SportSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "sport", truncate: true });
  }

  run() {
    const sports = [
      { name: "Musculation", refName: "sport_0" },
      { name: "CrossFit", refName: "sport_1" },
      { name: "Course à pied", refName: "sport_2" },
      { name: "Natation", refName: "sport_3" },
      { name: "Velo", refName: "sport_4" },
      { name: "Boxe", refName: "sport_5" },
      { name: "Gymnastique", refName: "sport_6" },
      { name: "Yoga", refName: "sport_7" },
      { name: "Escalade", refName: "sport_8" },
      { name: "Poney", refName: "sport_9" },
    ];

    sports.forEach((sport) => this.insert(sport));
  }
}

module.exports = SportSeeder;
