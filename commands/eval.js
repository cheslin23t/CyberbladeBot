const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ApplicationCommandOptionType } = require("discord.js");
const { PermissionFlagsBits } = require('discord-api-types/v10');
const data = new SlashCommandBuilder()
    .setName('eval')
    .setDescription("Runs Code")
    
    // .addUserOption(option => option.setName('target').setRequired(true).setDescription("The user to kick."))
    .addStringOption(option =>
	option.setName('code')
	.setDescription('The code to run.')
	.setRequired(true))
module.exports.execute = async (client, interaction) => {
    if (!interaction.guildId) return;

    const code = interaction.options.getString('code');
    
try {
    var evaled = eval(code);
    var embed = new Discord.EmbedBuilder()
    .setTitle("Eval Success")
    .setDescription(`\`\`\`js
${evaled}\`\`\``)

    interaction.reply({content: `\`\`\`js
${code}\`\`\``, embeds: [embed]})
} catch (e) {
    var error = e.toString()
    var embed = new Discord.EmbedBuilder()
    .setTitle("Eval Error")
    .setDescription(`\`\`\`${error}\`\`\``)
    interaction.reply({content: `\`\`\`js
${code}\`\`\``, embeds: [embed]})
}
}


module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};

module.exports.level = 5 //remove this line if level 0