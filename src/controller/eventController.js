const eventController = (bot, query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  // bot.sendMessage(chatId, `Selected Data is : ${data}`);
  bot.sendMessage(
    chatId,
    `Request received. Feature unavailable. Currently under development.`
  );
  bot.answerCallbackQuery(query.id);
};
module.exports = { eventController };
