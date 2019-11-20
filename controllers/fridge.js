const Fridge = require('../models/fridge');
const FridgeItem = require('../models/fridgeItem');
const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const ContentPreference = require('../models/contentPreference');
const Product = require('../models/product');
const User = require('../models/user');
const ProcessLog = require('../models/processLog');


// Get available fridges
module.exports.getFridges = (req, res, next) => {
    const userId = req.params.userId;
    Fridge.findAll({ where: { userId: userId } })
        .then(fridges => {
            const msg = "Successfully retrieved user fridges!";
            res.status(200).send(fridges);
            ProcessLog.create({ message: msg, statusCode: 200, body: req.params, error: false });
        })
        .catch(error => {
            const msg = "Error when retrieving fridges!";
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
        })
};
// Get single fridge
module.exports.getFridge = (req, res, next) => {
    const fridgeId = req.params.id;
    Fridge.findByPk(fridgeId)
        .then(fridge => {
            const msg = "Successfully received fridge!";
            res.status(200).send(fridge);
            ProcessLog.create({ message: msg, statusCode: 200, body: req.params, error: false });
        })
        .catch(error => {
            const msg = "Error when retrieving fridge!";
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
        })
};
// Add new fridge
module.exports.createFridge = (req, res, next) => {
    const newFridge = req.body.fridge;
    Fridge.create({ name: newFridge.name, location: newFridge.location, userId: newFridge.userId })
        .then(result => {
            const msg = "Successfully created fridge!";
            res.status(200).send(result);
            ProcessLog.create({ message: msg, statusCode: 200, body: req.body, error: false });
        })
        .catch(error => {
            const msg = "Error when creating fridge!";
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.body, error: true });
        });
};
// Edit fridge
module.exports.editFridge = (req, res, next) => {
    Fridge.findByPk(req.params.id)
        .then(fridge => {
            if (req.query.name) {
                fridge.name = req.query.name;
            }
            if (req.query.location) {
                fridge.location = req.query.location;
            }
            fridge.save()
                .then(result => {
                    const msg = "Successfully altered fridge!";
                    res.status(200).send(result);
                    ProcessLog.create({ message: msg, statusCode: 200, body: req.query, error: false });
                })
                .catch(error => {
                    const msg = "Error while editing fridge!";
                    console.log(error);
                    res.status(500).send(msg);
                    ProcessLog.create({ message: msg, statusCode: 500, body: req.query, error: true });
                });
        })
        .catch(error => {
            const msg = "Error while retrieving fridge!";
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
        })

};
// Remove fridge
module.exports.deleteFridge = (req, res, next) => {
    const fridgeId = req.params.id;
    Fridge.findByPk(fridgeId)
        .then(fridge => {
            fridge.destroy()
                .then(result => {
                    const msg = "Successfully deleted fridge!";
                    res.status(200).send(result);
                    ProcessLog.create({ message: msg, statusCode: 200, body: req.query, error: false });
                })
                .catch(error => {
                    const msg = "Error while deleting fridge!";
                    console.log(error);
                    res.status(500).send(msg);
                    ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
                })
        })
        .catch(error => {
            const msg = "Error while retrieving fridge!";
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
        })
};

// Get every item in the fridge
module.exports.getItemsInFridge = (req, res, next) => {
    Fridge.findByPk(req.params.fridgeId)
        .then(fridge => {
            const userId = fridge.userId;
            fridge.getProducts()
                .then(products => {
                    const msg = 'Accessed product list in fridge nr: ' + fridge.id;
                    res.status(200).send(products);
                    ProcessLog.create({ message: msg, statusCode: 200, body: req.params, error: false, userId: userId });
                })
                .catch(error => {
                    const msg = "Couldn't load fridge contents!";
                    console.log(error);
                    ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true, userId: userId });
                    res.status(500).send(msg);
                });
        })
        .catch(error => {
            const msg = "Error when retrieving fridge using the provided ID!";
            console.log(error);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
            res.status(500).send(msg);
        });
};
// Get item in fridge
module.exports.getItemInFridge = (req, res, next) => {
    Fridge.findByPk(req.params.fridgeId)
        .then(fridge => {
            fridge.getProducts({ where: { id: req.params.id } })
                .then(products => {
                    const product = products[0];
                    const msg = 'Retrieved product!';
                    res.status(200).send(product);
                    ProcessLog.create({ message: msg, statusCode: 200, body: req.params, error: false });
                })
                .catch(error => {
                    const msg = 'Error when retrieving product with id: ' + req.params.id;
                    console.log(error);
                    ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
                });
        })
        .catch(error => {
            const msg = "Error when retrieving fridge using the provided ID: " + req.params.fridgeId;
            console.log(error);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
            res.status(500).send(msg);
        })
};
// Add item to the fridge
module.exports.postAddItemToFridge = (req, res, next) => {
    const newItem = req.body.fridgeitem;

    Fridge.findByPk(newItem.fridgeId)
        .then(fridge => {
            Product.findByPk(newItem.productId)
                .then(product => {
                    fridge.addProduct(product, { through: { quantity: newItem.quantity } })
                        .then(result => {
                            const msg = 'Created new fridgeItem!';
                            ProcessLog.create({ message: msg, statusCode: 200, body: result, error: false });
                            res.status(200).send(result);
                        })
                        .catch(error => {
                            const msg = 'Error while creating new fridgeItem!';
                            console.log(error);
                            ProcessLog.create({ message: msg, statusCode: 500, body: req.body, error: true });
                            res.status(500).send(msg);
                        })
                })
                .catch(error => {
                    const msg = 'Error while retrieving product by ID!';
                    console.log(error);
                    ProcessLog.create({ message: msg, statusCode: 500, body: req.body, error: true });
                });
        })
        .catch(error => {
            const msg = 'Error while retrieving fridge by ID!';
            console.log(error);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.body, error: true });
        });
};
// Edit item in fridge
module.exports.editItemInFridge = (req, res, next) => {
    FridgeItem.findByPk(req.params.id)
        .then(fridgeItem => {
            fridgeItem.quantity = req.query.quantity;
            fridgeItem.save()
                .then(result => {
                    const msg = 'Successfully updated fridgeItem!';
                    res.status(200).send(result);
                    ProcessLog.create({ message: msg, statusCode: 200, body: req.params, error: false });
                })
                .catch(error => {
                    const msg = 'Error while updating fridgeItem!';
                    console.log(error);
                    res.status(500).send(msg);
                    ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
                });
        })
        .catch(error => {
            const msg = 'Error while retrieving fridgeItem!';
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
        })
};
// Remove item from fridge
module.exports.deleteItemFromFridge = (req, res, next) => {
    FridgeItem.findByPk(req.params.id)
        .then(fridgeItem => {
            fridgeItem.destroy()
                .then(result => {
                    const msg = 'Successfully deleted fridgeItem!';
                    res.status(200).send(msg);
                    ProcessLog.create({ message: msg, statusCode: 200, body: req.params, error: false });
                })
                .catch(error => {
                    const msg = 'Error while deleting fridgeItem!';
                    res.status(500).send(msg);
                    ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
                });
        })
        .catch(error => {
            const msg = "FridgeItem doesn't exist!";
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
        });
};

// Get every cart the user has
module.exports.getCarts = (req, res, next) => {
    const userId = req.params.userId;
    Fridge.findAll({ where: { userId: userId }, include: [{ model: Cart }] })
        .then(fridges => {
            const msg = 'Successfully retrieved fridges and carts';
            res.status(200).send(fridges);
            ProcessLog.create({ message: msg, statusCode: 200, body: req.params, error: false });
        })
        .catch(error => {
            const msg = 'Error while retrieving fridges!';
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
        });
};
// Get single cart associated with a fridge
module.exports.getCart = (req, res, next) => {
    const cartId = req.params.id;
    Cart.findByPk(cartId)
        .then(cart => {
            const msg = 'Successfully retrieved cart!';
            res.status(200).send(cart);
            ProcessLog.create({ message: msg, statusCode: 200, body: req.params, error: false });
        })
        .catch(error => {
            const msg = 'Error while retrieving cart!';
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
        });
};
// Get all cartItems in cart
module.exports.getCartItems = (req, res, next) => {
    const cartId = req.params.cartId;
    CartItem.findAll({ where: { cartId: cartId } })
        .then(cartItems => {
            const msg = 'Successfully retrieved cartitems!';
            res.status(200).send(cartItems);
            ProcessLog.create({ message: msg, statusCode: 200, body: req.params, error: false });
        })
        .catch(error => {
            const msg = 'Error while retrieving cartItems!';
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
        });
};
// Get cartItem
module.exports.getCartItem = (req, res, next) => {
    const cartItemId = req.params.id;
    CartItem.findByPk(cartItemId)
        .then(cartItem => {
            const msg = 'Successfully retrieved cartItems!';
            res.status(200).send(cartItem);
            ProcessLog.create({ message: msg, statusCode: 200, body: req.params, error: false });
        })
        .catch(error => {
            const msg = 'Error while retrieving cartItem!';
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
        });
};
// Add item to cart
module.exports.createCartItem = (req, res, next) => {
    Cart.findByPk(req.body.cartItem.cartId)
        .then(cart => {
            Product.findByPk(req.body.cartItem.productId)
                .then(product => {
                    cart.addProduct(product, { through: { quantity: req.body.cartItem.quantity } })
                        .then(result => {
                            const msg = 'Successfully added product to cart!';
                            res.status(200).send(result);
                            ProcessLog.create({ message: msg, statusCode: 200, body: req.body, error: false });
                        })
                        .catch(error => {
                            const msg = 'Error while creating cartitem!';
                            console.log(error);
                            res.status(500).send(msg);
                            ProcessLog.create({ message: msg, statusCode: 500, body: req.body, error: true });
                        })
                })
                .catch(error => {
                    const msg = 'Error while retrieving product!';
                    console.log(error);
                    res.status(500).send(msg);
                    ProcessLog.create({ message: msg, statusCode: 500, body: req.body, error: true });
                });
        })
        .catch(error => {
            const msg = 'Error while retrieving cart!';
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.body, error: true });
        });
};
// Edit item in cart
module.exports.editCartItem = (req, res, next) => {
    const itemId = req.params.id;
    CartItem.findByPk(itemId)
        .then(cartItem => {
            cartItem.quantity = req.query.quantity;
            cartItem.save()
                .then(result => {
                    const msg = 'Successfully edited cartitem!';
                    res.status(500).send(result);
                    ProcessLog.create({ message: msg, statusCode: 200, body: req.params, error: false });
                })
                .catch(error => {
                    const msg = 'Error while editing cartitem!';
                    console.log(error);
                    res.status(500).send(msg);
                    ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
                });
        })
        .catch(error => {
            const msg = 'Error while retrieving cartitem!';
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
        });
};
// Remove item from cart
module.exports.deleteCartItem = (req, res, next) => {
    const itemId = req.params.id;
    CartItem.findByPk(itemId)
        .then(cartItem => {
            cartItem.destroy()
                .then(result => {
                    const msg = 'Successfully deleted cartitem!';
                    res.status(200).send(result);
                    ProcessLog.create({ message: msg, statusCode: 200, body: req.params, error: false });
                })
                .catch(error => {
                    const msg = 'Error while deleting cartitem!';
                    console.log(error);
                    res.status(500).send(msg);
                    ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
                })
        })
        .catch(error => {
            const msg = 'Error while retrieving cartitem!';
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
        });
};

// List content preference for a single fridge
module.exports.getFridgeContentPreferences = (req, res, next) => {
    const fridgeId = req.params.id;
    Fridge.findByPk(fridgeId)
        .then(fridge => {
            fridge.getContentpreferences()
                .then(contentPreferences => {
                    const msg = 'Successfully retrieved content preferences!';
                    res.status(200).send(contentPreferences);
                    ProcessLog.create({ message: msg, statusCode: 200, body: req.params, error: false });
                })
                .catch(error => {
                    const msg = 'Error while retrieving content preferences!';
                    console.log(error);
                    res.status(500).send(msg);
                    ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
                });
        })
        .catch(error => {
            const msg = 'Error while retrieving fridge!';
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
        });
};
// Get single content preference
module.exports.getContentPreference = (req, res, next) => {
    const preferenceId = req.params.id;
    ContentPreference.findByPk(preferenceId)
        .then(contentPreference => {
            const msg = 'Successfully retrieved content preference!';
            res.status(200).send(contentPreference);
            ProcessLog.create({ message: msg, statusCode: 200, body: req.params, error: false });
        })
        .catch(error => {
            const msg = 'Error while retrieving content preference!';
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
        })
};
// Create content preference for fridge
module.exports.createContentPreference = (req, res, next) => {
    const contentPreference = req.body;
    ContentPreference.create({ operator: contentPreference.operator, quantity: contentPreference.quantity,
    fridgeId: contentPreference.fridgeId, productId: contentPreference.productId })
        .then(result =>{
            const msg = 'Successfully created content preference!';
            res.status(200).send(result);
            ProcessLog.create({ message: msg, statusCode: 200, body: req.body, error: false });
        })
        .catch(error => {
            const msg = 'Error when creating content preference!';
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.body, error: true });
        })
};
// Edit content preference for fridge
module.exports.editContentPreference = (req, res, next) => {
    const contentPrefererenceId = req.params.id;
    const preference = req.query;
    ContentPreference.findByPk(contentPrefererenceId)
        .then(contentPreference => {
            if (preference.operator) {
                contentPreference.operator = preference.operator;
            }
            if (preference.quantity) {
                contentPreference.quantity = preference.quantity;
            }
            if (preference.fridgeId) {
                contentPreference.fridgeId = preference.fridgeId;
            }
            if (preference.productId) {
                contentPreference.productId = preference.productId;
            }
            contentPreference.save()
                .then(result =>{
                    const msg = 'Successfully edited content preference!';
                    res.status(200).send(result);
                    ProcessLog.create({ message: msg, statusCode: 200, body: req.query, error: false });
                })
                .catch(error =>{
                    const msg = 'Error while editing content preference!';
                    console.log(error);
                    res.status(500).send(msg);
                    ProcessLog.create({ message: msg, statusCode: 500, body: req.query, error: true });
                })
            
        })
        .catch(error => {
            const msg = 'Error when retrieving content preference!';
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
        });
};
// Remove content preference for fridge
module.exports.deleteContentPreference = (req, res, next) => {
    const contentPreferenceId = req.params.id;
    ContentPreference.findByPk(contentPreferenceId)
        .then(contentPreference => {
            contentPreference.destroy()
                .then(result => {
                    const msg = 'Successfully deleted content preference!';
                    res.status(200).send(result);
                    ProcessLog.create({ message: msg, statusCode: 200, body: req.params, error: false });
                })
                .catch(error => {
                    const msg = 'Error when creating content preference!';
                    console.log(error);
                    res.status(500).send(msg);
                    ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
                })
        })
        .catch(error => {
            const msg = 'Error when retrieving content preference!';
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
        });
};