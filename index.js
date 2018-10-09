var express = require('express'),
    app = express(),
    port = 3000,
    bodyParser = require('body-parser'),
    todoRoutes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res) => { res.send('i am root') })
app.use('/api/todos', todoRoutes);

//server
app.listen(port, () => {
    console.log('App is running on port ' + port);
})