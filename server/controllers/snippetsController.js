const User = require('../models/userModel.js');

const snippetsController = {};

snippetsController.getSnippets = async (req, res, next) => {
  if (!res.locals.authorized) return next(); // if user not logged in, move on
 
  console.log('in getSnippets');
  // How to find the snippets regarding user
  const dummyid = '6465293ac133d4efef0fe5cc';
  req.cookies.ssid = dummyid;
  const userId = req.cookies.ssid;
  console.log('req cookies: ', req.cookies.ssid);

  try {
    const foundUser = await User.findOne({ _id: userId });
    console.log('foundUser: ', foundUser);
    if (foundUser) {
      res.locals.isUserFound = true;
      res.locals.allSnippets = foundUser.snippets;
      console.log('All snippets: ', res.locals.allSnippets);
    } else {
      res.locals.isUserFound = false;
    }
    return next();
  } catch (err) {
    return next({
      log: `Error in getSnippets controller method: ${err}`,
      status: 400,
      message: 'Error while getting Snippets',
    });
  }
};

snippetsController.createSnippet = async (req, res, next) => {
  if (!res.locals.authorized) return next(); // if user not logged in, move on

  const { title, comments, storedCode, tags, language } = req.body;
  const snippet = { title, comments, storedCode, tags, language };
  const dummyid = '6465293ac133d4efef0fe5cc';
  req.cookies.ssid = dummyid;
  const userId = req.cookies.ssid;
  try {
    const foundUser = await User.findById({ _id: userId });

    const newSnippet = {
      id: userId + 1,
      ...snippet,
    };
    foundUser.snippets.push(newSnippet);
    await foundUser.save();
    return next();
  } catch (err) {
    return next({
      log: `Error in getSnippets controller method: ${err}`,
      status: 400,
      message: 'Error while getting Snippets',
    });
  }
};
 
snippetsController.updateSnippet = async (req, res, next) => {
  if (!res.locals.authorized) return next(); // if user not logged in, move on

  const { id, title, comments, storedCode, tags, language } = req.body;
  const updatedSnippetData = { id, title, comments, storedCode, tags, language };
  const dummyid = '6465293ac133d4efef0fe5cc';
  req.cookies.ssid = dummyid;
  const userId = req.cookies.ssid;

  try { 
    // find user and specified snippet and update snippet
    const updatedSnippet = await User.findOneAndUpdate(
      { _id: userId, 'snippets.id': id },
      { $set: { 'snippets.$': updatedSnippetData }},
      { new: true },
    );
    // sending our snippets route an update flag
    if (updatedSnippet) {
      res.locals.updated = true;
    } else {
      res.locals.updated = false;
    }
    return next();
  } catch (err) {
    return next({
      log: `Error in updateSnippet controller method: ${err}`,
      status: 400,
      message: 'Error while updating Snippets',
    });
  }
};

snippetsController.deleteSnippet = async (req, res, next) => {
  if (!res.locals.authorized) return next(); // if user not logged in, move on

  const { id } = req.query;
  const dummyid = '6465293ac133d4efef0fe5cc';
  req.cookies.ssid = dummyid;
  const userId = req.cookies.ssid;

  try {
    const deletedSnippet = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { snippets: { 'id': { $eq: id }}}}, // using mongo operators to remove from existing array instances of a value that matches snippets: { 'id': id }
      { new: true }
    );
    if (deletedSnippet) {
      res.locals.deletedSnippet = true;
    } else {
      res.locals.deletedSnippet = false;
    }
    return next();
  } catch (err) {
    return next({
      log: `Error in deleteSnippet controller method: ${err}`,
      status: 400,
      message: 'Error while deleting Snippets',
    });
  }
};

// helper function to re-calculate taglist/language counts?
// const recalcTagsAndLang = function (user) {
//   const tagList = {};
//   const languageList = {};

//   for (const snippet of user.snippets) {
//     if (Array.isArray(snippet.tags)) {
//       for (const tag of snippet.tags) {
//         if (!tagList[tag]) {
//           tagList[tag] = [];
//         }
//         tagList[tag].push(snippet);
//       }

//       if (!languageList[snippet.language]) {
//         languageList[snippet.language] = [];
//       }
//       languageList[snippet.language].push(snippet);
//     }
//   }
//   //return something here.
//   return [tagList, languageList];
// };

module.exports = snippetsController;
