let apiResultData = [];
const updateData = (data) => {
  apiResultData = data;
};
const getData = () => {
  return apiResultData;
};
const removeData = () => {
  apiResultData = null;
};
module.exports = { apiResultData, updateData, getData, removeData };
