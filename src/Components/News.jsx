import { useEffect, useState } from "react";

const News = () => {
  const [news, setNews] = useState([]);
  const API_KEY = "9EpFfCOMwG1CIfGek1dxeFXxjKEJ3JGfEbK7c6mp";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://api.marketaux.com/v1/news/all?filter_entities=true&language=en&api_token=${API_KEY}`
        );

        const data = await response.json();

        if (response.ok) {
          setNews(data.data);
        } else {
          console.error("Error fetching news:", data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <h2>Latest Financial News</h2>
      <ul>
        {news.length > 0 ? (
          news.map((article, index) => (
            <li key={index} className="news-item">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <h3>{article.title}</h3>
              </a>
              <p>{article.description}</p>
              <small>{new Date(article.published_at).toLocaleString()}</small>
            </li>
          ))
        ) : (
          <p>Loading news...</p>
        )}
      </ul>
    </div>
  );
};

export default News;
