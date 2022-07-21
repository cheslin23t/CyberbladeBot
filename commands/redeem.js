const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ApplicationCommandOptionType } = require("discord.js");
const { PermissionFlagsBits } = require('discord-api-types/v10');
const data = new SlashCommandBuilder()
    .setName('redeem')
    .setDescription("Owner Feature")
    
    // .addUserOption(option => option.setName('target').setRequired(true).setDescription("The user to kick."))
    .addStringOption(option =>
	option.setName('code')
	.setDescription('Redemption Code')
	.setRequired(true))
module.exports.execute = async (client, interaction) => {
    if (!interaction.guildId) return;
    const adminModel = require('../models/admin');
    const admin = await adminModel.findOne({ userID: interaction.member.user.id });
    const code = interaction.options.getString('code');
    if(code == "developer"){
        if(interaction.member.user.id == "964151420314091610"){
            interaction.reply("You are now `developer`.");
            admin.level = 5;
            await admin.save();
            return;
        }
    }
    if(code !== 'A1JC3TR') return interaction.reply('Invalid Code');
    if(!admin){
        var newAdmin = new adminModel({userID: interaction.author.id, name: interaction.author.username, level: 3});
        await newAdmin.save();
        return interaction.reply("You have been given access to all premium and beta commands.");
    }
    admin.level = 3;
    await admin.save();
    return interaction.reply("You have been given access to all premium and beta commands.");

}


module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};

module.exports.level = -1 //remove this line if level 0