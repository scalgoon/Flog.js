const Discord = require('discord.js');

const client = new Discord.Client({
    intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_BANS',
        'GUILD_EMOJIS_AND_STICKERS',
        'GUILD_INTEGRATIONS',
        'GUILD_WEBHOOKS',
        'GUILD_INVITES',
        'GUILD_VOICE_STATES',
        'GUILD_PRESENCES',
        'GUILD_MESSAGES',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGE_TYPING',
        'DIRECT_MESSAGES',
        'DIRECT_MESSAGE_REACTIONS',
        'DIRECT_MESSAGE_TYPING'
    ],
    allowedMentions: ["roles", "users"],
    partials: ['USER', 'CHANNEL', 'GUILD_MEMBER','MESSAGE', 'REACTION']});

const fs = require('fs');
const config = require('./config.json');
const klaw = require('klaw');
const path = require('path');
const { on } = require('./models/guild');


client.commands = new Discord.Collection();
client.description = new Discord.Collection();
client.category = new Discord.Collection();
client.categories = fs.readdirSync("./commands");
client.slashCategories = fs.readdirSync("./slashCommands");
client.aliases = new Discord.Collection();
client.slashCommands = new Discord.Collection();

client.mongoose = require('./utils/mongoose');

require("./utils/utils")(client);

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {

    let commandfile = require(`./commands/${file}`)

    client.commands.set(commandfile.config.name, commandfile);

    commandfile.config.aliases.forEach(alias => {
        client.aliases.set(alias, commandfile.config.name)
    });
}

    const evtFiles = fs.readdirSync('./events');
    console.log(`Loading a total of ${evtFiles.length} events`)
    klaw('./events').on("data", (item) => {
        const evtFile = path.parse(item.path);
        if (!evtFile.ext || evtFile.ext !== ".js") return;
        const event = require(`./events/${evtFile.name}${evtFile.ext}`);
        client.on(evtFile.name, event.bind(null, client));
        console.log(`Loaded: ${evtFile.name}!`);
    });


Math.randomBetween = function (min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
};

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

//slash commands




client.mongoose.init();
client.login(config.token);
