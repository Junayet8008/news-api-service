const axios = require("axios");
const NodeCache = require("node-cache");

const apiKey = process.env.GNEWS_API_KEY;
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

const baseURL = "https://gnews.io/api/v4";

const fetchNews = async (params) => {
  const url = params.q ? `${baseURL}/search` : `${baseURL}/top-headlines`;
  try {
    const response = await axios.get(url, {
      params: {
        ...params,
        token: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching news from GNews API");
  }
};

const getNews = async (req, res) => {
  try {
    const {
      q = "",
      lang = "en",
      country,
      pageSize = 10,
      title = "",
      author = "",
    } = req.query;

    const params = {
      q: `${q} ${title} ${author}`.trim(),
      lang,
      country,
      pageSize,
    };

    // Generate a unique cache key based on the query parameters
    const cacheKey = `${q}-${lang}-${country}-${pageSize}-${title}-${author}`;

    // Check if data is available in the cache
    const cachedNews = cache.get(cacheKey);
    if (cachedNews) {
      // Return cached data
      return res.status(200).json(cachedNews);
    }

    // If not in cache, fetch data from the API
    const news = await fetchNews(params);

    let result = news;

    if (title || author) {
      const filteredArticles = news.articles.filter(
        (article) =>
          (title && article.title.includes(title)) ||
          (author && article.author && article.author.includes(author))
      );
      result = filteredArticles;
    }

    // Store the result in the cache
    cache.set(cacheKey, result);

    // Return the fetched data
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getNews,
};
