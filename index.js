const express = require("express")
const app = express()
const mysql = require('mysql2');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const db = mysql.createConnection({
  host: "localhost",
  user:"root",
  password:"nain@7013446013",
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

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
}

app.get("/name",(req,res)=>{
  let {name}=req.query

  if (!isValid(name)) {
    return res.status(400).send({ status: false, message: "name is required" })
    } 
  let sql= `SELECT * FROM books WHERE name = ${name} `
  db.execute(sql,function(err,result){
    if(err){
       return res.send("BOOK name does not exist in mysqlDB")
    }else{
      return res.status(200).json(result)
 }
})
})
app.get("/sort",(req,res)=>{
   let sql= "SELECT * FROM books ORDER BY name ASC"
   db.execute(sql,function(err,result){
     if(err){
      return res.send("Something went wrong!!")
     }else{
       return res.status(200).json(result)
  }
})
})

app.delete("/delete",(req,res)=>{
  let {name}=req.query

  if (!isValid(name)) {
    return res.status(400).send({ status: false, message: "name is required" })
    } 

  let sql= `DELETE FROM books WHERE name = ${name}`

  db.execute(sql,function(err,result){
    if(err){
      return res.status(400).send("BOOK name does not exist in mysqlDB")
    }else{
      return res.status(200).json(result)
 }
})
})
app.post("/post",(req,res)=>{
  let data=req.body;

if(Object.keys(data) == 0) return res.status(400).send({ status: false, message: "please enter details" })
 
     db.query('INSERT INTO books SET ?',data,(err,result)=>{
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

