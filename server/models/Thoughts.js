const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const Reactions = new Schema({
  reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
  reactionBody: {
    type: String, // String is shorthand for {type: String}
    required: true,
    minlength: 1,
    maxlength: 280,
  },
    username: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
  
},
{
  toJSON: {
    getters: true
  },
  
});


const thoughtsSchema = new Schema({
 thoughtText: {
    type: String, // String is shorthand for {type: String}
    required: true,
    minlength:1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
  username:{
    type: String,
    required: true
  }, 
  reactions: [Reactions]
},
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  });
thoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.reduce(
      (total, reaction) => total + reaction.replies.length + 1,
      0
    );
  });
  

  

  const Thoughts =model('Thoughts', thoughtsSchema);

  module.exports = Thoughts;
  

