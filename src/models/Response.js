let apiResultData = [];
const updateData = (data) => {
  apiResultData = data;
};
const getData = () => apiResultData;
module.exports = { apiResultData, updateData, getData };
