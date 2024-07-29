const AbstractSeeder = require("./AbstractSeeder");
const SportSeeder = require("./SportSeeder");
const UserSeeder = require("./UserSeeder");

const trainingDetails =
  "Warm-up: 5 minutes of light jogging or brisk walking, Main Workout: 10 push-ups, 15 squats, 20 sit-ups, 5 minutes of cycling or stationary bike, Cool-down: 5 minutes of stretching (focus on legs, arms, and back)";

class TemplateSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({
      table: "template",
      truncate: true,
      dependencies: [UserSeeder, SportSeeder],
    });
  }

  run() {
    const templates = [
      {
        title: "modèle 1",
        duration: "30min",
        details: trainingDetails,
        user_id: this.getRef(`user_0`).insertId,
        sport_id: this.getRef(`sport_0`).insertId,
      },
      {
        title: "modèle 2",
        details: trainingDetails,
        user_id: this.getRef(`user_0`).insertId,
        sport_id: this.getRef(`sport_0`).insertId,
      }
    ];

    templates.forEach((template) => this.insert(template));
  }
}

module.exports = TemplateSeeder;
