const { User } = require('../models');

const userController = {

    // Get ALl users
    getAllUsers(req, res) {
        User.find({})
        .populate({ 
        path: __dirname + 'users',
        select: '-__V'
    })
    .select('-__V')
    .sort({_id: -1})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);res.sendStatus(400);
    });
    },

    // get a single user by id
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

    // create a new user
    userCreate({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);res.sendStatus(400);
        });
    },
    // Update an existing user
    userUpdate({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true})
        .then(dbuserData => {
            if (!dbuserData) {
                res.status(400).json({message:'No user with this ID exists'});
                return;
            }
            res.json(dbuserData);
        })
        .catch(err => {
            console.log(err);res.sendStatus(400);
        })
    },
    userDelete({ params }, res) {
        User.findOneAndDelete({ _id: params.id}, body, {new: true, runValidators: true})
        .then(dbuserData => {
            if (!dbuserData) {
                res.status(400).json({message:'No user with this ID exists'});
                return;
            }
            res.json(dbuserData);
        })
        .catch(err => {
            console.log(err);res.sendStatus(400);
        })
    },

    // add a friend
    friendAdd({ params }, res) {
        User.findOneAndUpdate({ _id: params.id}, {$push: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(dbUsersData => {
            if (!dbUsersData) {
                res.status(404).json({message: 'No user with this ID exists'});
                return;
            }
        res.json(dbUsersData);
        })
        .catch(err => res.json(err));
    },

    // delete a friend
    friendDelete({ params }, res) {
        User.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No user with this ID exists'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    }

};

module.exports = userController;