News API Service

Overview
This project is a simple Node.js API service that interacts with the GNews API to fetch news articles. The service allows users to:
• Fetch a specified number of news articles.
• Find a news article by a specific title or author.
• Search for news articles using keywords.
The API service also includes caching to reduce redundant API calls and improve performance.
Features
• Fetch N news articles: Get a specified number of the latest news articles.
• Find a news article by title or author: Search for a specific article based on its title or the author's name.
• Search by keywords: Retrieve articles that match specific keywords.
• Caching: Reduces the number of API requests by storing results for a certain period.

Technologies Used
• Node.js - JavaScript runtime environment.
• Express.js - Web framework for Node.js.
• Axios - Promise-based HTTP client for making requests to the GNews API.
• node-cache - In-memory caching solution.

Setup Instructions
Prerequisites
• Node.js (v14.x or higher)
• NPM (v6.x or higher)

Installation

1. Clone the repository:
   git clone https://github.com/yourusername/news-api-service.git
   cd news-api-service
2. Install dependencies:
   npm install
3. Create an environment file:
   Create a ".env" file in the root directory of your project and add your GNews API key:
   GNEWS_API_KEY=your_gnews_api_key
4. Start the server:
   npm start
   The API service will be available at http://localhost:3000.
   API Endpoints
5. Fetch N News Articles
   Endpoint: /api/news
   Method: GET
   Description: Fetch a specified number of the latest news articles.
   Query Parameters:
   • pageSize (optional): The number of articles to fetch (default: 10).
   • q (optional): Keywords to search for in articles.(ex: example, dev...)
   • lang (optional): Language of the articles (default: en).
   • country (optional): Country code to filter news articles.
   Example Request:
   GET http://localhost:3000/api/news?q=example
   Example Response:

{
"totalArticles": 9922,
"articles": [
{
"title": "Unitree's $16,000 G1 could become the first mainstream humanoid robot",
"description": "For years, Unitree has been offering robots that perform similarly to models from companies like Boston Dynamics – except at significantly lower prices. One example is the...",
"content": "What just happened? You could soon own a fully functional humanoid robot for household chores without breaking the bank. Chinese robotics company Unitree has introduced the G1, a highly capable humanoid bot priced at just $16,000 for the base model a... [2431 chars]",
"url": "https://www.techspot.com/news/104472-unitree-16000-g1-could-become-first-mainstream-humanoid.html",
"image": "https://www.techspot.com/images2/news/bigimage/2024/08/2024-08-28-image-13.jpg",
"publishedAt": "2024-08-28T19:16:00Z",
"source": {
"name": "TechSpot",
"url": "https://www.techspot.com"
}
},
...
]
}

2. Find News Article by Title or Author
   Endpoint: /news
   Method: GET
   Description: Find a news article by a specific title or author.
   Query Parameters:
   • title (optional): The title of the article to search for.
   • author (optional): The author's name to search for.

3. Search News Articles by Keywords
   Endpoint: /news
   Method: GET
   Description: Search for news articles that match specific keywords.
   Query Parameters:
   • q (optional): Keywords to search for in articles.

Caching
The API uses node-cache to cache responses for 10 minutes (600 seconds) by default. This prevents repeated API calls for the same request, improving performance and reducing latency.
Testing the Cache
The cache performance can be tested by making the same API request multiple times. If the cache is working correctly, the second and subsequent requests should return data immediately without making a call to the GNews API.
Example Test Case:

1. Make a request to /news?q=technology.
2. Make the same request again within 10 minutes.
3. The second request should be served from the cache, indicated by the absence of additional calls to the GNews API.

Comments
• The project could be extended by adding user authentication, more advanced filtering, and pagination features.
• Consider using a more advanced caching solution like Redis for production environments, especially if deploying on a distributed system.
