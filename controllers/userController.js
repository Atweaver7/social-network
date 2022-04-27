const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .populate({ 
        path: __dirname + '/users',
        select: '-__V'
    })
    .select('-__V')
    .sort({_id: -1})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);res.sendStatus(400);
    });
    },
    getUserById ({ params }, res) {
        User.findOne({_id: params.id})
        .populate({
            path: 'users',
            select: '-__V'
        })
        .select('-__V')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);res.sendStatus(400);
        });
    },
    userCreate({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);res.sendStatus(400);
        });
    },
};

module.exports = userController;