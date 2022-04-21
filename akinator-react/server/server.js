const express = require('express')
const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));

app.post('/answer', function (req, resp){
    const answer = req.body
    resp.json("twilio here")
})
app.post('/number', function(req, resp){
    const number = req.body
    console.log(number)
})
app.listen(5000)