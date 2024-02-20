const jwt = require("jsonwebtoken");
const secrete = process.env.SECRETE_KEY;

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };
  const token = jwt.sign(payload, secrete, {
    expiresIn: "365d",
  });
  return token;
}

function validateToken(token) {
  const payload = jwt.verify(token, secrete);
  return payload;
}
module.exports = { createTokenForUser, validateToken };
