const errorHandler = (err, req, res, next) => {
    console.error(err);

    let message = err.message || "Internal Server Error";
    let statusCode = err.statusCode || 500;

    if (err.code === 11000) {
        message = "Duplicate Keys";

        if (err.keyValue.email) {
            message = "This Email is already taken."
        };

        if (err.keyValue.username) {
            message = "This Username is already taken."
        };

        statusCode = 400;
    };

    if (err.name === "ValidationError") {
        const fields = Object.keys(err.errors);

        fields.map((field) => {
            if (err.errors[field].kind === "minlength") {
                message = "Password should be minimum of 8 characters";
            }
        });

        statusCode = 400;
    };

    if (err.name === "CastError") {
        message = "The ObjectID is malformed";
        statusCode = 400;
    };

    res.status(statusCode).json({
        success: false,
        message,
    });

    console.error(message);
};

module.exports = errorHandler;