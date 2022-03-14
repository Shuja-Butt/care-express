const express = require('express')
const { pool} = require('./config.js')
const cors = require('cors')

const app =   express()

const port = 3001

// parses incoming requests and exposes  pared data  to req.body
app.use(cors())
app.use(express.json())



app.get('/',function(req,res){
    res.json({
        "message":"Server is running"
    })
})


// getting all  users

app.get('/users',(req,res)=>{

  pool.query('SELECT * FROM USERS', (error, results) => {
    if (error) {
      throw error
    }
    console.log(results)
    res.status(200).json(results.rows)
  })



})


// getting  a   user with id 

app.get('/user/:id',function(req,res){

    let  {id} = req.params

    pool.query('SELECT * FROM USERS WHERE id =$1',[id], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      })
    
})



// adding a new user

app.post('/users/adduser',function (req,res){


    const {name} = req.body
    console.log(req.body,"req body issssssss")

    console.log(name)

    

    pool.query('INSERT INTO USERS(name)  VALUES ($1)',[name], (error) => {
        if (error) {
          throw error
        }
        res.status(200).json({"message":`user ${name}  was added successfully`})
      })

})



// updating a user

app.put('/user/:id',function(req,res){

    const {name} = req.body
    const {id} = req.params

    pool.query('UPDATE USERS SET name = $1 WHERE id = $2',[name,id], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json({"message":`user with ${id}  was updated successfully`})
      })    
})


// delete a user


app.delete('/user/:id',function(req,res){

    const {id} = req.params

    pool.query('DELETE FROM USERS WHERE id = $1',[id], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json({"message":`user with ${id}  was deleted successfully`})
      })
})



app.listen(port,function(){
    console.log(`Server is running on port ${3001}`)
})


