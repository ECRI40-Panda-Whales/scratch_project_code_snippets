const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  tags: {
    type: Object,
    default: {},
  },
  languages: {
    type: Object,
    default: {},
  },

  lastId: { type: Number, default: 0 },

  snippets: {
    type: [
      {
        id: { type: Number, required: true },
        type: Object,
        title: { type: String, required: true },
        comments: { type: String },
        storedCode: { type: String },

        tags: [String],
        language: { type: String },
      },
    ],
    default: [],
  },
});

// const User = mongoose.model('User', userSchema);

// const newUser = new User({
//   username: 'jeff',
//   password: 'password',
//   tags: {},
//   languages: {},
//   lastId: 0,
//   snippets: [
//     {
//       id: 1,
//       title: 'coolio',
//       comments: 'PLEASE',
//       storedCode: 'console.log("hi");',
//       tags: [''],
//       language: 'JavaScript',
//     }
//   ]
// });

// newUser.save()
//   .then(() => console.log('SAVED THE USER'))
//   .catch((err) => console.log(err));

// module.exports = { User };

module.exports = mongoose.model('User', userSchema);
