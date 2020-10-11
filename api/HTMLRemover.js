const removeTag = (str) => {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}

module.exports = removeTag;