const mongoose = require('mongoose');

const Guild = require('../models/guild');

const message = require('./messageCreate');

const config = require('../config.json');

module.exports = async (client, guild) => {
    guild = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: guild.id,
        guildName: guild.name,
        prefix: config.prefix
    });

    guild.save()
    .then(result => console.log(result))
    .catch(err => console.error(err));

    if (guild.systemChannel) {
        guild.systemChannel.send("Hello I'm Terminal!\nTo see my commands do *help").catch(e => console.log("failed to send message due to error: ", e))
    }

    console.log(`Server joined: ${guild.name}`);
};