require('dotenv').config({ path: '.env' })
const Telegraf = require('telegraf')
const translate = require('@k3rn31p4nic/google-translate-api')

// note: If we put language in .env file it isn't working

const { BOT_TOKEN, CHANNEL_ID, TARGET_LANG, SENDER_CHANNEL_ID } = process.env;

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
const bot = new Telegraf(BOT_TOKEN);
// listen every message
// if that message comes from sender channel/Channel1 then translate it
// and send to Channel2 with senderName
// otherwise just keep server running.
bot.use(async ctx => {
  const { text } = ctx.channelPost
  const Id = ctx.chat.id
  const sender = ctx.chat.title
  if (Id === Number(`-100${SENDER_CHANNEL_ID}`)) {
  const translated = await translator(text, TARGET_LANG)

// send Translated message to provided channel
  try {
    await ctx.telegram.sendMessage(Number(`-100${CHANNEL_ID}`), `${sender}: ${translated}`)
  } catch (err) {
    console.log(err)
  }
}
})

bot.launch()
