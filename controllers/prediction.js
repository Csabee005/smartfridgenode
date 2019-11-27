const Prediction = require('../models/prediction');
const User = require('../models/user');
const Fridge = require('../models/fridge');
const ProcessLog = require('../models/ProcessLog');
const Classificator = require('../models/classificator');
const fs = require('fs');
const defaultImageName = 'productImage.jpeg';
const convertedImageName = 'productImageConverted.jpeg'
const sharp = require('sharp');
const currentFridge = 1;

async function someMagicToGetFileFromUploads() {
    return new Promise(fileRetrieve => {
        fs.readFile('./uploads/convertedImage1.jpeg', function read(err, data) {
            if (err) {
                console.log(err);
            } else {
                fileRetrieve(data);
            }
        });
    });
};

// Create a new prediction
module.exports.createPrediction = async(req, res, next) => {
    sharp.cache(false);
    await sharp(req.files[0].path)
        .resize(224, 224)
        .toFile('./uploads/convertedImage1.jpeg')
        .then(async function() {
            console.log(req.files[0]);
            if (req.files[0]) {
                let image = await someMagicToGetFileFromUploads()
                let resultArray = await Classificator.makePrediction(image);
                console.log(resultArray[0]);
                Prediction.create({
                        name: resultArray[0],
                        confidence: resultArray[1],
                        fridgeId: 1
                    })
                    .then(result => {
                        const msg = 'Successfully created prediction data!'
                        res.status(200).send(result);
                        ProcessLog.create({ message: msg, statusCode: 200, body: resultArray, error: false });
                    })
                    .catch(error => {
                        const msg = 'Error while creating prediction data!';
                        console.log(error);
                        res.status(500).send(msg);
                        ProcessLog.create({ message: msg, statusCode: 500, body: resultArray, error: true });
                    })
            } else {
                res.status(500).send("Problem while loading image!");
            }
        }).catch(error => {
            const msg = 'Error while creating prediction data!';
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: resultArray, error: true });
        });
};