const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;

  const extention = originalname.split(".").pop();
  const filename = `${_id}.${extention}`;
  await Jimp.read(`${tempUpload}`, (err, fileName) => {
    if (err) throw err;
    fileName
      .resize(250, 250) // resize
      .write(`${avatarsDir}/${filename}`); // save
  });
  // const resultUpload = path.join(avatarsDir, filenameJimp);
  // await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
