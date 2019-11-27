const ProcessLog = require('../models/processLog');
const Product = require('../models/product');

// Get every product
module.exports.getEveryProduct = (req, res, next) => {
    Product.findAll()
        .then(products => {
            const msg = 'Successfully loaded products data!'
            res.status(200).send(products);
            ProcessLog.create({ message: msg, statusCode: 200, body: '', error: false });
        }).catch(error => {
            const msg = 'Error while loading product list!';
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: '', error: true });
        });
}

// Get a single product
module.exports.getSingleProduct = (req, res, next) => {
    const productId = req.params.id;
    Product.findByPk(productId)
        .then(product => {
            const msg = 'Successfully loaded product data!'
            res.status(200).send(product);
            ProcessLog.create({ message: msg, statusCode: 200, body: '', error: false });
        }).catch(error => {
            const msg = 'Error while loading product data!';
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.params.id, error: true });
        });
}