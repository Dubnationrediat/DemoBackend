import express from 'express'
import mysql from 'mysql2'
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
    user:"-uroot ",
    password:"-p3dmUsmqpgwjeIzav6LxL",
    host :"containers-us-west-194.railway.app",
    port :7987
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

const PORT = process.env.PORT || 3456

let server = ()=>{
    app.listen(PORT,(req,res)=>{
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