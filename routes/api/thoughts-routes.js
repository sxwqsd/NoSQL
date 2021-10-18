const router = require('express').Router();
const {
  addThoughts,
  removeThoughts,
  addReaction,
  removeReaction
} = require('../../controllers/thoughts-controller');

// /api/Thoughts/<UserId>
router.route('/:userId').post(addThoughts);

// /api/Thoughts/<UserId>/<ThoughtId>
router
  .route('/:userId/:thoughtId')
  .put(addReaction)
  .delete(removeThoughts);

// /api/Thoughts/<UserId>/<ThoughtId>/<ReactionId>
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;