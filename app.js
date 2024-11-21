const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const { eventController } = require('./src/controller/eventController');
const { messageController } = require('./src/controller/messageController');

const token = process.env.Token || null;
const bot = new TelegramBot(token, {
  polling: { interval: 3000, autoStart: true, params: { timeout: 30 } },
});

bot.on('message', (msg) => messageController(bot, msg));
bot.on('callback_query', (query) => eventController(bot, query));
bot.on('polling_error', (err) => {
  console.log(`Error Details : ${err}`);
  setTimeout(() => {
    bot.startPolling();
  }, 5000);
});
