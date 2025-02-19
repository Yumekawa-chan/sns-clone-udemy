const Identicon = require("identicon.js");

const generateIdenticon = (input) => {
    const hash = require("crypto").createHash("md5").update(input).digest("hex");
    const data = new Identicon(hash, 64).toString();
    return `data:image/png;base64,${data}`;
};

module.exports = generateIdenticon;
