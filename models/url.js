const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortUrl: {
        type: String
    },
    redirectUrl: {
        type: String
    },
    analyticUrl: [{ timestamp: { type: Number } }]
}, { timestamps: true });

const URL = mongoose.model("URL", urlSchema);
module.exports = URL;