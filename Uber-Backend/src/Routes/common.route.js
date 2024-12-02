const express = require("express");
require("dotenv").config();
const router = express.Router();

const BlackListTokenModel = require("../Model/BlackListToken");
const { CommonAuth, UserAuth } = require("../Middleware/UserAuth");
const CaptainModel = require("../Model/Captain");
const UserModel = require("../Model/User");

router.get("/profile", CommonAuth, async (req, res) => {
  try {
    const { _id } = req.user;
    const user =
      (await UserModel.findById(_id)) ||
      (await CaptainModel.findById(_id).select("-password"));

    res.status(200).json({
      message: "Profile fetched successfully.",
      data: user,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Token verification failed", message: error.message });
  }
});

router.post("/logout", CommonAuth , async (req, res) => {
  const { token } = req;
  await BlackListTokenModel.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
});

module.exports = router;
