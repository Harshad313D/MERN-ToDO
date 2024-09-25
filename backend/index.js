require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel1 = require('./Models/todo')





const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI)



app.get('/get',(req,res)=>{
    TodoModel1.find()
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.put('/update/:id',(req,res)=>{
    const { id } = req.params;
    console.log(id)
    TodoModel1.findByIdAndUpdate({_id: id}, {completed: true})
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.put('/delete/:id',(req,res)=>{
    const { id } = req.params;
    console.log(id)
    TodoModel1.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.post('/add',(req, res) => {
    const task = req.body.task
    TodoModel1.create({
        task : task
    }).then(result => res.json(result))
    .catch(err => console.log(err))
})







app.listen(PORT,(req,res)=>{
    console.log('Server is running on port 3001')

})