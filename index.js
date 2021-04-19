
const movies = require('./routes/Movies');

const express = require('express');
const app = express();

app.set('view engine','pug');
app.set('views','./views');

app.use(express.json());
app.use('/api/movies', movies);

app.get('/',(req,res)=>{
res.render('homepage',{title:'Movies...',target:'http://localhost:3000/api/movies'})
});

app.listen(3000, () => {
    console.log('listening to port 3000....');
});

app.get('/',(req,res)=>{
    res.render('homepage');
})