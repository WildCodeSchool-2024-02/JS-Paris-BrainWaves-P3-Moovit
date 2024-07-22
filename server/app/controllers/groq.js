const Groq = require('groq-sdk')

const groq = new Groq({ apiKey: process.env.APP_GROQ });

async function getGroqChatCompletion(duration, sport, userLevel) {
 let level = ''
    if (userLevel === 1) level = 'Débutant'
    if (userLevel === 2) level = 'Intermédiaire'
    if (userLevel === 3) level = 'Confirmé'
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Crée moi une séance en français de ${sport} qui durera ${duration} pour un pratiquant ${level} en markdown`,
      },
    ],
    model: "mixtral-8x7b-32768",
  });
}
async function main(req, res) {
    const {duration, sportId, userLevel} = req.body
    const chatCompletion = await getGroqChatCompletion(duration, sportId, userLevel);
    res.json(chatCompletion.choices[0]?.message?.content || "")
  }


module.exports= { main }
