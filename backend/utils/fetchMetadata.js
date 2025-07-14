const axios = require('axios')
const cheerio = require('cheerio')

const fetchUrlMetadata = async (url) => {
  try {
    // Ensure URL has protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url
    }

    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    const $ = cheerio.load(response.data)
    
    // Extract title from various sources
    let title = $('title').text().trim()
    if (!title) title = $('meta[property="og:title"]').attr('content')
    if (!title) title = $('meta[name="twitter:title"]').attr('content')
    if (!title) title = $('h1').first().text().trim()
    
    // Extract description
    let description = $('meta[name="description"]').attr('content')
    if (!description) description = $('meta[property="og:description"]').attr('content')
    if (!description) description = $('meta[name="twitter:description"]').attr('content')
    
    // Extract favicon
    let favicon = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href')
    if (favicon && !favicon.startsWith('http')) {
      const urlObj = new URL(url)
      favicon = urlObj.origin + (favicon.startsWith('/') ? favicon : '/' + favicon)
    }

    return {
      title: title || 'Untitled',
      description: description || '',
      favicon: favicon || '',
      url: url
    }
  } catch (error) {
    console.error('Error fetching metadata:', error.message)
    return {
      title: 'Untitled',
      description: '',
      favicon: '',
      url: url
    }
  }
}

module.exports = { fetchUrlMetadata }