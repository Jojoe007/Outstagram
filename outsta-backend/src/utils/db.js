const mongoose = require("mongoose");

const db = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGOURI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log(`Connected to database ${connection.connections[0].name}`);
    } catch(e) {
        console.error(e);
    };
};

module.exports = db;