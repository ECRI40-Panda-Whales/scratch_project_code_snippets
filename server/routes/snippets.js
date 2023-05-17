const express = require('express');

const snippetsController = require('../controllers/snippetsController');
const cookieController = require('../controllers/cookieController');
const router = express.Router();

const app = express();

// verifyCookie before getSnippets
router.get('/', cookieController.setCookie, snippetsController.getSnippets, (req, res) => {
  if (res.locals.isUserFound) {
    res.status(200).json(res.locals.allSnippets);
  } else {
    res.status(404).send('Could not find User');
  }
}
);

router.post('/', snippetsController.createSnippet, (req, res) =>
  res.status(200).json(res.locals.createdSnippet)
);

router.put('/', snippetsController.updateSnippet, (req, res) =>
  res.status(200).json(res.locals.updatedSnippet)
);

router.delete('/', snippetsController.deleteSnippet, (req, res) =>
  res.status(200).json(res.locals.deletedSnippet)
);

router.use((req, res) => res.status(404).send('Invalid endpoint'));

module.exports = router;
