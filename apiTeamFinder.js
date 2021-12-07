const express = require ("express");
const app = express();
const cors = require ("cors");
let port = process.env.PORT || 3140;


app.use(cors())

let mysql = require ("mysql2")
let connection = mysql.createConnection(
        {
                host: "teamfinder.ch9hdwuswbp3.eu-west-2.rds.amazonaws.com",
                user: "admin",
                password : "codenotch",
                database : "TeamFinder"
        }
)

connection.connect(function(error){
        if (error){
                console.log(error)
        }
        else{
                console.log ("Hola camarada")
        }
})

app.listen(port)