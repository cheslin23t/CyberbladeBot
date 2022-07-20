
module.exports = async (client) => {
    await client.user.setPresence({ activities: [{ name: "/help", type: 2 }], status: 'dnd', afk: false });
};
