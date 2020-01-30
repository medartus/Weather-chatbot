"use strict ";
const OAuth = require('oauth');
const matcher = require('../matcher');
const { Yahoo } = require('../config');

const { appID , publicKey, secretKey } = Yahoo;

const header = {
    "X-Yahoo-App-Id": appID
};

const request = new OAuth.OAuth(null,null,publicKey,secretKey,'1.0',null,'HMAC-SHA1',null,header);

const getWeather = city => {
    return new Promise ( async ( resolve , reject ) => {
        try {
            await request.get('https://weather-ydn-yql.media.yahoo.com/forecastrss?location='+city+'&format=json&u=c',null,null,
            (err, data) => {
                if (err) {
                    throw new Error("Sorry but we have a problem with the api : " + err);
                } 
                else{
                    const parsedData = JSON.parse(data);
                    resolve(parsedData)
                }
            })
        }
        catch(error) {
            reject(error);
        }
    }) ;
 }

const textMatcher = async (reply) =>{
    return await matcher(reply, async cb => {
        let response = ""
        if(cb.intent == "Hello") response += 'Hi, for wich city do you want to see the weather ?'
        else if(cb.intent == "Current Weather") {
            const city = cb.entities.city.substr(4)
            await getWeather(city)
                .then((data)=>{
                    let {city,country} = data.location;
                    let {text,temperature} = data.current_observation.condition;
                    
                    if (temperature<15) temperature = temperature.toString()
                    else temperature = temperature.toString()

                    response += "The weather in "+city+", "+country+" is "+text+" with a temperature of "+temperature+"°C."
                })
                .catch((err)=>{
                    response += err
                })
        }
        else if(cb.intent == "Weather Question") {
            const prediction = cb.entities.prediction;
            let time = cb.entities.time;
            let city = cb.entities.city.substr(3);
            const futur = city.search(' the day after')
            if(futur>=0){
                city = city.substring(0,futur);
                time = "the day after " + time;
            }
            await getWeather(city)
                .then((data)=>{
                    let {city,country} = data.location;
                    let text,temperature = null;
                    if(time=='today') {
                        text = data.current_observation.condition.text;
                        temperature = data.current_observation.condition.temperature;
                    }
                    else if(time=='tomorrow' || time=='in 1 day'){
                        text = data.forecasts[0].text;
                        temperature = data.forecasts[0].high;
                    }
                    else if(time=='the day after tomorrow' || time=='in 2 day'){
                        text = data.forecasts[1].text;
                        temperature = data.forecasts[1].high;
                    }
                    else if(time.search('day')>=0){
                        const dayNumber = Number(time.substring(3,5))-1;
                        text = data.forecasts[dayNumber].text;
                        temperature = data.forecasts[dayNumber].high;
                    }
                    if(text.toLowerCase() == prediction.toLowerCase() || (temperature<15 && prediction.toLowerCase() == 'cold') || (temperature>=15 && prediction.toLowerCase() == 'hot')) response += "Yes it is\n"
                    else response += 'No it isn\'t\n'

                    if (temperature<15) temperature = temperature.toString()
                    else temperature = temperature.toString()

                    if(time=='today')response += "The weather in "+city+", "+country+" is "+text+" with a temperature of "+temperature +"°C."
                    else response += "The weather in "+city+", "+country+" will be "+text+" with a temperature of "+temperature+"°C."
                })
                .catch((err)=>{
                    response += err
                })
        }
        else response += 'Sorry, but I didn\'t understand !'

        return response;
    }) ;
}

 module.exports = textMatcher;
