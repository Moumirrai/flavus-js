const { MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");
const autoplay = require(`${process.cwd()}/src/utils/autoplay`);

module.exports = {
  name: "debug",
  description: "Debug command",
  usage: `none`,
  player: true,
  visible: false,
  async execute(client, message, args, player) {
    //join args into a string
    if (!player) return
    if (!player.get(`similarQueue`)) return message.channel.send(`smQueue has not been generated yet!`)
    const similarQueue = player.get(`similarQueue`);
    message.channel.send(`**Debug** - smQueue length - \`${similarQueue.length}\``)
  },
};