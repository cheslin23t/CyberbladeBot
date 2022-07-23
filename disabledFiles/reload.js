const Discord = require("discord.js");
const mongoose = require('mongoose')
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ApplicationCommandOptionType } = require("discord.js");
const { PermissionFlagsBits } = require('discord-api-types/v10');
mongoose.connect(process.env.MongooseURI);
const data = new SlashCommandBuilder()
    .setName('reload')
    
    .setDescription("Reloads all commands.")
    
module.exports.execute = async (client, interaction) => {
    if (!interaction.guildId) return;

    await interaction.deferReply();
    const user = interaction.member.user
    const adminStore = require('../models/admin')
    const admin = await adminStore.findOne({ userId: user.id })
    if (!admin) return interaction.editReply('You\'re not an admin.')
    if(admin.level >= 5) {
        interaction.editReply('Reloading commands...')
        client.commands.forEach(command => {
            client.unloadCommand(command.name)
        }
        )
        client.loadCommands()
        return interaction.followUp({content: 'All commands have been reloaded.', ephemeral: true })
    }};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};
