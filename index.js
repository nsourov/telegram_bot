require('dotenv').config({ path: '.env' })
const Telegraf = require('telegraf')
const translate = require('@k3rn31p4nic/google-translate-api')

// note: If we put language in .env file it isn't working

const language = 'bn'
const botToken = process.env.BOT_TOKEN
const channelId = process.env.CHANNEL_ID

// take text and provided language
const translator = async (text, lang) => {
  try {
    // translate text to provided language
    const translated = await translate(text, { to: lang })
    return translated.text
  } catch (error) {
    console.log(error)
  }
}
// make a telegraf instance
const bot = new Telegraf(botToken);
// listen for every chat message and translate them
bot.use(async ctx => {
  const { text } = ctx.channelPost
  const translated = await translator(text, language)

// send Translated message to provided channel
  try {
    await ctx.telegram.sendMessage(Number(`-100${channelId}`), translated)
  } catch (err) {
    console.log(err)
  }
})

bot.launch()
