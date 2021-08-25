const mongoose = require('mongoose');
const Guild = require('../models/guild');

module.exports = async (client, guild) => {
    Guild.findOneAndDelete({
        guildID: guild.id
    }, (err, res) => {
        if(err) console.error(err)
        console.log('Bot has left a server');
    });
};