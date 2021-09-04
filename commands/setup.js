const { MessageEmbed, CategoryChannel } = require('discord.js');

const db = require('quick.db');

module.exports.run = async (client, message, args) => {

        if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send('You do not have permission to use this command!');

        let noOption = new MessageEmbed()
            .setAuthor(`${message.guild.name}'s Setup options`, message.guild.iconURL())
            .addField("Roles", "muted")
            .addField("Channels", "ticketChannel, botLogs")
            .setColor('27cc9a')
            .setTimestamp()

        if (!args[0]) return message.channel.send({ embeds: [noOption] });

        if (args[0] === 'muted') {

            let role = message.mentions.roles.first()

            let ch = db.fetch(`mrole_${message.guild.id}`);

            if(!args[1]) return message.reply("Please specify a option, add or remove");

            if(args[1] === "add") {

                if (!role) return message.reply("Please specify a role for this action");

                if (ch === null) {
                    db.set(`mrole_${message.guild.id}`, role.id);
    
                    let embed = new MessageEmbed()
                        .setDescription(`<:check:782029189963710464> The mute role is now ${role}`)
                        .setColor("GREEN")
    
                    message.channel.send({ embeds: [embed] });
                } else {
                    message.reply("That role is currently set");
                }
            };

            if(args[1] === "remove") {
                db.set(`mrole_${message.guild.id}`, null)

                let embed = new MessageEmbed()
                        .setDescription(`<:check:782029189963710464> The mute role is now removed`)
                        .setColor("GREEN")
    
                    message.channel.send({ embeds: [embed] });
            }

        }

        if(args[0] === "ticketChannel") {

            let tch = db.fetch(`tickchnl_${message.guild.id}`);

            if(!args[1]) return message.reply("Please specify a option, add or remove");

            if(args[1] === "add") {

                try {
                    const channelz = message.mentions.channels.first().parentId 
                } catch (e) {
                    message.reply("Please specify a channel in the category you are wanting to set!")
                    return
                } 

                if (tch === null) {

                    let tikch = message.mentions.channels.first().parentId
                    
                    db.set(`tickchnl_${message.guild.id}`, tikch);
    
                    let embed = new MessageEmbed()
                        .setDescription(`<:check:782029189963710464> Tickets will now be sent in <#${message.mentions.channels.first().parentId }>`)
                        .setColor("GREEN")
    
                    message.channel.send({ embeds: [embed] });
                } else {
                    message.reply("That channel is currently set");
                }
            };

            if(args[1] === "remove") {
                db.set(`tickchnl_${message.guild.id}`, null)

                let embed = new MessageEmbed()
                        .setDescription(`<:check:782029189963710464> The ticket category is now removed`)
                        .setColor("GREEN")
    
                    message.channel.send({ embeds: [embed] });
            }

        }

        if(args[0] === "botLogs") {

            if(!args[1]) return message.reply("Please specify a option, add or remove");

            if(args[1] === "add") {

                let channel = message.mentions.channels.first()

                if (!channel) return message.reply("Please specify a channel for this action");

                let ch = db.get(`botlgs_${message.guild.id}`);

                if (ch === null) {
                    db.set(`botlgs_${message.guild.id}`, channel.id)
        
                let embed = new MessageEmbed()
                    .setDescription(`<:check:782029189963710464> The bot log channel is now ${channel}`)
                    .setColor("GREEN")
        
                message.channel.send({ embeds: [embed] });
                } else {
                    message.reply("That channel is currently set");
                }
        
            };

            if(args[1] === "remove") {
                db.set(`botlgs_${message.guild.id}`, null)

                let embed = new MessageEmbed()
                        .setDescription(`<:check:782029189963710464> The bot logs channel is now removed`)
                        .setColor("GREEN")
    
                    message.channel.send({ embeds: [embed] });
            }

        }
}

module.exports.config = {
    name: "setup",
    aliases: [],
    category: "Server",
    usage: "*setup <options> <mini-option> <required-arg>",
    description: "Sets the server up for the bot"
}
