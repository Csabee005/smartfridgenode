const AppPreference = require('../models/appPreference');
const User = require('../models/user');
const ProcessLog = require('../models/processLog');

// Get every preference
module.exports.getEveryPreference = (req, res, next) => {
    AppPreference.findAll({ where: { userId: req.query.userId } })
        .then(preferences => {
            const msg = 'Successfully retrieved preferences!';
            res.status(200).send(preferences);
            ProcessLog.create({ message: msg, statusCode: 200, body: req.params, error: false });
        }).catch(error => {
            const msg = 'Error while retrieving app preferences!';
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
        });
};

// Get single preference
module.exports.getPreference = (req, res, next) => {
    const userId = req.params.userId;
    const name = req.query.name;
    AppPreference.findOne({ where: { userId: req.params.userId, name: req.query.name } })
        .then(preference => {
            const msg = 'Successfully retrieved preference!';
            res.status(200).send(preference);
            ProcessLog.create({ message: msg, statusCode: 200, body: req.params, error: false });
        }).catch(error => {
            const msg = 'Error while retrieving app preference!';
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.params, error: true });
        });
};
// Create new preference
module.exports.createPreference = (req, res, next) => {
    const preference = req.body;
    AppPreference.create({ userId: preference.userId, name: preference.name, value: preference.value })
        .then(success => {
            const msg = 'Successfully created preference!';
            res.status(200).send(msg);
            ProcessLog.create({ message: msg, statusCode: 200, body: req.body, error: false });
        })
        .catch(error => {
            const msg = 'Error while creating app preference!';
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.body, error: true });
        });
};
// Edit existing preference
module.exports.editPreference = (req, res, next) => {
    const preferenceName = req.query.name;
    const preferenceUserId = req.params.userId;
    AppPreference.findOne({ where: { userId: preferenceUserId, name: preferenceName } })
        .then(preference => {
            if (preference.value != req.query.value) {
                preference.value = req.query.value;
            }
            if (preference.name != req.query.name) {
                preference.name = req.query.name;
            }
            preference.save()
                .then(success => {
                    const msg = 'Successfully modified preference!';
                    res.status(200).send(msg);
                    ProcessLog.create({ message: msg, statusCode: 200, body: req.query, error: false });
                }).catch(error => {
                    const msg = 'Error while editing app preference!';
                    console.log(error);
                    res.status(500).send(msg);
                    ProcessLog.create({ message: msg, statusCode: 500, body: req.query, error: true });
                });
        }).catch(error => {
            const msg = 'Error while editing app preference!';
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.query, error: true });
        });
};
// Remove preference
module.exports.deletePreference = (req, res, next) => {
    const preferenceName = req.query.name;
    const preferenceUserId = req.params.userId;
    AppPreference.findOne({ where: { userId: preferenceUserId, name: preferenceName } })
        .then(preference => {
            if (preference) {
                preference.destroy()
                    .then(success => {
                        const msg = 'Successfully deleted preference!';
                        res.status(200).send(msg);
                        ProcessLog.create({ message: msg, statusCode: 200, body: req.query, error: false });
                    }).catch(error => {
                        const msg = "Couldn't remove app preference!";
                        console.log(error);
                        res.status(500).send(msg);
                        ProcessLog.create({ message: msg, statusCode: 500, body: req.query, error: true });
                    });
            } else {
                const msg = 'No preferences to delete!';
                res.status(400).send(msg);
                ProcessLog.create({ message: msg, statusCode: 200, body: req.query, error: false });
            }
        }).catch(error => {
            const msg = "Couldn't retrieve app preference!";
            console.log(error);
            res.status(500).send(msg);
            ProcessLog.create({ message: msg, statusCode: 500, body: req.query, error: true });
        })

};