const AbstractSeeder = require("./AbstractSeeder");

// Import seeders that must be executed before this one
// Follow your foreign keys to find the right order ;)
const UserSeeder = require("./UserSeeder");

class TrainingSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "training", truncate: true, dependencies: [UserSeeder] });
  }

  // The run method - Populate the 'item' table with fake data

  run() {
    // Generate and insert fake data into the 'item' table
    for (let i = 0; i < 2; i += 1) {
      // Generate fake item data
      const fakeTraining = {
        title: `Entrainement-test ${i}`,
        date: new Date(),
        duration: "2h",
        details: `${i} Ceci est mon programme test pour m'entraîner`,
        time_of_day: "Soir",
        user_id: this.getRef(`user_0`).insertId, // Get the insertId of the corresponding user from UserSeeder
        sport_id: this.getRef(`sport_1`).insertId, // Get the insertId of the corresponding sport from SportSeeder
      };

      // Insert the fakeItem data into the 'item' table
      this.insert(fakeTraining); // insert into item(title, user_id) values (?, ?)
    }
  }
}

// Export the ItemSeeder class
module.exports = TrainingSeeder;
