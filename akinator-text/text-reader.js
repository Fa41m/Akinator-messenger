// https://www.youtube.com/watch?v=f017oXQzzp8
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const twilio = require('twilio');
const mongoose = require('mongoose');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
const dbUrl = process.env.DATABASE_URI;

const client = new twilio(accountSid, authToken);

app.use(bodyParser.urlencoded({extended: false}))

// https://www.youtube.com/watch?v=-PdjUx9JZ2E
const connectDb = async () => {
    try{
        await mongoose.connect(dbUrl, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    }
    catch(err){
        console.log(err);
    }
}

let MessageSchema = new mongoose.Schema({
    phoneNumber: String,
    human:String,
    youtuber:String,
    movie:String,
    book:String,
    female:String,
    character: String
})

let Message = mongoose.model('Message', MessageSchema);

connectDb();
mongoose.connection.once('open', () => {
    console.log('Database is connected');
    // app.listen(5000, ()=> {
    //     console.log('listening on port 5000');
    // })
})

app.get('/', (req, res) => {
    res.end();
})

app.post('/inbound', (req, res) => {
    // Phone number sending message
    let from = req.body.From;
    // Twilio phone number
    let to = req.body.To;
    // Body of the message
    let body = req.body.Body;

    // Keep track of whether the message is new or old
    Message.find({phoneNumber: req.body.From}, (err, message) => {
        // console.log(message);
        if(message.length !== 0){
            // Continue the message
            if(!message[0].human && !message[0].youtuber && !message[0].movie && !message[0].book && !message[0].female){
                Message.findByIdAndUpdate(message[0].id, {"$set": {"human":body}}, {"new": true, "upsert": true}, () =>{
                    client.messages.create({
                        to: `${from}`,
                        from: `${to}`,
                        body: 'Let us begin. Please answer the questions using only yes or no. Is your character Human?'
                    })
                    res.end();
                });
            }
            else if(!message[0].youtuber && !message[0].movie && !message[0].book && !message[0].female){
                Message.findByIdAndUpdate(message[0].id, {"$set": {"youtuber":body}}, {"new": true, "upsert": true}, () =>{
                    client.messages.create({
                        to: `${from}`,
                        from: `${to}`,
                        body: 'Is your character a youtuber?'
                    })
                    res.end();
                });
            }
            else if(!message[0].movie && !message[0].book && !message[0].female){
                Message.findByIdAndUpdate(message[0].id, {"$set": {"movie":body}}, {"new": true, "upsert": true}, () =>{
                    client.messages.create({
                        to: `${from}`,
                        from: `${to}`,
                        body: 'Is your character in a movie?'
                    })
                    res.end();
                });
            }
            else if(!message[0].book && !message[0].female){
                Message.findByIdAndUpdate(message[0].id, {"$set": {"book":body}}, {"new": true, "upsert": true}, () =>{
                    client.messages.create({
                        to: `${from}`,
                        from: `${to}`,
                        body: 'Is your character in a book?'
                    })
                    res.end();
                });
            }
            else if(!message[0].female){
                Message.findByIdAndUpdate(message[0].id, {"$set": {"female":body}}, {"new": true, "upsert": true}, () =>{
                    client.messages.create({
                        to: `${from}`,
                        from: `${to}`,
                        body: 'Is your character female?'
                    })
                    res.end();
                });
            }
        }
        else{
            // Create new conversation 
            if(body === 'Game'){
                let newMessage = new Message();
                newMessage.phoneNumber = from;
                newMessage.save(() => {
                    client.messages.create({
                        to: `${from}`,
                        from: `${to}`,
                        body: 'Welcome to Akinator-Text! If you do not know what this game is then do not worry. I will attempt to guess the character you are thinking of. Please think of a character and we shall begin the game.'
                    })
                    client.messages.create({
                        to: `${from}`,
                        from: `${to}`,
                        body: 'Let us begin. Please answer the questions using only yes or no. Is your character Human?'
                    })
                    res.end();
                })
            }
        }
        res.end();
    })
})

app.listen(5000, ()=> {
    console.log('listening on port 5000');
})
