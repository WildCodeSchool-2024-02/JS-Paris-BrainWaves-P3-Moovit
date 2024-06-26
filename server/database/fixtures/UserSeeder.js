const AbstractSeeder = require("./AbstractSeeder");

class UserSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "user", truncate: true });
  }

  // The run method - Populate the 'user' table with fake data

  run() {
    // Generate fake user data
    const julian = {
      email: "king-julian@gmail.com",
      password: "julian",
      refName: "user_0",
      name: "Julian",
      level: 1,
    };
    const maurice = {
      email: `maurice@gmail.com`,
      password: `maurice`,
      refName: `user_1`,
      name: `Maurice`,
      level: 352,
    };

    this.insert(julian);
    this.insert(maurice);
  }
}

// Export the UserSeeder class
module.exports = UserSeeder;
