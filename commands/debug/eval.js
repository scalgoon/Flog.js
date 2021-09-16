const { MessageEmbed } = require('discord.js')

module.exports.run = async(client, message, args) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) return;
    client.destroy = null;
    client.login = null;
    if(!args.length) return; 
        try {
            let codein = args.join(" ");
            //let code = await eval("(async () => {" + codein + "})()");
            let code = await eval("" + codein + "");
            if (typeof code !== 'string')
                code = await require('util').inspect(code, { depth: 0});
            let embed = new MessageEmbed()
                .setAuthor(`Eval`)
                .setColor('RANDOM')
                .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
                .addField(':outbox_tray: Output', `\`\`\`js\n${code}\n\`\`\``)
            await message.channel.send({embeds: [embed]})
        } catch (e) {
            await message.channel.send(`\`\`\`js\n${await e}\n\`\`\``);
            console.log(e);
        }

}

module.exports.config = {
    name: "eval", 
    aliases: ['e'], 
    usage: "*eval <code>"
}