const { instance } = require('../config/axios');
const { searchSong } = require('../config/constants');

const searchSongData = async (query) => {
  const response = await instance.get(
    `${searchSong}?query=${encodeURIComponent(query)}`
  );
  return response.data;
};

module.exports = { searchSongData };
