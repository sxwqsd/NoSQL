const { Thoughts, User } = require('../models');

const thoughtsController = {
  // add Thoughts to User
  addThoughts({ params, body }, res) {
    console.log(params);
    Thoughts.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.UserId },
          { $push: { Thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        console.log(dbUserData);
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // add reply to Thoughts
  addReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.ThoughtsId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // remove Thoughts
  removeThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.ThoughtsId })
      .then(deletedThoughts => {
        if (!deletedThoughts) {
          return res.status(404).json({ message: 'No Thoughts with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.UserId },
          { $pull: { Thoughts: params.ThoughtsId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  // remove Reaction
  removeReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.ThoughtsId },
      { $pull: { replies: { ReactionId: params.ReactionId } } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtsController;
