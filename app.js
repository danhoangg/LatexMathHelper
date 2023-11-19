const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const path = require('path');

app.use(bodyParser.json());

app.set('views', './views');
app.use('/static', express.static(path.resolve('static')));

app.use(routes);

app.all('*', (req, res) => {
    res.status(404).send('Page Not Found');
});

app.listen(1337, () => console.log('d1s Latex Helper is running on port 1337'));
