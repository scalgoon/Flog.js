const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
        guildID: {
            unique: true,
            type: String
        },
        guildName: String,
        prefix: {
            default: "*",
            type: String
        },
        logChannelID: String,
        blacklist: [],
});



module.exports = mongoose.model('Guild', guildSchema, 'guilds22');
