const express = require('express');
const cookieParser = require('cookie-parser');

const snippetsController = require('../controllers/snippetsController');
const sessionController = require('../controllers/sessionController');
const router = express.Router();

const app = express();

app.use(cookieParser());

// verifyCookie before getSnippets
router.get(
  '/',
  sessionController.isLoggedIn,
  snippetsController.getSnippets,
  (req, res) => {
    if (res.locals.isUserFound) {
      res
        .status(200)
        .header('Access-Control-Allow-Origin', 'http://localhost:8080')
        .header('Access-Control-Allow-Credentials', 'true')
        .json(res.locals.allSnippets);
    } else {
      res.status(404).json({ message: 'Could not find User' });
    }
  }
);

router.post(
  '/',
  sessionController.isLoggedIn,
  snippetsController.createSnippet,
  (req, res) => {
    return res.status(200).json({ message: 'Successful post' });
  }
);

router.patch(
  '/',
  sessionController.isLoggedIn,
  snippetsController.updateSnippet,
  (req, res) => {
    if (res.locals.updated) {
      return res.status(200).json({ message: 'Successful update' });
    } else {
      return res.status(404).json({ message: 'Unsuccessful update' });
    }
  }
);

router.delete(
  '/',
  sessionController.isLoggedIn,
  snippetsController.deleteSnippet,
  (req, res) => {
    if (res.locals.deletedSnippet) {
      res
        .header(
          'Access-Control-Allow-Methods',
          'GET',
          'PUT',
          'POST',
          'DELETE',
          'OPTIONS'
        )
        .header('Access-Control-Allow-Origin', 'http://localhost:8080')
        .header('Access-Control-Allow-Credentials', 'true');
      return res.status(200).json({ message: 'Successful delete' });
    } else {
      return res.status(404).json({ message: 'Unsuccessful delete' });
    }
  }
);

router.use((req, res) => res.status(404).send('Invalid endpoint'));

module.exports = router;
