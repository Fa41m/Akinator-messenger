require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
var number=0;

const twilio = require('twilio')(accountSid, authToken);

app.post('/answer', function (req, resp){
    const answer = req.body.name;
    console.log(answer);
    console.log(number);
    resp.json("Twilio commited");
    twilio.messages.create({body: `The character that you are thinking of is ${answer}. HAHA I beat you!`, from: `${phoneNumber}`, to: `${number}`})
    twilio.calls.create({
        twiml: `<Response>
         <Say language="en-AU">The character that you are thinking of is ${answer}. How does it feel that I beat you! HAHAHA!</Say>
         <Play>http://demo.twilio.com/docs/classic.mp3</Play>
         </Response>`,
         to: `${number}`,
         from: `${phoneNumber}`
    })
})
app.post('/number', function(req, resp){
    number = req.body.usernumber;
    console.log(number);
})
app.listen(5000)