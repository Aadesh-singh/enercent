const express       =   require('express');
const bodyparser    =   require('body-parser');
const app           =   express();
const cors          =   require("cors");
const path          =   require('path');
const moment        =   require('moment-timezone');
// const resetPassword =   require('./lib/auth/resetPassword');
// const adminAuth     =   require('./lib/admin/adminAuth');
// const adminAPI      =   require('./lib/admin/adminAPI');
// const payment       =   require('./lib/payment/payment')
// const nft                   =   require('./lib/nft/nft');
// const nftTransactions       =   require('./lib/nft/nftTransactions');
const blockChain = require('../common/blockChain/blockchain.js')
//BODY PARSER PRESET

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(express.text({ limit: '200mb' }));

// CORS PRESETS
/**
 * @swagger
 * tags:
 *   name: Hello
 *   description: Greetings API from TheCodeBUzz
 */
 
/**
 * @swagger
 * path:
 *  /hello:
 *    get:
 *      summary: Get greeting message from TheCodebuzz
 *      responses:
 *        "200":
 *          description: GET reponse from API
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 */

app.use(cors());

app.use(express.static("docs"));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT,OPTIONS');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});


// Timezone setup

moment.tz.setDefault("Europe/London");


app.use('/api', blockChain);

module.exports = app;