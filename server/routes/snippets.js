const express = require('express');
const cookieParser = require('cookie-parser'); 

const snippetsController = require('../controllers/snippetsController');
const cookieController = require('../controllers/cookieController');
const router = express.Router();

const app = express();

app.use(cookieParser());

// verifyCookie before getSnippets
router.get('/', snippetsController.getSnippets, (req, res) => {
  if (res.locals.isUserFound) {
    res.status(200).json(res.locals.allSnippets);
  } else {
    res.status(404).json({ message:'Could not find User'});
  }
});

router.post('/', snippetsController.createSnippet, (req, res) => {
  return res.status(200).json({ message: 'Successful post'});
});

router.put('/', snippetsController.updateSnippet, (req, res) => {
  if (res.locals.updatedSnippet) {
    return res.status(200).json({ message: 'Successful update'});
  } else {
    return res.status(404).json({ message: 'Unsuccessful update'});
  }
});

router.delete('/', snippetsController.deleteSnippet, (req, res) => {
  if (res.locals.deletedSnippet) {
    return res.status(200).json({ message: 'Successful delete'});
  } else {
    return res.status(404).json({ message: 'Unsuccessful delete'});
  }
});

router.use((req, res) => res.status(404).send('Invalid endpoint'));

module.exports = router;
