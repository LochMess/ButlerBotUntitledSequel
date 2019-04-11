async function reduceRetrievedMessagesToDeletables(messages) {
    let currentDate = new Date().getTime();
    messages.sweep(message => {
        return (((currentDate - message.createdAt.getTime()) /
            (1000 * 60 * 60 * 24)) > 14
        );
    });
    return messages
}

async function deleteMessages(messages, channel) {
    if (messages.size === 0)
        return 'No more messages to delete.';
    return channel.bulkDelete(messages)
        .then(deletedMessages => cleanChannel(channel))
        .catch(e => {
            console.error('Delete messages error has occured:');
            throw new DeleteMessagesAsyncFunctionException(e);
        });
}

async function cleanChannel(channel) {
    return channel.fetchMessages({ limit: 100 })
        .then(messages => reduceRetrievedMessagesToDeletables(messages))
        .then(messages => deleteMessages(messages, channel))
        .catch(e => {
            console.error('Clean channel error has occured:');
            throw new CleanChannelAsyncFunctionException(e);
        });
}

module.exports = {
    cleanChannel: cleanChannel
}
