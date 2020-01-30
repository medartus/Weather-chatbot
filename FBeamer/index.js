'use strict ';

const fetch = require('node-fetch');
const textMatcher = require('../weather');

class FBeamer {
    constructor (PageAccesToken, VerifyToken) {
        try {
            this.pageAccesToken = PageAccesToken;
            this.verifyToken = VerifyToken;
        } catch (error) {
            console.log(error)
        }
    }

    registerHook(req , res){
        const params = req.query;
        const mode = params['hub.mode'];
        const token = params['hub.verify_token'];
        const challenge = params['hub.challenge'];

        try {
            if (mode === 'subscribe' && token === this.verifyToken) {
                console.log("WebHook registered")
                return res.send(challenge) ;
            } else {
                throw "Could not register webhook !";
            }
        } catch (e) {
            console.log(e) ;
            return res.sendStatus(500) ;
        }
    }

    chatResponse(text,id) {
        const body = {
            messaging_type:'RESPONSE',
            recipient: {
                id: id
            },
            message : {
                text : text
            }   
        }
            
        fetch("https://graph.facebook.com/v5.0/me/messages?access_token="+this.pageAccesToken,
                { method: 'POST', body: JSON.stringify(body), 
                headers: { 'Content-Type': 'application/json' }}
        )
        .then(res => res.json())
        .then(json => console.log(json))
        .catch((err)=>console.log(err));
    }

    async incoming (req, res) {
        // Extract the body of the POST request
        let data = req.body;
        if(data.object === 'page') {
            // Iterate through the page entry Array
            const {message,sender} = data.entry[0].messaging[0];
            const response = await textMatcher(message.text)
            this.chatResponse(response,sender.id)
        }
        res.sendStatus(200);
    }
        

}

module.exports = FBeamer ;
