const User = require('../models/user');
const ProcessLog = require('../models/processLog');

const mailMasker = require('../util/processlogutil').mailMasker;

exports.postCheckLoginCredentials = (req, res, next) => {
    console.log(req.body);
    User.findAll({ where: { email: req.body.email } })
        .then(users => {
            const user = users[0];
            if (user.password === req.body.password) {
                const msg = 'Authorized to enter!';
                ProcessLog.create({ message: msg, error: false, responseCode: 200, userId: user.id, body: mailMasker(req.body) });
                res.status(200).send(msg);
                console.log('User', user.name, 'has gained entry!');
            } else {
                const msg = 'Unauthorized to enter!';
                res.status(401).send(msg);
                ProcessLog.create({ message: msg, error: true, responseCode: 401, userId: user.id, body: mailMasker(req.body) });
            }
        })
        .catch(error => {
            console.log(error);
            const msg = 'Error when retrieving user data!';
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, error: true, responseCode: 401, userId: user.id, body: mailMasker(req.body) });
        });
}