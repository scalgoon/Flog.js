const Discord = require('discord.js');
require('dotenv').config()
const client = new Discord.Client({
    intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_MESSAGES',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGE_TYPING',
        'GUILD_BANS',
        'GUILD_EMOJIS_AND_STICKERS',
        'GUILD_INTEGRATIONS',
        'GUILD_INVITES',
        'GUILD_VOICE_STATES',
        'GUILD_PRESENCES',
    ],
    allowedMentions: ["roles", "users"],
    partials: ['USER', 'CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION']
});

const fs = require('fs');
// const config = require('./config.json');
const klaw = require('klaw');
const path = require('path');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton, Permissions } = require('discord.js');
const db = require('quick.db');


client.commands = new Discord.Collection();
client.description = new Discord.Collection();
client.category = new Discord.Collection();
client.categories = fs.readdirSync("./commands/")
client.slashCategories = fs.readdirSync("./slashCommands");
client.aliases = new Discord.Collection();
client.slashCommands = new Discord.Collection();
//Bet you're wondering wtf this is, its to make everything look cleaner.
client.betterCategoryNames = new Map();
client.betterCategoryNames.set("misc", ":question: - Miscellaneous");
client.betterCategoryNames.set("server", ":computer: - Server");
client.betterCategoryNames.set("setup", ":tools: - Setup");
client.betterCategoryNames.set("moderation", ":shield: - Moderation");
client.betterCategoryNames.set("automod", ":robot: - Automod");
client.betterCategoryNames.set("eco", ":moneybag: - Economy")
require("./utils/utilsMain")(client);
require("colors");
require('./utils/handler')(client);
//slash commands

const slashCommands = [];
const slashCommandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));

const clientId = process.env.clientId;

for (const file of slashCommandFiles) {
    const command = require(`./slashCommands/${file}`);
    slashCommands.push(command.data.toJSON());
}
//used in help.js
Array.prototype.remove = function() {
    let what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


const rest = new REST({ version: '9' }).setToken(process.env.token);

(async () => {
    try {
        client.log('Slash', `Started refreshing application (/) commands.`)

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: slashCommands },
        );        

        client.log('Slash', `Successfully reloaded application (/) commands.`)
    } catch (error) {
        console.error(error);
    }
})();


//im not even touching this shit
client.on("messageCreate", message => {
const usersMap = new Map();
const LIMIT = 5;
const BEFLIMIT = 3;
const TIME = 7000;
const DIFF = 3000;


let ch = db.fetch(`antispam_${message.guild.id}`);

if (ch === null) {
    return;
}else{

if (!message.member.permissions.has('ADMINISTRATOR')) {

if (usersMap.has(message.author.id)) {
    const userData = usersMap.get(message.author.id);
    const { lastMessage, timer } = userData;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount = userData.msgCount;

    if (difference > DIFF) {
        clearTimeout(timer);
        userData.msgCount = 1;
        userData.lastMessage = message;
        userData.timer = setTimeout(() => {
            usersMap.delete(message.author.id);
        }, TIME);
        usersMap.set(message.author.id, userData)
    }
    else {
        ++msgCount;
        if (parseInt(msgCount) === BEFLIMIT) {

            let mut = new MessageEmbed()
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .setDescription(`If you continue to spam you will be muted!`)
            .setColor("RED")

            message.author.send({ embeds: [mut] });
        }
        if (parseInt(msgCount) === LIMIT) {
            let muterole = db.get(`mrole_${message.guild.id}`);

            if (muterole === null) {
                return message.channel.send("Please set a muted role to complete this action")
            };

            message.member.roles.add(muterole);

            let amount = 1

            db.add(`cases_${message.guild.id}`, amount);

            let cases = db.fetch(`cases_${message.guild.id}`)

            let data = {
                staff: `\n**Case ${cases}**\nModerator: <@${client.user.id}>\nType: Mute\nDurration: 15m\nReason: Spam`,
            }

            db.push(`logsdb_${message.guild.id}_${message.author.id}`, data)

            let embed = new MessageEmbed()
                .setTitle(`Case Number ${cases}`)
                .setDescription(`<@${message.author.id}> has been muted for 15m`)
                .setFooter("Auto-Mute")
                .setColor("GREEN")

            message.channel.send({ embeds: [embed] })

            let chx = db.get(`botlgs_${message.guild.id}`);

            if (chx === null) {
                return message.channel.send("Please set a bot logs channel if you want command logs")
            }

            let muted = new MessageEmbed()
                .setAuthor(`${message.guild.name}`, message.guild.iconURL())
                .setDescription(`<@${message.author.id}> has been auto-muted`)
                .addField("Moderator", `Name: <@${client.user.id}> \nID: ${client.user.id}`)
                .addField("User", `Name: ${message.author.tag} \nID: ${message.author.id}`)
                .addField(`Reason`, `Spam`)
                .addField("Duration", `15m`)
                .setColor("BLUE")
                .setTimestamp()

            client.channels.cache.get(chx).send({ embeds: [muted] });

            setTimeout(() => {
                message.member.roles.remove(muterole);

                let unm = new MessageEmbed()
                    .setAuthor(`${message.guild.name}`, message.guild.iconURL())
                    .setDescription(`<@${message.author.id}> has been unmuted`)
                    .addField("Moderator", `Name: <@826570548783087627> \nID: 826570548783087627`)
                    .addField("User", `Name: ${message.author.tag} \nID: ${message.author.id}`)
                    .setColor("BLUE")
                    .setTimestamp()

                client.channels.cache.get(chx).send({ embeds: [unm] });
            }, 900000);
        } else {
            userData.msgCount = msgCount;
            usersMap.set(message.author.id, userData);
        }
    }
}
else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
        }, TIME);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: fn
        });
    }
}
}
})
client.login(process.env.token);


