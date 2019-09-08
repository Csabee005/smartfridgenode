const path = require('path');
const sequelize = require('./util/database');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Importing sequelize classes
const AppPreference = require('./models/AppPreference');
const Cart = require('./models/Cart');
const CartItem = require('./models/CartItem');
const Fridge = require('./models/Fridge');
const FridgeItem = require('./models/FridgeItem');
const ContentPereference = require('./models/ContentPreference');
const Prediction = require('./models/Prediction');
const ProcessLog = require('./models/ProcessLog');
const Product = require('./models/Product');
const User = require('./models/User');

// Misc init
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Route initialization
//app.use(authRoutes);
//app.use(errorController.get404);

User.hasOne(AppPreference);
AppPreference.belongsTo(User);
User.hasMany(Fridge);
Fridge.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
Fridge.hasOne(Cart);
Cart.belongsTo(Fridge);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Fridge.belongsToMany(Product, { through: FridgeItem });
Product.belongsToMany(Fridge, { through: FridgeItem });
Fridge.hasMany(Prediction);
Prediction.belongsTo(Fridge);
Fridge.hasMany(ContentPereference);
ContentPereference.belongsTo(Product);
ContentPereference.belongsTo(Fridge);
ProcessLog.belongsTo(User);

sequelize
    .sync({ force: true })
    .then(result => {
        app.listen(3000)
    })
    .catch(error => {
        console.log(error);
    });