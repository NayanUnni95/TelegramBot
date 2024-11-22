const { searchSongContent } = require('../apis/fetchSong');
const eventController = (bot, query) => {
  const chatId = query.message.chat.id;
  const msgId = query.message.message_id;
  const data = query.data;

  bot.deleteMessage(chatId, msgId);
  if (data != 'null') {
    searchSongContent(data)
      .then((res) => {
        bot
          .sendPhoto(chatId, res[0].image[2].url, {
            caption: `Title : ${
              res[0].name
            }\nArtist : ${res[0].artists.primary.map(
              (element) => ` ${element.name}`
            )}
            \nAlbum : ${res[0].album.name}\nType : ${res[0].type}\nYear : ${
              res[0].year
            }
            \nLanguage : ${res[0].language}\nCopy Right : ${res[0].copyright}`,
          })
          .then(() => {
            res[0].downloadUrl.map((element) => {
              // const ffmpegStream = ffmpeg(element.url).toFormat('mp3').pipe();
              bot
                .sendDocument(chatId, element.url, {
                  filename: `${res[0].name}_${element.quality}_${res[0].type}.mp3`,
                  contentType: 'audio/mpeg',
                  caption: `Title: ${res[0].name} \nQuality: ${element.quality}`,
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
      })
      .catch((err) => {
        console.log(err);
      });
  }
  bot.answerCallbackQuery(query.id);
};
module.exports = { eventController };
