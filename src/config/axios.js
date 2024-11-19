const axios = require('axios');
require('dotenv').config({ path: '../../.env' });

const url = process.env.BASE_URL;

const instance = axios.create({ baseURL: url });
module.exports = { instance };
