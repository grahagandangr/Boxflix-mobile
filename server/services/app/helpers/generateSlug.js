const generateSlug = (title) => {
  return title.split(" ").join("-").toLowerCase();
};

module.exports = generateSlug;
