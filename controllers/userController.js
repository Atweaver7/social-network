const { User } = require('../models');


const userController = {

    // Get ALl users
    getAllUsers(req, res) {
        User.find({})
        // populate users thoughts
        .populate({path: 'thoughts', select: '-__v'})
        // populate user friends
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        // .sort({_id: -1})
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get a single user by id
    getUserById({params}, res) {
        User.findOne({_id: params.id })
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        // return if no user is found 
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No User with this particular ID!'});
                return; 
            }
            res.json(dbUsersData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
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
        User.findOneAndDelete({_id: params.id})
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