const { instance } = require('../config/axios');
const { searchSongById } = require('../config/constants');

const searchSongContent = async (query) => {
  const response = await instance.get(`${searchSongById}/${query}`);
  return response.data.data;
};

module.exports = { searchSongContent };
