const { MessageActionRow, MessageSelectMenu, Interaction } = require('discord.js');

module.exports.run = async(client, message, args) =>  {

const row = new MessageActionRow()
.addComponents(
    new MessageSelectMenu()
        .setCustomId('select')
        .setPlaceholder('What are you making a ticket for?')
        .addOptions([
            {
                label: 'Reporting a user',
                description: 'This will open a mod ticket',
                value: 'first_option'
            },
            {
                label: 'Giving a server suggestion',
                description: 'This will open a suggestion ticket',
                value: 'second_option'
            },
        ]),
);

 message.channel.send({ content: 'Ticket options', components: [row] });

}

module.exports.config = {
name: "tickets",
aliases: ["ts"],
category: "Moderation",
usage: "*tickets",
description: "Sends a embed so a user can make a ticket"
}