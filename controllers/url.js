const { nanoid } = require("nanoid");
const URL = require("../models/url");

const handleAllUrl = async (req, res) => {
    const urls = await URL.find({});
    res.render("index", { urls: urls });
};

const handleShortUrl = async (req, res) => {
    const shortUrl = req.params.shortUrl;
    const url = await URL.findOne({ shortUrl: shortUrl });
    if (!url) {
        return res.status(404).json({ message: "URL not found!" });
    }
    else {
        const updateUrl = await URL.findOneAndUpdate(
            { shortUrl: shortUrl },
            {
                $push:
                {
                    analyticUrl: {
                        timestamp: Date.now()
                    }
                }
            }
        );
        res.redirect(updateUrl.redirectUrl);
    }
}

const handlePostUrl = async (req, res) => {
    const originalUrl = req.body.url;
    if (!originalUrl) {
        return res.status(400).json({ message: "URL is required!" });
    } else {
        const shortID = nanoid(8);
        await URL.create({ redirectUrl: originalUrl, shortUrl: shortID, analyticUrl: [] });
        return res.render("index", { urls: await URL.find({}) });
    }
}


module.exports = {
    handleAllUrl,
    handleShortUrl,
    handlePostUrl
}