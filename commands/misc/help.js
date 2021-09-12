const { MessageEmbed } = require('discord.js');
const { stripIndents } = require("common-tags");

module.exports.run = async(client, message, args) =>  {

    const commands = (category) => {

        // Future note: is empty is just an category mismatch
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => cmd.config.hidden ? "" : `\`${cmd.config.name}\``)
            .join(", ");
    };
    
    let embed = new MessageEmbed()
        .setDescription(client.categories
            .remove("debug")
            .map(value => stripIndents`**${client.betterCategoryNames.has(value) ? client.betterCategoryNames.get(value) : value[0].toUpperCase() + value.slice(1)}:** \n ${commands(value)}`)
            .join("\n "))
    let command = args[0]

       if(!args[0]) return message.channel.send({ embeds: [embed] });

       
        if(client.commands.has(command)) {
            command = client.commands.get(command);
        } else {
            message.channel.send("That doesn\'t seem to be a command I have");
        }

        if(args[0] === "eval" || args[0] === "reload") return  message.channel.send("That doesn\'t seem to be a command I have");
        if(args[0]) {
            try {
                let embed1 = new MessageEmbed()
                .setTitle(`Info for **${command.config.name}**`)
                .addField(`Aliases`, `${command.config.aliases}`)
                .addField(`Catagory`, `${command.config.category}`)
                .addField(`Description`, `${command.config.description}`)
                .addField(`Usage`, `${command.config.usage}`)
                .setColor("27cc9a")
        
                message.channel.send({ embeds: [embed1] });
                }catch(e){
                    console.log(e);
                }
        }

        
       }


    module.exports.config = {
        name: "help",
        aliases: ["h"],
        usage: "*help\n*help <command name>",
        description: "Sends the bot's command information"
    }
