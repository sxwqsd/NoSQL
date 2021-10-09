const { Schema, model } = require('mongoose');

const validateEmail = function(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const userSchema = new Schema({
  username: {
    type: String, // String is shorthand for {type: String}
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String, // String is shorthand for {type: String}
    unique: true,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  thoughts: [
  {
    type: Schema.Types.ObjectId,
    ref: 'Thoughts'
  }
  ],
  friends: []
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  // prevents virtuals from creating duplicate of _id as `id`
  id: false
}
);



userSchema.virtual('friendCount').get(function(){
    return this.friends.length
});

const User= model('User', userSchema);

module.exports = User;