const UserModel = require("../models/user");
const PostModel = require("../models/post");
const asyncHandler = require("../middlewares/asyncHandler");

exports.getUsers = asyncHandler(async (req, res, next) => {
    let users = await UserModel.find().select("-password").lean().exec();

    users.forEach((user) => {
        user.isFollowing = false;
        const followers = user.followers.map((follower) => follower._id.toString());
        if (followers.includes(req.user.id)) {
            user.isFollowing = true;
        }
    });
    users = users.filter((user) => user._id.toString() !== req.user.id);

    res.status(200).json({ success: true, data: users });
});

exports.getUser = asyncHandler(async (req, res, next) => {
    let user = await UserModel.findById(req.body.id);

    res.status(200).json({ success: true, data: user});
});

exports.editUser = asyncHandler(async (req, res, next) => {
    const { avatar, username, fullname, website, bio, email } = req.body;

    const fieldsToUpdate = {};
    if (avatar) fieldsToUpdate.avatar = avatar;
    if (username) fieldsToUpdate.username = username;
    if (fullname) fieldsToUpdate.fullname = fullname;
    if (email) fieldsToUpdate.email = email;

    const user = await UserModel.findByIdAndUpdate(
        req.user.id,
        {
            $set: { ...fieldsToUpdate, website, bio },
        },
        {
            new: true,
            runValidators: true,
        }
    ).select("avatar username fullname email bio website");

    res.status(200).json({ success: true, data: user });
});