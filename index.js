require("dotenv").config({ path: ".env" });
const Telegraf = require("telegraf");
const translate = require("@k3rn31p4nic/google-translate-api");
const translateTo = "bn";
// listen for every text and which language to return
const translator = async (text, lang) => {
  try {
    // translate text to provided language and if any error happen console.log that
    const translated = await translate(text, { to: lang });
    return translated.text;
  } catch (error) {
    console.log(error);
  }
};
// make a telegraf bot
const bot = new Telegraf(process.env.BOT_TOKEN);
// pass the text and provided language to translator function and reply translated text
bot.use(async ctx => {
  const { text } = ctx.update.message;
  const translated = await translator(text, translateTo);
  ctx.reply(translated);
});

bot.launch();
