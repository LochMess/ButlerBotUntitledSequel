const commands = require('../commands/index.js');

exports.handle = (client, message, command, args) => {
    try {
        commands[command].run(client, message, args);
    } catch (e) {
        console.log(`Error not a command.`);
        console.log(e);
    }
}