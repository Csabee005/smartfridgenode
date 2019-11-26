const Prediction = require('../models/prediction');
const User = require('../models/user');
const Fridge = require('../models/fridge');
const ProcessLog = require('../models/ProcessLog');

// Create a new prediction
module.exports.createPrediction = (req, res, next) => {
    console.log(req.file);
    res.status(200).send("asd");
    /*console.log(req.body);
    const prediction = req.body;
    Prediction.create({
            name: prediction.name,
            confidence: prediction.confidence,
            fridgeId: prediction.fridgeId
        })
        .then(result => {
            const msg = 'Successfully created prediction data!'
            res.status(200).send(result);
            ProcessLog.create({ message: msg, statusCode: 200, body: prediction, error: false });
        })
        .catch(error => {
            const msg = 'Error while creating prediction data!';
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.body, error: true });
        })*/
};