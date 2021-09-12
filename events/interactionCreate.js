module.exports = async(client, interaction) => {
    //This makes sure that all of these are only / commands.
    if (interaction.isCommand()) {

    if (interaction.commandName === 'ping') {
        let ping = new MessageEmbed()
            .setTitle(`Calculating ping...`)

        const startTime = Date.now();
        interaction.reply({ embeds: [ping], ephemeral: true })
            .then(msg => {
                const endTime = Date.now();
                var pong = endTime - startTime;

                let ping = new MessageEmbed()
                    .setTitle(`:ping_pong: Pong!`)
                    .setColor('27cc9a')
                    .setDescription(`Latency: ${pong} ms \nApi Latency: ${Math.round(client.ws.ping)} ms`)

                interaction.editReply({ embeds: [ping], ephemeral: true });
            });

    }

    if (interaction.commandName === 'tickets') {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('tickets_select')
                    .setPlaceholder('What are you making a ticket for?')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions([
                        {
                            label: 'Reporting a user',
                            description: 'This will open a mod ticket',
                            value: 'mod_option'
                        },
                        {
                            label: 'Giving a server suggestion',
                            description: 'This will open a suggestion ticket',
                            value: 'suggestion_option'
                        },
                    ]),
            );

        await interaction.reply({ content: `Ticket options for **${interaction.guild.name}**`, components: [row], ephemeral: true });
    }

}
    if (interaction.isSelectMenu()){
        if (interaction.customId === 'tickets_select') {
            await interaction.update({ content: `Your option has been selected`, components: [], ephemeral: true });
        }
    
        //mod tickets
    
        if (interaction.values.includes('mod_option')) {
            let tik = db.fetch(`tickchnl_${interaction.guild.id}`);
    
            if (tik === null) {
                return interaction.channel.send("Please set a ticket channel category")
            };
    
            let donetik = await interaction.guild.channels.create(`Ticket: ${interaction.user.username}`, {
                type: 'text',
                parent: `${tik}`,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                    },
                    {
                        id: interaction.guild.id,
                        deny: ['VIEW_CHANNEL'],
                    }
                ]
            })
    
            interaction.followUp({ content: `Your ticket has been made: ${donetik}`, ephemeral: true });
    
            const row = new MessageActionRow()
                .addComponents(
    
                    new MessageButton()
                        .setCustomId('del')
                        .setLabel('Delete')
                        .setStyle('DANGER'),
    
                    new MessageButton()
                        .setCustomId('lok')
                        .setLabel('Lock')
                        .setStyle('SECONDARY')
    
    
                );
    
            donetik.send({ content: `Thank you for contacting ${interaction.guild.name} support!\nA staff member will be right with you **${interaction.user.username}**`, components: [row] });
    
            let chx = db.get(`botlgs_${interaction.guild.id}`);
    
            if (chx === null) {
                return;
            }
    
            let tikmade = new MessageEmbed()
                .setAuthor(`${interaction.guild.name}`, interaction.guild.iconURL())
                .setDescription(`Ticket was made`)
                .addField("Author", `Name: **${interaction.user.tag}** \nID: ${interaction.user.id}`)
                .addField("Channel", `Name: ${donetik} \nID: ${donetik.id}`)
                .setColor("PURPLE")
                .setTimestamp()
    
            client.channels.cache.get(chx).send({ embeds: [tikmade] });
        };
    
        //suggestions
    
        if (interaction.values.includes('suggestion_option')) {
            let tik = db.fetch(`tickchnl_${interaction.guild.id}`);
    
            if (tik === null) {
                return interaction.channel.send("Please set a ticket channel category")
            };
    
            let donetik = await interaction.guild.channels.create(`Suggestion: ${interaction.user.username}`, {
                type: 'text',
                parent: `${tik}`,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                    },
                    {
                        id: interaction.guild.id,
                        deny: ['VIEW_CHANNEL'],
                    }
                ]
            })
    
            interaction.followUp({ content: `Your suggestion ticket has been made: ${donetik}`, ephemeral: true });
    
            const row = new MessageActionRow()
                .addComponents(
    
                    new MessageButton()
                        .setCustomId('del')
                        .setLabel('Delete')
                        .setStyle('DANGER'),
    
                    new MessageButton()
                        .setCustomId('lok')
                        .setLabel('Lock')
                        .setStyle('SECONDARY')
    
    
                );
    
            donetik.send({ content: `Thank you for contacting ${interaction.guild.name} support!\nA staff member will be right with you **${interaction.user.username}**`, components: [row] });
    
            let chx = db.get(`botlgs_${interaction.guild.id}`);
    
            if (chx === null) {
                return;
            }
    
            let tikmade = new MessageEmbed()
                .setAuthor(`${interaction.guild.name}`, interaction.guild.iconURL())
                .setDescription(`Ticket was made`)
                .addField("Author", `Name: **${interaction.user.tag}** \nID: ${interaction.user.id}`)
                .addField("Channel", `Name: ${donetik} \nID: ${donetik.id}`)
                .setColor("PURPLE")
                .setTimestamp()
    
            client.channels.cache.get(chx).send({ embeds: [tikmade] });
        }
}
    if(interaction.isButton()) {
        switch (interaction.customId) {
            case "del":
                interaction.reply("This ticket will be automatically deleted in 5 seconds.")
                setTimeout(() => interaction.channel.delete(), 5000);
    
                let chx = db.get(`botlgs_${interaction.guild.id}`);
    
            if (chx === null) {
                return;
            }
    
            let tikgone = new MessageEmbed()
                .setAuthor(`${interaction.guild.name}`, interaction.guild.iconURL())
                .setDescription(`Ticket was deleted`)
                .addField("Moderator", `Name: **${interaction.user.tag}** \nID: ${interaction.user.id}`)
                .addField("Channel", `Name: ${interaction.channel.name} \nID: ${interaction.channel.id}`)
                .setColor("RED")
                .setTimestamp()
    
            client.channels.cache.get(chx).send({ embeds: [tikgone] });
            break; 
            case "lok":
                interaction.reply("This ticket is now locked")
                interaction.channel.permissionOverwrites.edit(interaction.user.id, { SEND_MESSAGES: false });
            break; 
            case "topdel":
                let tdx = db.get(`topchannel_${interaction.guild.id}`);
    
            try {
                client.channels.cache.get(tdx).send("This topic will be automatically deleted in 5 seconds.")
                setTimeout(() =>  client.channels.cache.get(tdx).delete(), 5000);
    
                interaction.reply({ content: "Topic successfully deleted!", ephemeral: true })
    
                db.set(`topchannel_${interaction.guild.id}`, null);
            }catch(e){
            interaction.reply({ content: "An error occured! \nMaybe this topic is already deleted?", ephemeral: true })
            }
        }
    }
}