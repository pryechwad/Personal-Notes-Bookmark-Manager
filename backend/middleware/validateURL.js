function validateURL(req, res, next) {
  const { url } = req.body;
  const urlRegex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;

  if (!url || !urlRegex.test(url)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  next();
}

module.exports = validateURL;
