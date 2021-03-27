const UserModel = require("../models/user");
const asyncHandler = require("../middlewares/asyncHandler");

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next({
            message: "Please insert your email or password.",
            statusCode: 400,
        });
    };

    const user = await UserModel.findOne({ email });
    if (!user) {
        return next({
            message: "Missing or invalid credentials.",
            statusCode: 401,
        });
    }

    const match = await user.checkPassword(password);
    if (!match) {
        return next({
            message: "Your password was incorrect,",
            statusCode: 401,
        });
    };
    const token = user.getJwtToken();

    res.status(200).json({
        success: true,
        token,
    });
});

exports.register = asyncHandler(async (req, res, next) => {
    const { fullname, username, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return next({
            message: "Your password dont matching.",
            statusCode: 401,
        });
    };

    const user = await UserModel.create({
        fullname,
        username,
        email,
        password,
    });
    const token = user.getJwtToken;

    res.status(200).json({
        success: true,
        token,
    });
});

exports.me = asyncHandler(async (req, res, next) => {
    const { avatar, username, fullname, email, _id, website, bio } = req.user;

    res
        .status(200)
        .json({
            success: true,
            data: { avatar, username, fullname, email, _id, website, bio },
        });
});