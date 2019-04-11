const commands = require('../commands/commandsIndex.js');
const commandSuggestionService = require('../services/commandSuggestionService');

exports.handle = async (client, message, command, args) => {
    try {
        commands[command].run(client, message, args);
    } catch (e) {
        console.log(`Not a command! ¯\\_(ツ)_/¯`);
        message.channel.send(`Did you mean? ${
            await commandSuggestionService.suggestCommand(command)
                .then(s => s.join(", "))}`
        );
    }
}