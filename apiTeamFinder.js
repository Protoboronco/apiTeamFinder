const express = require ("express");
const app = express();
const cors = require ("cors");
let port = process.env.PORT || 3140;


app.use(cors())

app.use(express.urlencoded({extended: false}))
app.use(express.json())

let mysql = require ("mysql2");
const { info } = require("console");
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

app.get("/usuarios", function(request,response){
    let sql = `SELECT * FROM Usuarios`
    connection.query(sql, function(err,res){
        
        if(err){
                console.log(err)
        }
        else{
                let respuesta = {error: false, codigo: 200, resultado: res}
                response.send(respuesta)
        }
    }
)
})



// **********************USUARIO*****************


app.get("/usuario", function(request,response){
    
        let id = request.query.id
    
        if (id == null){
    
            let sql = `SELECT * FROM usuario`
            let respuesta;
    
            connection.query(sql, function(err,res){
            
                if(err){
    
                    console.log(err)
                    respuesta = {error: true, codigo: 200, resultado:res}
                }
                else{
                    respuesta = {error: false, codigo: 200, resultado:res}
                   
                }
                response.send(respuesta)
            })
        }
        else {
            
            let sql = `SELECT id_user, email, nickname, password, G_manager, lfm,
             fecha_nacimiento, info_ad, imagen, discord, twitter, n_jugador FROM usuario WHERE id_user = ${id}`
    
            connection.query(sql, function(err,res){
    
                if(err){
                    console.log(err)
                }
                else{
                    console.log(res)
                    let respuesta = {error: false, codigo:200, resultado:res}
                    response.send(respuesta)
                }
            })
        }
    
    })
    
    app.post("/usuario", function(request, response){
    
        let respuesta;
        let sql = `INSERT INTO usuario(email, nickname, password, G_manager, lfm, fecha_nacimiento, info_ad,imagen,discord, twitter, n_jugador) 
                   VALUES(\"${request.body.email}\", \"${request.body.nickname}\", \"${request.body.password}\",
                   \"${request.body.G_manager}\",\"${request.body.lfm}\",\"${request.body.fecha_nacimiento}\", \"${request.body.info_ad}\",
                   \"${request.body.imagen}\",\"${request.body.discord}\", \"${request.body.twitter}\",\"${request.body.n_jugador}\")`
    
                connection.query(sql, function(err,res){
                        if(err){
                                console.log(err)
                        }
                        else{
                                console.log("creado")
                                console.log(res)
                                respuesta = {error: false, codigo: 200, mensaje: "Usuario creado", resultado: res}
                                response.send(respuesta)
                        }
                })
                // console.log("entra")
    })
    
    app.put("/usuario", function(request, response){

    let respuesta;
        let id = request.body.id_user
        let email = request.body.email
        let nickname = request.body.nickname
        let password = request.body.password
        let G_manager = request.body.G_manager
        let lfm = request.body.G_manager
        let fecha_nacimiento = request.body.fecha_nacimiento
        let info_ad = request.body.info_ad
        let imagen = request.body.imagen
        let discord = request.body.discord
        let twitter = request.body.twitter
        let n_jugador = request.body.n_jugador
    
        let params = [email, nickname, password, G_manager, lfm, fecha_nacimiento, info_ad, imagen, discord, twitter, n_jugador, id]
        
        let sql = 
        `UPDATE usuario SET email = \"${request.body.email}\", nickname = \"${request.body.nickname}\",
         password =  \"${request.body.password}\", G_manager = \"${request.body.G_manager}\", lfm = \"${request.body.lfm}\",
         fecha_nacimiento = \"${request.body.fecha_nacimiento}\", info_ad = \"${request.body.info_ad}\", 
         imagen = \"${request.body.imagen}\", discord = \"${request.body.discord}\", twitter = \"${request.body.twitter}\",
         n_jugador = \"${request.body.n_jugador}\", id_user = \"${request.body.id_user}\" WHERE id_user = ${id}` 
                   
        connection.query(sql, params, function(err,res){
                if(err){
                         console.log(err)
                         respuesta = {error: true, codigo: 200, mensaje: "error", resultado: res}
    
                }
                else{   console.log("usuario cambiado")
                        console.log(res)
                        respuesta = {error: false, codigo: 200, mensaje: "usuario cambiado", resultado: res}
                        
                }
                response.send(respuesta)
        })
        // console.log("entra")
    })
    
    app.delete("/usuario", function(request, response){
    
        let id = request.query.id
        console.log(id)
        if (id != null){
        let sql2 = `DELETE FROM usuario WHERE id_user = ${id}`
        connection.query(sql2, function(err,res){
            let respuesta;
                if(err){
                        console.log(err)
                        respuesta = {error: true, codigo: 200, mensaje: "ERROR", resultado: res}
                }
                else{
                        console.log("eliminado")
                        console.log(res)
                        respuesta = {error: false, codigo: 200, mensaje: "usuario eliminado", resultado: res}
                       
                }
            
                response.send(respuesta)
        })}
        // console.log("entra")
    })
//holaaa us quiero

app.listen(port)