const { getData } = require('../models/Response');
const eventController = (bot, query) => {
  const chatId = query.message.chat.id;
  const msgId = query.message.message_id;
  const data = query.data;

  bot.deleteMessage(chatId, msgId);
  if (data != 'null') {
    const details = getData().find((value) => {
      return value.id === data;
    });
    bot
      .sendPhoto(chatId, details.image[2].url, {
        caption: `Title : ${
          details.name
        }\nArtist : ${details.artists.primary.map(
          (element) => ` ${element.name}`
        )}
        \nAlbum : ${details.album.name}\nType : ${details.type}\nYear : ${
          details.year
        }
        \nLanguage : ${details.language}\nCopy Right : ${details.copyright}`,
      })
      .then(() => {
        details.downloadUrl.map((element) => {
          bot
            .sendDocument(chatId, element.url, {
              caption: `Title : ${details.name} \nQuality : ${element.quality}`,
            })
            .catch((error) => {
              console.error('Error sending document:', error);
            });
        });
      })
      .catch((err) => {
        console.error('Error sending media:', err);
        bot.sendMessage(chatId, 'There was an issue sending the media.');
      });
  }
  bot.answerCallbackQuery(query.id);
};
module.exports = { eventController };
