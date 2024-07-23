import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsList = ({ categoryId, tagId }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    if (categoryId && tagId) {
      // Gọi API để lấy danh sách bài viết theo tag
      axios
        .get(
          `http://localhost:5000/api/v1/daboard-news?category=${categoryId}&tag=${tagId}`
        )
        .then((response) => {
          const selectedCategory = response.data.data.find(
            (category) => category.id === categoryId
          );
          if (selectedCategory) {
            const selectedTagNews = selectedCategory.news.filter((news) =>
              news.tags.includes(tagId)
            );
            setNews(selectedTagNews);
          }
        })
        .catch((error) => {
          console.error("Error fetching news:", error);
        });
    }
  }, [categoryId, tagId]);

  return (
    <div>
      <h2>Bài viết</h2>
      <ul>
        {news.map((newsItem) => (
          <li key={newsItem.id}>
            <h3>{newsItem.tieude}</h3>
            <p>{newsItem.noidungtomtat}</p>
            <p>{newsItem.ngaydang}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;


