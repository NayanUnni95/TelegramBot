const { forwardSongDetails } = require('../services/message');

const messageController = (bot, msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (text.startsWith('/')) {
    const command = text.split(' ')[0];
    switch (command) {
      case '/start':
        const text = `Discover and download your favorite songs with a simple search.`;
        bot.sendMessage(chatId, `Hello, ${msg.chat.first_name} \n${text}`);
        break;
      case '/settings':
        bot.sendMessage(chatId, 'Feature development in progress...');
        break;
      case '/reset':
        bot.sendMessage(chatId, 'Feature development in progress...');
        break;
      default:
        bot.sendMessage(chatId, 'Unknown Command');
        break;
    }
  } else {
    forwardSongDetails(bot, msg);
  }
};
module.exports = { messageController };
