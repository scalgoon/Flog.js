const { MessageEmbed } = require('discord.js');
const { stripIndents } = require("common-tags");

module.exports.run = async(client, message, args) =>  {
    if(args[0]) {
        getCMD(client, message, args[0])
    } else {
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
            message.channel.send("That doesn't seem to be a command I have.");
        }
    
    }

        
        
    async function getCMD(client, message, input) {
    const embed = new MessageEmbed()

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    if(cmd.category === "debug"){
        return message.channel.send("That doesn't seem to be a command I have.")
    }
    let info = `No information found for command **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send({
            embeds: [embed.setColor("RED").setDescription(info)]
        });
    }

    if (cmd.config.name) info = `**Command name**: ${cmd.config.name}`;
    if (cmd.config.aliases) info += `\n**Aliases**: ${cmd.config.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.config.description) info += `\n**Description**: ${cmd.config.description}`;
    if (cmd.config.usage) {
        info += `\n**Usage**: ${cmd.config.usage}`;
    
        return message.channel.send({embeds: [embed.setColor("RANDOM").setDescription(info)]});
    }

    
}
    }


    module.exports.config = {
        name: "help",
        aliases: ["h"],
        usage: "*help\n*help <command name>",
        description: "Sends the bot's command information"
    }
