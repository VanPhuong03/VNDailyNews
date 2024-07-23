// src/ArticleList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_ENDPOINTS from "../../config/aip";

function ArticleList() {
  const [articlelist, setNews] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_ENDPOINTS.NEWS}/new`)
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
