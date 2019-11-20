const express = require('express');

const fridgeController = require('../controllers/fridge');

const router = express.Router();

// Fridges
// Userids are temporary while authorization is not completed
router.get('/fridges/:userId', fridgeController.getFridges);

router.get('/fridge/:id', fridgeController.getFridge);

router.post('/fridge', fridgeController.createFridge);

router.put('/fridge/:id', fridgeController.editFridge);

router.delete('/fridge/:id', fridgeController.deleteFridge);

// Fridge items
router.get('/fridge/:fridgeId/item', fridgeController.getItemsInFridge);

router.get('/fridge/:fridgeId/item/:id', fridgeController.getItemInFridge);

router.post('/fridge/item', fridgeController.postAddItemToFridge);

router.put('/fridge/item/:id', fridgeController.editItemInFridge);

router.delete('/fridge/item/:id', fridgeController.deleteItemFromFridge);

// Carts and cart items
router.get('/cart/:userId', fridgeController.getCarts);

router.get('/fridge/cart/:id', fridgeController.getCart);

router.get('/fridge/:cartId/cartItem', fridgeController.getCartItems);

router.get('/fridge/cartItem/:id', fridgeController.getCartItem);

router.post('/fridge/cartItem', fridgeController.createCartItem);

router.put('/fridge/cartItem/:id', fridgeController.editCartItem);

router.delete('/fridge/cartItem/:id', fridgeController.deleteCartItem);

// Fridge preferences

router.get('/fridge/preferences/:id', fridgeController.getFridgeContentPreferences);

router.get('/fridge/preference/:id', fridgeController.getContentPreference);

router.post('/fridge/preference', fridgeController.createContentPreference);

router.put('/fridge/preference/:id', fridgeController.editContentPreference);

router.delete('/fridge/preference/:id', fridgeController.deleteContentPreference);

module.exports = router;