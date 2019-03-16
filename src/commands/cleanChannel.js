const messageDeletionService = require('../services/messageDeletionService');

exports.run = (client, message, args) => {
    // TODO make run till can't delete anymore messages for the current channel
    messageDeletionService.cleanChannel(message.channel);

    // TODO make post upon completing the task
    message.channel.send('Cleaned.')
        .then(message => message.delete(10000))
        .catch(console.error);
}