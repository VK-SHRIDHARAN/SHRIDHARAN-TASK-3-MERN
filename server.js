const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const errorHandler = require('./middleware/errHandler');
const subDirRouter = require('./routes/subdir');
const port = process.env.PORT || 3000;
const {logger} = require('./middleware/logEvents');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');

//Router
const homeRouter = require('./routes/homeRouter');
const employeeRouter = require('./routes/api/employeeRouter');
const registerRouter = require('./routes/registerRouter');
const authRouter = require('./routes/authRouter');

//Built-in middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/subdir', express.static(path.join(__dirname, 'public')));

// 3rd party middleware
const cors = require('cors');
app.use(cors(corsOptions));


//Custom middleware
app.use(logger);
app.use(require('./middleware/credentials'));

//routes
app.use('/subdir', subDirRouter);
app.use('/', homeRouter);
app.use('/register', registerRouter);
app.use('/auth', authRouter);
app.use('/refresh', require('./routes/refreshRouter'));
app.use('/logout', require('./routes/logoutRouter'));

//api routes
app.use('/api/employee',verifyJWT, employeeRouter);

app.all(/^\/.*/, (req, res) => {
    res.status(404);
    if (req.accepts('html'))
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    else if (req.accepts('json'))
        res.send({ error: '404 Not Found' });
    else
        res.type('txt').send('404 Not Found');
});


app.use(errorHandler);

app.listen(port, () => {
    console.log('server running')
})