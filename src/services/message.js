const { searchSongData } = require('../apis/searchSong');
const { updateData } = require('../models/response');

const forwardSongDetails = (bot, msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  searchSongData(text)
    .then((res) => {
      const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: {
          resize_keyboard: true,
          one_time_keyboard: true,
          inline_keyboard: res.data.results[0]
            ? [
                ...res.data.results.map((data) => [
                  {
                    text: `${data.name} | ${data.album.name} | ${data.type} | ${data.year}`,
                    callback_data: `${data.id}`,
                  },
                ]),
              ]
            : [[{ text: `Empty Result`, callback_data: 'null' }]],
        },
      };
      updateData(res.data.results);
      return bot.sendMessage(
        chatId,
        `Here is What I Found For Your Query: ${text}`,
        opts
      );
    })
    .catch((err) => {
      console.log(err);
      return bot.sendMessage(chatId, `Something went wrong`);
    });
};

module.exports = { forwardSongDetails };
