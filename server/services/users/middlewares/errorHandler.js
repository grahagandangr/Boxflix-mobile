const errorHandler = (err, req, res, next) => {
  // console.log(err);
  switch (err.name) {
    case "NotFound":
      res.status(404).json({ message: "User not found" });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errorHandler;