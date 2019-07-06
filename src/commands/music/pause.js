const voiceService = require('../../services/voiceService');

exports.run = async (client, message, args) => {
    const dispatcher = voiceService.getDispatcher(message);
    dispatcher.pause();
    message.channel.send(':pause_button: Coffee break?');
}