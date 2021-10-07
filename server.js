require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
process.env.PWD = process.cwd()


mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error',(error)=> console.error(error));
db.once('open', ()=> console.log('connected to database'));


const app = express();

app.use('/images', express.static('pictures'));

app.use(expressLayouts);
app.set('view engine', 'ejs');


app.use(session({
 secret: process.env.SESSION_SECRET,
 resave: false,
 saveUninitialized: false
}));


const facebook_auth = require('./routes/facebook_auth');
app.use('/auth', facebook_auth);


const users_list = require('./routes/users');
app.use('/users', users_list);


const picture_list = require('./routes/pictures');
app.use('/users', picture_list);


const users_page = require('./routes-pages/users-page');
app.use('/users-page', users_page); 

const users_photos = require('./routes-pages/users-photos');
app.use('/users-photos', users_photos); 

const loginCheck = require('./middleware/logincheck');
app.use(loginCheck);


app.use(express.json());



const login_page = require('./routes-pages/login');
app.use('/login', login_page);

const privacy_page = require('./routes-pages/privacy');
app.use('/privacy', privacy_page);


const upload_page = require('./routes-pages/upload');
app.use('/upload', upload_page);

const home_page = require('./routes-pages/home');
app.use('/home', home_page);

const upload_api = require('./routes/upload_picture');
app.use('/upload-picture', upload_api);

const logout = require('./routes/logout');
app.use('/logout', logout);


app.use(function(req,res,next){

    res.status(404);
    res.redirect("/home");
});






app.listen(3000, () => console.log('Server running on port 3000!'))

