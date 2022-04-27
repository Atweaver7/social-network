const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    userCreate,

} = require('../../controllers/userController');

router
.route('/')
.get(getAllUsers)
.post(userCreate);

router
.route('/:id')
.get(getUserById)








module.exports = router;