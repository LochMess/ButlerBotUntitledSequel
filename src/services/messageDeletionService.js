async function cleanChannel (channel) {
    channel.bulkDelete(100, true)
        .then(messages => {
            console.log(
                `${messages.first().guild.name}, channel: ${messages.first().channel.name}, Bulk messages deleted: ${messages.size}`
            );
        })
        .catch(console.error);
}

module.exports = {
    cleanChannel: cleanChannel
}
