// src/ArticleList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ArticleList() {
  const [articlelist, setNews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/news/new")
      .then((response) => {
        setNews(response.data.data);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi gọi API:", error);
      });
  }, []);

  return (
    <div className="article-list">
      {articlelist.map((article) => (
        <div key={article.id} className="article-item">
          <h2>{article.tieude}</h2>
          <p>{article.noidungtomtat}</p>
          <img src={article.anhdaidien} alt={article.tieude} className="article-image" />
          <Link to={`/newsdetail/${article.id}`}>Xem chi tiết</Link>
        </div>
      ))}
      <p>Danh sách bài đăng</p>
    </div>
  );
}

export default ArticleList;
