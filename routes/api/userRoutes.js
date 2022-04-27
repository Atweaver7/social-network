const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    userCreate,

} = require('../../controllers/userController');

router
.route('/:id')
.get(getallUsers)
.post(createUser);

router
.route('/:id')
.get(getUserById)








module.exports = router;