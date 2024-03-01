const jwt = require("jsonwebtoken");
const JWT_SEC = "sdhfhb!#$321jkbda!#$398";

const fetchuser = (req, res, next) => {
  // getting user from the JWT token and add id to req obj
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "Authenticate yourself!" });
  }

  try {
    const data = jwt.verify(token, JWT_SEC);  // converting the jwt back to the data object created in /login and/or /createuser
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authenticate yourself!" });
    console.log(error);
  }
};

module.exports = fetchuser;
