const router = require('express').Router();

const {
    thoughtCreate,
    getAllThought,
    getThoughtById,
    thoughtUpdate,
    deleteThought,
    addReaction,
    deleteReaction



} = require('../../controllers/thoughtController')

router
.route('/')
.get(getAllThought);

router
.route('/:id')
.get(getThoughtById)
.put(thoughtUpdate)
.delete(deleteThought);

router
.route('/:userId')
.post(thoughtCreate);

router
.route('/:thoughtId/reactions')
.post(addReaction);

router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;





