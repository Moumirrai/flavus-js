const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "stop",
  aliases: ["ds", "leave"],
  description: "Stops player, clears queue and leaves voice channel",
  visible: true,
  player: true,
  async execute(client, message, args, player) {
    if (!player) {
      return message.channel.send(client.error("I am not playing anything right now!"));
    }
    player.destroy();
    return message.react("🛑").catch((e) => {});
  },
};