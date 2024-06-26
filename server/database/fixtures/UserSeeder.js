const AbstractSeeder = require("./AbstractSeeder");

class UserSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "user", truncate: true });
  }

  // The run method - Populate the 'user' table with fake data

  run() {
    // Generate fake user data
    const alex = {
      email: "alexlelion@gmail.com",
      password: "$argon2id$v=19$m=65536,t=3,p=4$XcwGli+gwi1IF72ukJ3hog$wGEC0rSM5U9bUrSYLcU6ev3/+exMzH9f9om6F7B9lDw",
      refName: "user_0",
      name: "Alex",
      level: 1,
    };

    this.insert(alex);
  }
}

// Export the UserSeeder class
module.exports = UserSeeder;
