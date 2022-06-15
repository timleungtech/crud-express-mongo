## Summary:
A Starwars Quotes CRUD app made with Node, Express, and MongoDB. 

## Lessons learned: 
* Used Express CRUD methods
* Used EJS engine to inject POST request form data into an HTML template
* Connected Node server to MongoDB
* Installed dependencies and devDependencies like nodemon
* Placed node_modules in .gitignore to lessen unnecessary file transfers
* Used .env and .gitignore files to hide config vars and keys
* Placed API fetches in client side main.js

## How it works: 
* Create (Add quote via form)
* Read (Redirect back to root)
* Update (Replace Yoda's quote)
* Delete (Delete Darth Vader's quote)

## Bugs encountered: 
* Application was crashing before GET request on root. Bug was fixed by allowing .env ports set by Heroku or to default port 3000 used to develop locally. Port listen execution also had to come before connecting to database.
* MongoDB - The server was waiting for a response until database permissions were changed to allow access from anywhere instead of only whitelisting only my IP.
* Procfile was not able to be parsed when pushing to Heroku. Error disappeared when file is deleted. Seems that Procfile is no longer necessary to start node server in Heroku.

https://starwars-quotes-crud-app.herokuapp.com/
