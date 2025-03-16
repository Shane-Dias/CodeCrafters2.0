import { useEffect, useState } from "react";
import { data } from "react-router-dom";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/recommendations/news/`
        );

        const data = await response.json();
        if (response.ok) {
          console.log(data);
          setNews(data.bot_response);
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
        <p>{news}</p>: (<p>Loading news...</p>)
      </ul>
    </div>
  );
};

export default News;
