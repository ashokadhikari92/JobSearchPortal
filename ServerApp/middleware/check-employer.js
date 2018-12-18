const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
    const role = tokenPayload.role;

    if(role !== 'employer'){
      return res.status(403).json({ message: "Not Authorized" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
