const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { PermissionFlagsBits } = require('discord-api-types/v10');
const data = new SlashCommandBuilder()
    .setName('commands')
    .setDescription("Shows all commands")
    
    // .addUserOption(option => option.setName('target').setRequired(true).setDescription("The user to kick."))
    // .addStringOption(option =>
	// 	option.setName('reason')
	// 		.setDescription('What to tell the user about the kick.')
	// 		.setRequired(false))
module.exports.execute = async (client, interaction) => {
    if (!interaction.guildId) return;
    const embed = new EmbedBuilder()
    .setColor('#0099ff')
	.setTitle('Commands')
	.setAuthor({ name: 'Cyberblade', iconURL: 'https://cdn.discordapp.com/avatars/998353497173020692/ab80a78eb1dc6f0be5ab09008a25e66f.png?size=1024'})
	.setDescription('Shows the list of commands. Commands with <:VIP:999298634090815581> are VIP commands, and require the VIP package in `/store`. Commands with <:Premium:999298113095348285> are premium commands, and also require the beta package from `/store`. Commands with <:BetaTester:999298047592890450> are beta commands, and also require the premium package from `/store`.  Anything that requires a higher rank will have <:Developer:999300178890723329>')
	.addFields(
		{ name: '**Moderation**', value: '`/kick` - Kicks an user from the server, optionally with a reason, which will be shown to that user, unless their DMS are turned off. \n\n `/ban` - Bans an user from the server, optionally with a reason, which will be shown to that user.' },
		{ name: '**Fun**', value: '`/dog` - [<:BetaTester:999298047592890450>] - Shows pictures of cute dogs, a cure to depression!!\n\n`/poll` - [<:BetaTester:999298047592890450>] - (Currently not working) Creates a poll! ' },
		{ name: '**Info**', value: '`/help` - Shows how to find the slash command list implemented to discord.\n\n `/commands` - The command that you just did!', inline: false },
		{ name: '**Developer Commands**', value: '`/restart` - [<:Developer:999300178890723329>] - Restarts the bot\n\n`/rank` - [<:Developer:999300178890723329>] - Changes an user rank' },
	)
	.setTimestamp()
	.setFooter({ text: 'Cyberblade@2022', iconURL: 'https://cdn.discordapp.com/avatars/998353497173020692/ab80a78eb1dc6f0be5ab09008a25e66f.png?size=1024' });
    await interaction.channel.send({ embeds: [embed] });
}

console.log('hi')
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};
