require("dotenv").config({ path: ".env" });
const Telegraf = require("telegraf");
const translate = require("@k3rn31p4nic/google-translate-api");
const translateTo = "bn";

const translator = async (text, lang) => {
  try {
    const translated = await translate(text, { to: lang });
    return translated.text;
  } catch (error) {
    console.log(error);
  }
};

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(async ctx => {
  const { text } = ctx.update.message;
  const translated = await translator(text, translateTo);
  ctx.reply(translated);
});

bot.launch();
