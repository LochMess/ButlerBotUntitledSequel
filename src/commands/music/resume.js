const voiceService = require('../../services/voiceService');

exports.run = async (client, message, args) => {
    const dispatcher = voiceService.getDispatcher(message);
    dispatcher.resume();
    message.channel.send(':arrow_forward: Rushing B!');
}