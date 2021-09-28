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
                return reaction.message.reply("Please make a new channel with 0 messages in it!");
            };
        });
     
            if (existingMsg)  existingMsg.edit(`${reaction.count} - 🌟`)
             else {
                if(reaction.message.attachments.size >= 1) {
                    
                    let embed = new MessageEmbed()
                    .setAuthor(`${reaction.message.author.tag}`, reaction.message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`**[Jump!](${reaction.message.url})**`)
                    .setColor("YELLOW")
                    .setFooter(`${reaction.message.id}`)
                    .setTimestamp()
                    .setImage(`${reaction.message.attachments.map(attach => attach.url)}`)

                    if (starboard)
                    client.channels.cache.get(starboard).send({ content: '1 - 🌟', embeds: [embed] });

                } else {
                    let embed = new MessageEmbed()
                    .setAuthor(`${reaction.message.author.tag}`, reaction.message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`**[Jump!](${reaction.message.url})**`)
                    .addField("Message", `${reaction.message.content}`)
                    .setColor("YELLOW")
                    .setFooter(`${reaction.message.id}`)
                    .setTimestamp()

                    if (starboard)
                    client.channels.cache.get(starboard).send({ content: '1 - 🌟', embeds: [embed] });
                }
                    
            }

        }
        
if (reaction.emoji.name === '⭐') {
            const starboard = db.fetch(`starboardop_${reaction.message.guild.id}`);

                if (reaction.message.channel.id === starboard) return;
                if (reaction.message.partial) {
                    await reaction.fetch();
                    await reaction.message.fetch();
                    handleStarboard();
                }
                else
                    handleStarboard();
            

        }

    


}