const fs = require("fs");
const Path = require("path");
const { Client, Collection, IntentsBitField }= require("discord.js");
require('dotenv').config()


const Topgg = require("@top-gg/sdk")
const express = require("express")

const app = express()

const webhook = new Topgg.Webhook(process.env.topggWebhook)





const client = global.client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildMembers,

      ],
    allowedMentions: {
        parse: ["users"]
    }
});
var sendDms = function(serverStore, member){
    var user = member.user
    msg = serverStore.welcomeMessage.replace("{user}", user.name);
    var success;
    user.send(msg).then(() => {
        success = true
    }).catch(() => {
        success = false;
    });
    return success;
}

/*
enums[0] | sendMessageTypes
    sendMessageTypes[0] | dmUser(serverStore, user) | returns true if success, false if not (user dms disabled)
    sendMessageTypes[1] | sendInChannel(serverStore, user)
*/
var enums = [[sendDms]]

client.enums = enums
// app.post("/topggVote", webhook.listener(vote => {
//     client.users.fetch(vote.user.id).then(user => {
//         user.dmChannel.send({content: "Thanks for voting!"}).catch(err => {
//             //Just ignore since the user turned off DMs
//         });
//     }).catch(err => {console.error(err)})

//     // You can also throw an error to the listener callback in order to resend the webhook after a few seconds
//   }))
client.commands = global.commands = new Collection();
const synchronizeSlashCommands = require('discord-sync-commands-v14');
require('./utils/mongoose').init()
const eventsRegister = () => {
    let eventsDir = Path.resolve(__dirname, './events');
    if (!fs.existsSync(eventsDir)) return console.log("No events dir");
    fs.readdirSync(eventsDir, { encoding: "utf-8" }).filter((cmd) => cmd.split(".").pop() === "js").forEach((event) => {
        let prop = require(`./events/${event}`);
        if (!prop) return console.log("No props.");
        console.log(`${event} was saved.`);
        client.on(event.split('.')[0], prop.bind(null, client));
        delete require.cache[require.resolve(`./events/${event}`)];
    });
};

const modelsRegister = () => {
    let eventsDir = Path.resolve(__dirname, './models');
    if (!fs.existsSync(eventsDir)) return console.log("No models dir");
    fs.readdirSync(eventsDir, { encoding: "utf-8" }).filter((cmd) => cmd.split(".").pop() === "js").forEach((event) => {
        let prop = require(`./events/${event}`);
        if (!prop) return console.log("No props.");
        console.log(`${event} model loaded.`);
        client.on(event.split('.')[0], prop.bind(null, client));
        delete require.cache[require.resolve(`./events/${event}`)];
    });
};
const commandsRegister = () => {
    let commandsDir = Path.resolve(__dirname, './commands');
    if (!fs.existsSync(commandsDir)) return console.log("No events dir.");
    fs.readdirSync(commandsDir, { encoding: "utf-8" }).filter((cmd) => cmd.split(".").pop() === "js").forEach((command) => {
        let prop = require(`./commands/${command}`);
        if (!prop) return console.log("No commands.");
        console.log(`${command} command loaded`);
        client.commands.set(prop.options.name, prop);
        delete require.cache[require.resolve(`./commands/${command}`)];
    });

};



const slashCommandsRegister = () => {
    const commands = client.commands.filter((c) => c.options);
    const fetchOptions = { debug: true };
    synchronizeSlashCommands(client, commands.map((c) => c.options), fetchOptions);
};

eventsRegister();
commandsRegister();
slashCommandsRegister();





client.login(process.env.TOKEN).then(() => {
    app.listen(8080, () => {
        console.log("Server started on port 8080");
    });
})

process.on('unhandledRejection', error => {
    console.log(error);
});
