require('dotenv').config({ path: '.env' });
const Telegraf = require('telegraf');
const translate = require('@k3rn31p4nic/google-translate-api');

/**
 * How you can get the bot channel ID?
 * 1. Start your net bot from botFather.
 * 2.  Collect the token
 * 3. Go the the new bot channel and click start or type /start
 * 4. Then make a GET request to https://api.telegram.org/bot{YOUR TOKEN}/getUpdates
 * 5. You will see a response with the data of messages.
 * 6. The message.from.id is you BOT CHANNEL ID which is need to send
 * translate message from other channels.
 * 7. Put that ID into the ENV file on CHANNEL_ID
 */
const { BOT_TOKEN, CHANNEL_ID, TARGET_LANG } = process.env;

// take text and provided language
const translator = async (text, lang) => {
  try {
    // translate text to provided language
    const translated = await translate(text, { to: lang });
    return translated.text;
  } catch (error) {
    console.log(error);
  }
  return null;
};

// make a telegraf instance
const bot = new Telegraf(BOT_TOKEN);
// listen for every chat message and translate them
bot.use(async (ctx) => {
  // NOTE: If the message is sent from BOT CHANNEL
  // it will throw error saying that text is undefined.
  // When the message is sent from normal channels then it will be ok.
  const { text } = ctx.channelPost;
  // NOTE: title is the NAME of the channel where the message sent from.
  // when message sent from BOT channel it will return the USERNAME.
  const sender = ctx.chat.title;
  const translated = await translator(text, TARGET_LANG);
  try {
    // NOTE: BOT CHANNEL is needed to add as ADMIN in the channel from where we sending messages.
    await ctx.telegram.sendMessage(CHANNEL_ID, `${sender}: ${translated}`);
  } catch (err) {
    console.log(err);
  }
});

bot.launch();
