const express=require('express');
const mongoose=require('mongoose');
const app=express();
const cors=require('cors');
const passport=require('passport');
const localStrat=require('passport-local');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const User=require('./models/schemauser');
const Post=require('./models/schemapost');
const bodyParser=require('body-parser');
const path=require('path');
const flash=require('connect-flash');
const methodOverride=require('method-override');
const axios=require('axios');
require('dotenv').config();
const multer=require('multer');
require('dotenv').config();

//React-Node middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000", // <-- location of the react app were connecting to
        credentials: true,
    })
);

//Setting Up mongoose
async function main() {
    await mongoose.connect('mongodb://localhost:27017/BitDev');
}

main()
    .then(() => {
        console.log('Connected!');
    })
    .catch((err) => {
        console.log('Error in Connection!');
        console.log(err);
    });


// //setting up ejs for use and path for files
// app.engine('ejs', ejsmate);
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// //For adding static file's like css and images etc
// app.use(express.static(path.join(__dirname, '/public')));

const port=4000;
app.listen(port, () => {
    console.log(`Listning on ${port}!`);
});

//setting up sessions
const sessionConfig=
{
    name: 'shhh',
    secret: 'BitDev',
    resave: false,
    saveUninitialized: true,
    cookie:
    {
        expires: Date.now()+1000*60*60*24*7,
        maxAge: 1000*60*60*24*7,
        httpOnly: true,
        // secure: true,
    }
}
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrat(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Setting up Flash messages
app.use(flash());

// //Setting Up Method Override for Other Requests

// app.use(methodOverride('_method'));


// //For accessing flashes
// app.use((req, res, next) => {
//     res.locals.success=req.flash('success');
//     res.locals.error=req.flash('error');
//     res.locals.user=req.user;
//     next();
// });

// For checking Login

const checkLogin=require('./middleware/checkLogin');

const partialSearch=require('./utils/partialSearch');
const loginRoutes=require('./routes/loginRoutes');
const userRoutes=require('./routes/userRoutes');
const postRoutes=require('./routes/postRoutes');
const commentRoutes=require('./routes/commentRoutes');

app.get('/', (req, res) => {
    res.send('<h1>APi Running!</h1>');
})

//login Routes
app.use('/', loginRoutes);

//User Routes
app.use('/users', userRoutes);

//Posts Routes
app.use('/posts', postRoutes);

// Comments Routes
app.use('/posts/:pid/comments', commentRoutes);

app.get('/cp', checkLogin, async (req, res, next) => {
    const curuser=await User.findById(req.user.id);
    res.render('CP', { curuser });
});

app.get('/project', checkLogin, async (req, res, next) => {

    let posts=[];
    let user=await User.findById(req.user.id)
        .populate({
            path: 'friends',
            populate: {
                path: 'posts'
            }
        });
    for (let frnd of user.friends) {
        posts=posts.concat(frnd.posts);
    }
    const compare=(a, b) => {
        return new Date(b.date)-new Date(a.date);
    }
    posts.sort(compare);
    console.log(posts);
    res.send('Ok!');
})

app.get('/search', async (req, res, next) => {
    const search=req.query.search;
    const findResult=partialSearch(search);
    res.send(findResult);
});

app.use((err, req, res, next) => {
    let { status=500, message="Error Occurred!" }=err;
    console.log(err);
    res.send({ error: message });
});

app.get('*', (req, res) => {
    res.status(404).send('404 Not Found!');
})