const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Misc init
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Route initialization
app.use(authRoutes);
app.use(errorController.get404);

