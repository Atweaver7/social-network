const { Thought, User } = require("../models");

const thoughtController = {
  thoughtCreate({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return Users.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(400)
            .json({ message: "No thoughts with this particular ID!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
  getAllThought(req, res) {
    Thought.find({})
      .populate({ path: "reactions", select: "__v" })
      .select("__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  getThoughtById({params}, res) {
      Thought.findOne({ _id: params.id })
      .populate({ path: "reactions", select: "__v" })
      .select("__v")
      .then(dbThoughtData => {
          if (dbThoughtData) {
              res.status(400).json({ message: 'No Thought with this ID exists'})
              return;
          }
          res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  }, 
  thoughtUpdate({params, body}, res) {
      Thought.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true})
      .populate({path: "reactions", select: "__v"})
      .select("__v")
      .then(dbThoughtData => {
          if (!dbThoughtData) {
              res.status(400).json({message: 'No Thought with this ID exists'})
              return;
          }
          res.json(dbThoughtData)
      })
      .catch(err => res.json(err))
  },
  thoughtDelete({params}, res) {
      Thought.findOneAndDelete({ _id: params.id})
      .then(dbThoughtData => {
          if (!dbThoughtData) {
              res.status(400).json({message: 'No Thought with this ID exists'})
              return;
          }
          res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  }
};
