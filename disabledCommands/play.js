const Discord = require("discord.js");

const music = require('@sheinicke/discord.js-music');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ApplicationCommandOptionType } = require("discord.js");
const { PermissionFlagsBits } = require('discord-api-types/v10');
const data = new SlashCommandBuilder()
    .setName('play')
    .setDescription("Plays Music")
    
    // .addUserOption(option => option.setName('target').setRequired(true).setDescription("The user to kick."))
    .addStringOption(option =>
	option.setName('song')
	.setDescription('What song to play.')
	.setRequired(true))
module.exports.execute = async (client, interaction) => {
    if (!interaction.guildId) return;

           const song = interaction.options.getString('song');
           const guild = client.guilds.cache.get(interaction.member.guild.id)
           console.dir(guild)
const member = guild.members.cache.get(interaction.member.user.id);
console.dir(member);
const channel = member.voice.channel;
console.dir(channel)
           music.play({
               interaction: interaction,
               channel: channel,
               song: song
           });

}


module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};

module.exports.level = 3 //remove this line if level 0