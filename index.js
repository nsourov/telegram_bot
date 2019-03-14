require('dotenv').config();
const Telegraf = require('telegraf');
const translate = require('@k3rn31p4nic/google-translate-api');

const translateTo = 'bn';
const channelId = Number(`-100${process.env.CHANNEL_ID}`);
// listen for every text and which language to return
const translator = async (text, lang) => {
  try {
    // translate text to provided language
    const translated = await translate(text, { to: lang });
    return translated.text;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// make a telegraf bot
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(async (ctx) => {
  const { text } = ctx.channelPost; // grab message from channel1
  const translated = await translator(text, translateTo);
  try {
    // channel has to select bot as admin in order to recieve message.
    // sending translated message on target channel
    await ctx.telegram.sendMessage(channelId, translated);
  } catch (err) {
    console.log(err);
  }
});

bot.launch();
