const { EmbedBuilder } = require("@discordjs/builders");
const { TextChannel } = require("discord.js");
const Command = require("../structures/command.js")

module.exports = new Command({
    name: "musicchannel",
    aliases: ['mc'],
    description: "Selects a channel for playing musics",
    permission: "ADMINISTRATOR",
    options: [
        {
            description: 'Channel name',
            name: 'channel',
            required: false,
            type: 3
        }
    ],
    async run(message, args, client, slash){

        if(!args[0]) {
            console.log("Reply to commands");
            client.musicchannel = null;
            const embed = new EmbedBuilder();
            embed.setDescription(`No channel selected, ${client.user.username} now only reply directly to commands.`);
            return message.reply({ embeds: [embed], ephemeral: true });
        } 

        const guild = message.guild;
        const guildChannels = guild.channels.cache;
        const result = guildChannels.filter(channel => (channel.name === args[0] && channel instanceof TextChannel));
        

        if(result.size === 0) {            
            console.log("No text channel found")
            const embed = new EmbedBuilder();
            embed.setDescription(`No text channel found.`);
            return message.reply({ embeds: [embed], ephemeral: true });
        } else {
            guild.musicChannel = result.first();
            const embed = new EmbedBuilder();
            embed.setDescription(`Text channel found: ${args[0]}. ${client.user.username} now will play in channel "${args[0]}".`);
            return message.reply({ embeds: [embed], ephemeral: true });
        }

    }
})