const path = require('path');
const sequelize = require('./util/database');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Initializing route controllers
const authRoutes = require('./routes/authroutes');
const fridgeRoutes = require('./routes/fridgeroutes');
const appRoutes = require('./routes/approutes');
const arduinoRoutes = require('./routes/arduinoroutes');

// Importing Sequelize classes
const AppPreference = require('./models/appPreference'); 
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');
const Fridge = require('./models/fridge');
const FridgeItem = require('./models/fridgeItem');
const ContentPereference = require('./models/contentPreference');
const Prediction = require('./models/prediction');
const ProcessLog = require('./models/processLog');
const Product = require('./models/product');
const User = require('./models/user');

// Misc init
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route initialization
app.use(authRoutes);
app.use(fridgeRoutes);
app.use(appRoutes);
app.use(arduinoRoutes);
//app.use(errorController.get404);

User.hasOne(AppPreference);
AppPreference.belongsTo(User);
User.hasMany(Fridge);
Fridge.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
Fridge.hasOne(Cart, { constraints: true, onDelete: 'CASCADE' });
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
    .sync()
    .then(result => {
        app.listen(3000)
    })
    .catch(error => {
        console.log(error);
    });