# **Akinator-text** &copy;

Akinator-text is a messenger game where you can message your twilio number and play Akinator through text messages. This means that instead of using an application or a website to play you can play through texts which is much easier and versatile.

## **Prerequisite**
Please start by:
***

_npm install_

***
This enables all the relevant files to be installed.

Before you go ahead and start, you will need to download ngrok and set up a mongo database.

For ngrok, all you have to do is download the link and store it somewhere in your desktop. Afterwards you will be required to authenticate it, this information can be found on the website. Once the local host is up and running, go to command prompt and access the directory where the ngrok is installed. Once you have found the directory, write in command prompt:
***

_ngrok http 5000_

***
This is because for this application it is being hosted on port 5000. This

For the mongo databse, access the link "https://www.mongodb.com/" and sign up. After signing up, you will be required to create a cluster, a user and then a database. Once all of this is done, you will be able to connect to MongoDB via mongoose as shown in the code. The only things that need to be changed is in the .env file where:
***

_DATABASE_URI="mongodb+srv://<username>:<password>@<name_of_the_cluster>.tboab.mongodb.net/<database_name>?retryWrites=true&w=majority"_

***
Repleace all the places with "<>" with your credentials.

## **How to Start**
In order to access the website, a .env file is required.The format of the .env file should be:

***

_TWILIO_ACCOUNT_SID="Your Twilio Account SID"_

_TWILIO_AUTH_TOKEN="Your Twilio Authentication Token"_

_TWILIO_PHONE_NUMBER="Your Twilio number"_

***

After you create a Twilio account on the main page by scrolling down you will find your AUTH_TOKEN.

You can buy a phone number to use by clicking the drop down "Phone Numbers" then "Manage" then "Buy a number". The number will need to be a +44 cellphone number with call and SMS capabilities. (Icons are displayed to the right of the number to dipict the actions the number is capable of)

To find your ACCOUNT_SID click on the Twilio logo icon in the top left corner. It will take to to a page containing you ACCOUNT_SID.

## **To get it running**

Run "npm start" and this will allow you access to server page "http://127.0.0.1:5000/" but then you will be redirected to a different address through ngrok which will publically available to everyone. This will need to be inserted into your twilio webhook when you configure your twilio phone number. So it should look like this where you just need to add /inbound to the end.
***

"Your ngrok address"/inbound

***

There you have it. The application is setup for you. Enjoy and show it off to everyone :)