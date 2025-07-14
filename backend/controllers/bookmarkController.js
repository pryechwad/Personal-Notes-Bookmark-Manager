const Bookmark = require('../models/Bookmark');
const { fetchUrlMetadata } = require('../utils/fetchMetadata');

exports.createBookmark = async (req, res) => {
  try {
    const { url, title, description, tags } = req.body;

    let finalTitle = title;
    let finalDescription = description;
    
    if (!title) {
      const metadata = await fetchUrlMetadata(url);
      finalTitle = metadata.title;
      if (!description) finalDescription = metadata.description;
    }

    const bookmark = await Bookmark.create({
      url,
      title: finalTitle,
      description: finalDescription,
      tags,
      user: req.user._id
    });

    res.status(201).json(bookmark);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const { q, tags, favorites } = req.query;
    const filter = { user: req.user._id };
    
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { url: { $regex: q, $options: 'i' } }
      ];
    }
    if (tags) filter.tags = { $in: tags.split(',') };
    if (favorites === 'true') filter.isFavorite = true;

    const bookmarks = await Bookmark.find(filter).sort('-createdAt');
    res.json(bookmarks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBookmarkById = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({ _id: req.params.id, user: req.user._id });
    if (!bookmark) return res.status(404).json({ error: 'Not found' });
    res.json(bookmark);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!bookmark) return res.status(404).json({ error: 'Not found' });
    res.json(bookmark);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!bookmark) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({ _id: req.params.id, user: req.user._id });
    if (!bookmark) return res.status(404).json({ error: 'Not found' });
    
    bookmark.isFavorite = !bookmark.isFavorite;
    await bookmark.save();
    res.json(bookmark);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
