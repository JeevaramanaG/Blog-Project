const appErr = require("../utils/appErr");

const protected = (req, res, next) => {
  if (req.session.userAuth) {
    console.log(req.session.userAuth);
    next();
  } else {
    next(appErr("Not authorized, please login", 401));
  }
};

module.exports = protected;
