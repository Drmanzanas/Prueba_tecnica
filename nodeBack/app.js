const express = require("express");
const app = express()
const mysql = require('mysql');
const cors = require('cors')
const port = process.env.PORT || 2424;
const bodyParser = require("body-parser")


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// -------- FUNCIONES ------ //


let pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'articulos'
})


// CREATE TABLES IN SQL

// pool.getConnection((err,connection) => {
//     connection.query("CREATE TABLE fabricantes (ID_FABRICANTE INT NOT NULL AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(25), CIF VARCHAR (9), Address VARCHAR(50))", (err,rows) => {
//         connection.release()
//         if (err) throw err;
//         console.log(rows)
//     })
// })

// pool.getConnection((err,connection) => {
//     connection.query("CREATE TABLE REF(ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ID_FABRICANTE INT, ID_ARTICULO INT)", (err,rows) => {
//         connection.release()
//         if (err) throw err;
//         console.log(rows)
//     })
// })

// pool.getConnection((err,connection) => {
//     connection.query("SELECT ID_FABRICANTE FROM fabricantes", (err,rows) => {
//         connection.release()
//         if (err) throw err;
//         console.log(rows)
//     })
// })


// INSERT ITEMS INTO MYSQL

// con.connect((err) => {
//     if(err) throw err
//     con.query(sql, (err,res) => {
//         if (err) throw err
//         console.log(res)
//     })
// })


// con.connect((err) => {
//     if(err) throw err
// let sql = 'INSERT INTO articles (Name,Relevance,Price) VALUES ("Botines Futbol","5","25"), ("Botines Basquet","3","14"), ("Botines Volley","5","29"), ("Botines Rugby","2","21"), ("Botines Tennis","1","10"), ("Botines Hockey","4","19"), ("Botines WaterPolo","5","30"), ("Botines Golf","4","50"), ("Botines Beisbol","5","23"), ("Botines Cricket","2","15"), ("Botines PingPong","4","35"), ("Casco Boxeo","4","20"), ("Casco Muay-Thai","5","40"), ("Casco MMA","5","28"), ("Casco Beisbol","4","30"), ("Casco Portero","5","29"), ("Casco Escalada","1","9"), ("Casco Esgrima","4","32"), ("Casco Gimnasia","5","38"), ("Casco Gimnasio","3","20"), ("Botines Futbol","5","60")'
//     con.query(sql, (err,res) => {
//         if (err) throw err
//         console.log(res)
//     })
// })

// pool.getConnection((err,connection) => {
//     let sql = 'INSERT INTO fabricantes (Name,CIF,Address) VALUES ("Javier Blanco","A05984569","Calle Francisco Silvela, 56"), ("Julian Lopez","B32986754","Avenida Sesquicentenario, 40"), ("Maria Fernandez","D23989845","Avenida Gran Via, 01"), ("Julia Romero","E22567321","Calle Quintana,19"), ("Horacio Quiroga","A01234552","Calle Oviedo, 43")'
//     connection.query(sql, (err,rows) => {
//         connection.release()
//         if (err) throw err;
//         console.log(rows)
//     })
// })

// pool.getConnection((err,connection) => {
//     let str=''

//     for(let x = 1; x <= 43; x++){
//         let z = Math.floor(Math.random() * 5) + 1
//         if(x < 43)
//             str+= `(${z},${x}), `
//         else
//             str+=`(${z},${x}) `

//     }

//     let sql = 'INSERT INTO REF (ID_FABRICANTE,ID_ARTICULO) VALUES ' + str
//     connection.query(sql, (err,rows) => {
//         connection.release()
//         if (err) throw err;
//         console.log(rows)
//     })
// })


// con.connect((err) => {
//     if(err) throw err
// let sql = 'INSERT INTO REF (ID_FABRICANTE,ID_ARTICULO) VALUES '
//     con.query(sql, (err,res) => {
//         if (err) throw err
//         console.log(res)
//     })
// })



// ------- LOGICA ------- //

app.get('/articles',(req,res) => {
    pool.getConnection((err,connection) => {
        connection.query("SELECT * FROM articles", (err,rows) => {
            connection.release()
            if (err) throw err;
           res.send(JSON.stringify({articles: rows}))
        })
    })

})


app.get('/namesAs',(req,res) => {
    pool.getConnection((err,connection) => {
        connection.query("SELECT * FROM articles ORDER BY Name ASC", (err,rows) => {
            connection.release()
            if (err) throw err;
           res.send(JSON.stringify({articles: rows}))
        })
    })
})

app.get('/namesDes',(req,res) => {
    pool.getConnection((err,connection) => {
        connection.query("SELECT * FROM articles ORDER BY Name DESC", (err,rows) => {
            connection.release()
            if (err) throw err;
           res.send(JSON.stringify({articles: rows}))
        })
    })
})

app.get('/relAs',(req,res) => {
    pool.getConnection((err,connection) => {
        connection.query("SELECT * FROM articles ORDER BY Relevance ASC", (err,rows) => {
            connection.release()
            if (err) throw err;
           res.send(JSON.stringify({articles: rows}))
        })
    })
})

app.get('/relDes',(req,res) => {
    pool.getConnection((err,connection) => {
        connection.query("SELECT * FROM articles ORDER BY Relevance DESC", (err,rows) => {
            connection.release()
            if (err) throw err;
           res.send(JSON.stringify({articles: rows}))
        })
    })
})

app.get('/priceAs',(req,res) => {
    pool.getConnection((err,connection) => {
        connection.query("SELECT * FROM articles ORDER BY Price ASC", (err,rows) => {
            connection.release()
            if (err) throw err;
           res.send(JSON.stringify({articles: rows}))
        })
    })
})

app.get('/priceDes',(req,res) => {
    pool.getConnection((err,connection) => {
        connection.query("SELECT * FROM articles ORDER BY Price DESC", (err,rows) => {
            connection.release()
            if (err) throw err;
           res.send(JSON.stringify({articles: rows}))
        })
    })
})

app.post('/getModal',(req,res) => {
    let id = req.body.id_articulo

    pool.getConnection((err,connection) => {
        let sql1 = `SELECT ID_FABRICANTE FROM REF AS ref WHERE ID_ARTICULO = ${id}`
        connection.query(sql1, (err,rows) => {
            connection.release()
            if (err) throw err;
            connection.query(`SELECT * FROM fabricantes WHERE ID_FABRICANTE = ${rows[0].ID_FABRICANTE}`,(err,row) => {
                if(err) throw err;
                res.send({fab: row[0]})
             })
        })
    })
})

app.post('/getQuery',(req,res) => {
    let query = req.body.query

    pool.getConnection((err,connection) => {
        let q = `"%${query}%"`
        let sql1 = `SELECT * FROM fabricantes, articles WHERE fabricantes.Name LIKE ${q} OR articles.Name LIKE ${q}`
        connection.query(sql1, (err,rows) => {
            connection.release()
            if (err) throw err;
            res.send({search: rows})
        })
    })

})




app.listen(port,() => console.log(`estoy escuchando por ${port}`))