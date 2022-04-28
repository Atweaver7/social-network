const { Thought, User } = require("../models")

const thoughtController = {

thoughtCreate({params, body}, res) {
    Thought.create(body)
    .then(({_id}) => {
        return Users.findOneAndUpdate({ _id: params.userId}, {$push: {thoughts: _id}}, {new: true});
    })
    .then(dbThoughtsData => {
        if(!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
        res.json(dbThoughtsData)
    })
    .catch(err => res.json(err)); 
},






}