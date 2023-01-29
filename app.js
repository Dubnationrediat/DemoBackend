import express from 'express'
import mysql from 'mysql'
import database from './schema/db.js'
import cors from 'cors'
let app = express();
app.use(express.urlencoded({
    extended:true
}));

app.use(cors());
app.use(express.json());

let connectionInfo = mysql.createConnection({
    database:"demoDB",
    user:"demoDB_user",
    password:"demo_password",
    host :"localhost"
})

// * create table
app.get('/create',(req,res)=>{
    connectionInfo.query(database,(err,row,field)=>{
   if(err){
    console.log(err)
   }else{
        res.send('table created')
   }
})
});
//  * insert data
app.post('/insert',(req,res)=>{
   const  {user_email,first_name} = req.body
   let value = [first_name,user_email]
 
//    let insertRoute =`INSERT INTO regdata (first_name,user_email) VALUES ('${first_name}','${user_email}')`


   let insertRoute =`INSERT INTO regdata (first_name,user_email) VALUES (?)`;
   
   connectionInfo.query(insertRoute,[value],(err)=>{
       if(err){
        console.log(err)
       }else{
            res.send('data inserted')
       }
   })
});


app.put('/update',(req,res)=>{
    res.send('this is update page')
});

app.delete('/delete',(req,res)=>{
    res.send('this is delete page')
});


let server = ()=>{
    app.listen(3456,(req,res)=>{
        console.log(`server is listening to 3456`);
    });
}

// * first connect db then server listener
let connector = ()=>{
    connectionInfo.connect((err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("db connected successfully")
        }
    })
    setTimeout(()=>{
        server()
    },100) 
}

connector()