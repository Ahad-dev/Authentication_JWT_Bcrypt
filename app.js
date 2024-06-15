const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const userModel = require('./models/user');
const { resolveSoa } = require('dns');
// const user = require('./models/user');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    console.log(req.cookies)
    res.render('index')
})

app.post('/create',(req,res)=>{
    const {username,name,email,password} = req.body;
    bcrypt.genSalt(10,(err,Salt)=>{
        bcrypt.hash(password,Salt,async(err,Hash)=>{
            const user = await userModel.create({
                username,
                name,
                email,
                password:Hash
            }) 
            // console.log(user);
        })
    })
    const token = jwt.sign({email},'shhh');
    res.cookie('token',token);
    res.redirect('/')
    
})

app.get('/login',(req,res)=>{
    res.render('login');
})
app.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email:email});
    if(!user) return res.send("something wrong");

    bcrypt.compare(password,user.password,(err,result)=>{
        if(!result) return res.send('something wrong')
        const token = jwt.sign({email},'shhh');
        res.cookie('token',token);
        res.redirect('/profile');
    })
})
app.get('/logout',(req,res)=>{
    res.clearCookie('token');
    res.redirect('/');
})
app.get('/profile',isLoggedIn,(req,res)=>{
    console.log(req.user);
    res.send('Profile');
})

function isLoggedIn(req,res,next){
    if(!req.cookies.token) res.redirect('/');
    else{
        const data =jwt.verify(req.cookies.token,'shhh')
        req.user = data;
    }
    next();
}

app.listen(3000);