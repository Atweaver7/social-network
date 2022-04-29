const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    userCreate,
    userDelete,
    userUpdate,
    friendAdd,
    friendDelete,


} = require('../../controllers/userController');

router
.route('/')
.get(getAllUsers)
.post(userCreate);

router
.route('/:id')
.get(getUserById)
.put(userUpdate)
.delete(userDelete)

router
.route('/:id/friends/:friendId')
.post(friendAdd)
.delete(friendDelete)








module.exports = router;