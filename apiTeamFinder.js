const express = require ("express");
const app = express();
let port = process.env.PORT || 3140;

app.use(express.urlencoded({extended: false}))
app.use(express.json())

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
                console.log ("Hola gamer")
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

     

app.post('/login', (req, res) => {
        const user              = req.body.nombre;
        const password          = req.body.password;
        const params            = [user,password]
        const query             = `SELECT id_user FROM usuario WHERE nickname = ? and password = ?`;
        let response;
        connection.query(query,params,(err, results) =>{
            if(err){
                console.error(err);
                response = {
                    error:true,
                    msg:"Error al conectar con la base de datos",
                    resultado:err
                };
                res.status(500).send(response);
                return;
            }
            if (results.length > 0) {
                console.log("login correcto")
                response    = {
                    error:false,
                    msg:"Inicio de sesión completado",
                    resultado:results,
                   
        
                }
                res.status(200).send(response);
            } else {
                response = {
                    error:false,
                    msg:"El usuario o la contraseña no son correctos",
                    resultado:results
                }
                res.status(404).send(response);
            }
        });
      });
      app.post('/reg', (request, res) => {
        const user              = request.body.nickname;
        const password          = request.body.password;
        const params            = [user,password]
        const query             = `SELECT id_user FROM usuario WHERE nickname = ? and password = ?`;
        let response;
        connection.query(query,params,(err, results) =>{
            if(err){
                console.error(err);
                response = {
                    error:true,
                    msg:"Error al conectar con la base de datos",
                    resultado:err
                };
                res.status(500).send(response);
                return;
            }
            if (results.length > 0) {
                console.log("Usuario ya existente")
                response    = {
                    error:false,
                    msg:"Usuario ya existente",
                    resultado:results,
                   
        
                }
                res.status(200).send(response);
            } else {

                let crear = `INSERT INTO usuario(email, nickname, password, G_manager, Lfm, fecha_nacimiento, info_ad,imagen,n_jugador,twitter,discord ) 
                VALUES(\"${request.body.email}\", \"${request.body.nickname}\", \"${request.body.password}\", \"${request.body.fecha_nacimiento}\",\"${request.body.G_manger}\", \"${request.body.lfm}\",\"${request.body.info_ad}\",\"${request.body.imagen}\",\"${request.body.discord}\",\"${request.body.twitter}\",\"${request.body.n_jugador}\")`

                connection.query(crear, function(err,res){

                        if(err){
                                console.log(err)
                        }
                        else{
                                console.log("persona creada")
                                console.log(res)
                                respuesta = {error: false, codigo: 200, mensaje: "Usuario creado", resultado: res}
                               
                        }
                })


                response = {
                    error:false,
                    msg:"El usuario o la contraseña no son correctos",
                    resultado:results
                }
                res.status(404).send(response);
            }
        });
      });

    




//holaaa us quiero

app.listen(port)