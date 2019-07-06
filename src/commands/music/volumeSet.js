const voiceService = require('../../services/voiceService');

exports.run = async (client, message, args) => {
    const dispatcher = voiceService.getDispatcher(message);
    if (!args[0]) return message.channel.send(`Provide a volume, 100 for 100%`);

    dispatcher.setVolume(args[0]/100);
}