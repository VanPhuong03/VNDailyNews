// src/ArticleList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_ENDPOINTS from "../../config/aip";

function LatestNewsList() {
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
      {articlelist.map((news) => (
        <div key={news.id} className="news-item">
          <h2>{news.tieude}</h2>
          <p>{news.noidungtomtat}</p>
          <img src={news.anhdaidien} alt={news.tieude} className="news-image" />
          <Link to={`/newsdetail/${news.id}`}>Xem chi tiết</Link>
        </div>
      ))}
      <p>Danh sách bài đăng</p>
    </div>
  );
}

export default LatestNewsList;
