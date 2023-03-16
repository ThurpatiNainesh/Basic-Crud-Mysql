const express = require("express")
const app = express()
const mysql = require('mysql2');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const db = mysql.createConnection({
  host: "localhost",
  user:"root",
  password:"nain@70113",
  database:"test",
  insecureAuth : true
})
db.connect((err)=>{
  if(err){
    console.log(err)
  }else{
    console.log("connected!!")
  }
})

app.get("/name",(req,res)=>{
  let {name}=req.query
  let sql= `SELECT * FROM books WHERE name = ${name} `
  db.execute(sql,function(err,result){
    if(err){
       return res.send("duplicate entry of name or id not allowed")
    }else{
      return res.send("user exist")
 }
})
})
app.get("/sort",(req,res)=>{
   let sql= "SELECT * FROM books ORDER BY name ASC"
   db.execute(sql,function(err,result){
     if(err){
        console.log(err)
     }else{
       res.status(200).json(result)
  }
})
})

app.delete("/delete",(req,res)=>{
  let {name}=req.query
  let sql= `DELETE FROM books WHERE name = ${name}`
  db.execute(sql,function(err,result){
    if(err){
      return res.status(400).send("BOOK name does not exist in mysqlDB")
    }else{
      res.status(200).json(result)
 }
})
})
app.post("/post",(req,res)=>{
  let data=req.body;

if(Object.keys(data) == 0) return res.status(400).send({ status: false, message: "please enter details" })
 
     db.query('INSERT INTO book SET ?',data,(err,result)=>{
           if(err){
             return res.status(400).send("ID and name must be unique")
           }else{
              return res.status(201).json(result)
            }
  })
})

app.listen(3000,()=>{
  console.log("server is running")
})

