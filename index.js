const express = require("express")
const app = express()
const mysql = require('mysql2');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const db = mysql.createConnection({
  host: "localhost",
  user:"root",
  password:"nain@6013",
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
  let sql= `select * from books WHERE name = ${name} `
  db.execute(sql,function(err,result){
    if(err){
       console.log(err)
    }else{
      res.status(200).json(result)
 }
})
})
app.get("/sort",(req,res)=>{
   let sql= "select * from books ORDER BY name ASC"
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
  let sql= `DELETE from books WHERE name = ${name}`
  db.execute(sql,function(err,result){
    if(err){
       console.log(err)
    }else{
      res.status(200).json(result)
 }
})
})
app.post("/post", async(req,res)=>{
  let data=req.body;
//   let sql= `select * from books WHERE name = ${req.body.name} `
//   db.execute(sql,function(err,result){
//     if(err){
//        console.log(err)
//     }else{
//      return  res.send("user alredy exist")
//  }
// })
  db.query('insert into book SET ?',data,(err,result)=>{
           if(err){
             console.log(err)
           }else{
              res.status(201).json(result)
            }
  })
})

app.listen(3000,()=>{
  console.log("server is running")
})