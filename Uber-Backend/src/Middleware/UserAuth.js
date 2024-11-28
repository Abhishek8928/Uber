const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserModel = require("../Model/User");
const BlackListToken = require("../Model/BlackListToken");

async function UserAuth(req, res, next) {
  try {
    const token = req?.signedCookies?.token || req?.headers?.authorization?.split(" ")[1];


    if (!token) {
      return res.status(401).json({
        error: "Missing token",
        message: "token is invalid or missing",
      });
    }

    const blackListToken = await BlackListToken.findOne({token});

    if(blackListToken){
        return res.status(401).json({
            error: "Unauthorized",
            message: "Token has been blacklisted"
        });
    }

    const { userId } = jwt.verify(token, process.env.SECRET_KEY);

    const checkUserInDatabase = await UserModel.findById(userId);

    if (!checkUserInDatabase) {
      return res.status(404).json({
        error: "User not found",
        message: "User with the provided token does not exist",
      });
    }

    req.user = checkUserInDatabase;
    req.token = token;


    next();
  } catch (err) {}
}


module.exports = UserAuth;
