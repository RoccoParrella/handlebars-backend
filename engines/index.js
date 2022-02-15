const fs = require('fs').promises

module.exports = async function(filePath, options, callback) {
    const content = await fs.readFile(filePath)
    const rendered = content.toString()
        .replace("#title#", " " + options.title + " ")
        .replace("#message#", " " + options.message + " ");
    return callback(null, rendered)
}
