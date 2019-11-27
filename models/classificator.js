const tf = require('@tensorflow/tfjs');
const tfConverter = require('@tensorflow/tfjs-node');

const NUMBER_OF_CHANNELS = 3;
CATEGORIES = ["Apple", "Banana", "Guava", "Kiwi", "Orange", "Peach", "Pear", "Plum", "Tomato"]
const offset = tf.scalar(255.0);

async function makePrediction(image) {
    const model = await tf.loadLayersModel('http://192.168.0.60:3000/mobileNet/model.json');
    let imageTensor = tfConverter.node.decodeJpeg(image, 3);
    imageTensor = imageTensor.resizeNearestNeighbor([224, 224])
        .toFloat()
        .div(offset)
        .expandDims();
    const predictions = model.predict(imageTensor);
    const readable_output = predictions.dataSync();
    const maxNum = Math.max.apply(null, readable_output);
    const index = readable_output.indexOf(maxNum);
    let resultArray = [];
    resultArray.push(CATEGORIES[index]);
    resultArray.push(maxNum * 100);
    return resultArray;
}

module.exports.makePrediction = makePrediction;