# Weather Chatbot

## How to set up the server ?

First you need to create a file for environment variables in **config/** folder.

```json
{
    "FB": {
        "pageAccessToken": "",
        "VerifyToken": ""
    },
    "Yahoo": {
        "appID" : "",
        "publicKey" : "",
        "secretKey" : ""
    }
}
```

Use [Ngrok](https://ngrok.com/) to create an Https url for Facebook Webhook API.

Get you API keys here:
- [Yahoo Weather API](https://developer.yahoo.com/weather/)
- [Facebook Dev](https://developers.facebook.com/)

In Facebook you need to activate: **Webhook** and **Messenger** products.

The endpoint for the Webhook url is **hook/**. For example yout url will be : https://8ne74b01.ngrok.io/hook.

Create a **random Token** for the Facebook **VerifyToken**

## How to run the server ?

You can use:
- **npm run dev** to use nodemon 
- **npm start** to use node 