const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.Token;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Hello ${msg.from.first_name}`);
});
