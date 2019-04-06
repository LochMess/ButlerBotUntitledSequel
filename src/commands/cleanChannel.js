const messageDeletionService = require('../services/messageDeletionService');

exports.run = (client, message, args) => {
    messageDeletionService.cleanChannel(message.channel)
        .then(res => message.channel.send(`Cleaned: ${res}`))
        .then(sentMessage => sentMessage.delete(10000))
        .catch(console.error);
}