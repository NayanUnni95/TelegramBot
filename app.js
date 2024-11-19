const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const { eventController } = require('./src/controller/eventController');
const { messageController } = require('./src/controller/messageController');

const token = process.env.Token;
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => messageController(bot, msg));
bot.on('callback_query', (query) => eventController(bot, query));
