'use strict';

const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;
const FBeamer = require('./FBeamer')
const {FB} = require('./config')
const bodyParser = require('body-parser')
const fbeamer = new FBeamer(FB.pageAccessToken,FB.VerifyToken)

server.use(bodyParser.json())

server.get('/',(req,res) => res.send("API working !!"));
server.get('/hook',(req,res) => fbeamer.registerHook(req,res));
server.post('/hook',(req,res) => fbeamer.incoming(req,res));
server.listen(PORT,() => console.log(`The bot server is running on port ${ PORT }`));
