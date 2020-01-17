const express = require('express');
const fs = require('fs');
const contentModel = require('./model');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/quyetde',(err)=>{
    if(err) throw err;
    console.log('connect success');
    app.get('/',(req,res)=>{
        console.log('Nhat do');
        res.status(200).send('hello');
    })
    
    app.get('/create-content',(req,res)=>{
        res.status(200).sendFile(path.resolve(__dirname,'./public/create-content.html'));
    })
    
    app.post('/create-content',async(req,res)=>{
        const newContent = {
            content: req.body.content,
        }
        const result = await contentModel.create(newContent);
        console.log(result);
        res.status(200).end('Success');

        fs.readFile('./data.json',(error,data)=>{
            if(error) res.status(500).end('Internal server error');
            const questions = JSON.parse(data);
            console.log(questions);
    
            questions.push({
                content: req.body.content,
                createAt: new Date().toLocaleString(),
            });
    
            fs.writeFile('./data.json', JSON.stringify(questions),(error)=>{
                if(error) {res.status(500).end('Internal server error');}
                res.status(201).end('Success');
            });
        });
    })
    app.listen(3000,(error)=>{
        if(error){
            throw error;
        }
        console.log('Server listen on port 3000');
    })
    
})
