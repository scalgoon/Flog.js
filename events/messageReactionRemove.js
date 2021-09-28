const { MessageEmbed } = require('discord.js');

const db = require('quick.db');

module.exports = async (client, reaction) => {


    const handleStarboard = async () => {
        const starboard = db.fetch(`starboardop_${reaction.message.guild.id}`);
        if (starboard === null) {
            return;
        }
        const msgs = await client.channels.cache.get(starboard).messages.fetch({ limit: 100 });
        const existingMsg = msgs.find(msg => {
            try {
                if (msg.embeds.length === 1) {
                    if (msg.embeds[0].footer.text.startsWith(`${reaction.message.id}`)) {
                        return true;
                    } return false;
                } return false;
            } catch (e) {
                return;
            };
        });
        if(existingMsg) {
            if(reaction.count === 0)
                existingMsg.delete({ timeout: 2500 });
            else
                existingMsg.edit(`${reaction.count} - 🌟`)
        };
    }
    if(reaction.emoji.name === '⭐') {
        const starboard = db.fetch(`starboardop_${reaction.message.guild.id}`);

        if (reaction.message.channel.id === starboard) return;
        if(reaction.message.partial) {
            await reaction.fetch();
            await reaction.message.fetch();
            handleStarboard();
        }
        else
            handleStarboard();
    }

    


}