const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ApplicationCommandOptionType, ActionRowBuilder,  ButtonBuilder, EmbedBuilder } = require("discord.js");
const talkedRecently = new Set();
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { model } = require("mongoose");
const polLModel = require('../models/poll')
const yesButton = new ButtonBuilder()
.setCustomId('yes')
.setLabel('Yes')
.setStyle('Success')
.setDisabled(false);

const noButton = new ButtonBuilder()
.setCustomId('no')
.setLabel('No')
.setStyle('Danger')
.setDisabled(false);

const endButton = new ButtonBuilder()
.setCustomId('end')
.setLabel('End Poll')
.setStyle('Primary')
.setDisabled(false);

const data = new SlashCommandBuilder()
    .setName('poll')
    .setDescription("Manage polls")
    .addSubcommand(subcommand =>
		subcommand
			.setName('create')
			.setDescription('Creates a poll')
            .addStringOption(option => option.setName('question').setRequired(true).setDescription('The question of the poll')))    // .addUserOption(option => option.setName('target').setRequired(true).setDescription("The user to kick."))
    // .addStringOption(option =>
	// 	option.setName('reason')
	// 		.setDescription('What to tell the user about the kick.')
	// 		.setRequired(false))


module.exports.execute = async (client, interaction) => {
    
    if (!interaction.guildId) return;
    const row = new ActionRowBuilder()
			.addComponents(yesButton, noButton, endButton);
            const embed = new EmbedBuilder()
			.setColor('#0099ff')
			.setTitle('**=======Poll=======**')
            .addFields({name: "**" + interaction.options.getString('question') + "**", value: '** **'}, {name: "Yes", value: '0'}, {name: "No", value: '0'})
    interaction.deferReply();
interaction.deleteReply();
interaction.channel.send({ephemeral: false, embeds: [embed], components: [row] });
const filter = i => i.customId === 'yes' || i.customId === 'no' || i.customId === 'end';

const collector = interaction.channel.createMessageComponentCollector({ filter });

collector.on('collect', async i => {
    if(i.customId === 'yes' || i.customId === 'no' || i.customId === 'end'){
    if(i.customId === 'yes' || i.customId === 'no'){
        if (talkedRecently.has(i.message.member.id)) {
            return i.reply({ephemeral: true, content: "Please don't spam the poll!"});
    } else {

           // the user can type the command ... your command code goes here :)

        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(i.message.member.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(i.message.member.id);
        }, 15000);
    }

        console.log('e')
    }
    if (i.customId === 'yes') {

    const row1 = new ActionRowBuilder()
			.addComponents(yesButton, noButton, endButton);
            const embed = new EmbedBuilder()
			.setColor('#0099ff')
            
			.setTitle('**=======Poll=======**')
            .addFields({name: "**" + interaction.options.getString('question') + "**", value: '** **'}, {name: "Yes", value: (parseInt(i.message.embeds[0].data.fields[1].value) + 1).toString()}, {name: "No", value: i.message.embeds[0].data.fields[2].value.toString()})
            
            i.update({ephemeral: false, embeds: [embed], components: [row] });
        }
        else if(i.customId === 'no') {
            const row2 = new ActionRowBuilder()
            .addComponents(yesButton, noButton, endButton);
            const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('**=======Poll=======**')
            .addFields({name: "**" + interaction.options.getString('question') + "**", value: '** **'}, {name: "Yes", value: i.message.embeds[0].data.fields[1].value.toString()}, {name: "No", value: (parseInt(i.message.embeds[0].data.fields[2].value) + 1).toString()})
            i.update({ephemeral: false, embeds: [embed], components: [row] });
        } else if(i.customId === 'end') {
            i.update({ephemeral: false, embeds: [embed] });
        }
    }
    
	
});
}


module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};
module.exports.level = 3;