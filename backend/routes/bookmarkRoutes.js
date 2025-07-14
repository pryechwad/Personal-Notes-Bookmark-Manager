const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createBookmark,
  getBookmarks,
  getBookmarkById,
  updateBookmark,
  deleteBookmark,
  toggleFavorite,
} = require('../controllers/bookmarkController');
const validateURL = require('../middleware/validateURL');

router.use(auth);

router.post('/', validateURL, createBookmark);
router.get('/', getBookmarks);
router.get('/:id', getBookmarkById);
router.put('/:id', updateBookmark);
router.delete('/:id', deleteBookmark);
router.patch('/:id/favorite', toggleFavorite);

module.exports = router;
