const patternDict = [{
    pattern : '\\b(?<greeting>Hi|Hello|Hey)\\b',
    intent : 'Hello'
},{
    pattern :'\\b(?<exit>bye|exit)\\b',
    intent : 'Exit'
},{
    pattern :'\\b((is it|will it be) (?<prediction>raining|rainy|sunny|cloudy|snowy|foggy|windy|hot|cold) (?<city>in( [a-zA-Z]+)+) (?<time>today|(the day after )?tomorrow|in [1-7] day))\\b',
    intent : 'Weather Question'
},{
    pattern :'\\b(?<city> in( [a-zA-Z]+)+)\\b',
    intent : 'Current Weather'
}];

module.exports = patternDict;
    