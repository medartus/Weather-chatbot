'use strict ';

if( process.env.NODE_ENV === 'production ') {
    module.exports = {
        FB: {
            pageAccessToken : process.env.pageAccessToken ,
            VerifyToken : process.env.VerifyToken
        },
        Yahoo: {
            appID: process.env.appID,
            publicKey : process.env.publicKey,
            secretKey : process.env.secretKey
        }
    }
} 
else{
    module.exports = require('./development.json') ;
}
