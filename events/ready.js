module.exports = (client) => {
    console.log('Terminal 3.0 is online');

    setInterval(() => {
        client.user.setPresence({
            status: 'online',
            activity: {
                name: client.guilds.cache.size + ' Servers | *help',
                type: "WATCHING",
            },
        });
    }, 120000);

}
