const commands = require('../commands/commandsIndex.js');
const levenshtein = require('fast-levenshtein');

async function getCloseMatch(command, attemptedCommand) {
    let distance = levenshtein.get(command, attemptedCommand);
    return (distance <= attemptedCommand.length/2) ? {command: command, distance: distance} : null;
}


async function suggestCommand(attemptedCommand) {    
    let commandsList = Object.keys(commands);
    let sugguestionsPromises = commandsList.map(async cmd => getCloseMatch(cmd, attemptedCommand));
        
    return await Promise.all(sugguestionsPromises)
        .then(sugguestions => 
            sugguestions.filter(suggestion => suggestion !== null)
                .sort((sugguestionA, sugguestionB) => 
                    sugguestionA.distance - sugguestionB.distance
                )
                .map(suggestion => suggestion.command)
        );   
}

module.exports = {
    suggestCommand: suggestCommand
}