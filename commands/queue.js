const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
var { createQueueEmbed } = require(`${process.cwd()}/utils/functions`)

module.exports = {
    name: "queue",
    aliases: ["q", "np"],
    description: "Prints current queue and current song",
    usage: `none`,
    visible: true,
    async execute(client, message) {

        var player = client.manager.players.get(message.guild.id);

        if (!player) {
            return message.channel.send({
                embeds: [new MessageEmbed()
                .setColor(client.ee.color)
                .setTitle('Queue is empty!') 
                ]
            });
        }

        //create buttons
        let row = new MessageActionRow()
        .addComponents(
            but_1 = new MessageButton()
                .setCustomId('id_1')
                .setEmoji("⬅️")
                .setStyle('SECONDARY')
                .setDisabled(true),
            but_2 = new MessageButton()
                .setCustomId('id_2')
                .setEmoji("➡️")
                .setStyle('SECONDARY')
        );

        message.channel.send({
            embeds: [createQueueEmbed(player, 0)]
        }).then(message => {
            
            var player = client.manager.players.get(message.guild.id);
            const tracks = player.queue;

            if (tracks.length <= 10) return
            message.edit({
                components: [row]
            })

            //create collector for buttons
            const collector = message.channel.createMessageComponentCollector({ time: 60000 });
            let currentIndex = 0
            collector.on('collect', async button => {
                //deferupdate
                button.deferUpdate()
                if (button.customId === 'id_1') {
                    currentIndex -= 15
                    if (currentIndex === 0) {
                        row.components[0].setDisabled(true)
                    }
                    row.components[1].setDisabled(false)
                    await message.edit({
                        embeds: [createQueueEmbed(player, currentIndex)],
                        components: [row]
                    })
                } else if (button.customId === 'id_2') {
                    currentIndex += 15
                    if (currentIndex + 15 > tracks.length) {
                        row.components[1].setDisabled(true)
                    }
                    row.components[0].setDisabled(false)
                    await message.edit({
                        embeds: [createQueueEmbed(player, currentIndex)],
                        components: [row]
                    })
                }
                    
            });
            collector.on('end', async button => {
                await message.edit({
                    embeds: [createQueueEmbed(player, 0)],
                    components: []
                })
            });
        })
    }
}