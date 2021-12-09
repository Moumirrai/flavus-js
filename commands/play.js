const { MessageEmbed } = require('discord.js');
const ee = require(`${process.cwd()}/config/embed.json`)
const playermanager = require(`${process.cwd()}/handlers/playermanager`);

module.exports = {
    name: "play",
    aliases: ["p"],
    description: "Add a song to the queue",
    usage: `none`,
    visible: true,
    async execute(client, message, args) {
        //if no args return error
        if (!args[0])
        return message.reply({
            embeds: [new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setTitle('No arguments provided!') 
            ]
        });
        if (args.join("").includes("spotify")) {
        playermanager(client, message, args, `song:raw`);
        } else {
        //play from YOUTUBE
        playermanager(client, message, args, `song:youtube`);
        }

    }
}