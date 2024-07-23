import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_ENDPOINTS from "../../config/aip";
function RecommenNewsList() {
  const [newslist, setNews] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_ENDPOINTS.NEWS}/propose`)
      .then((response) => {
        setNews(response.data.data);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi gọi API:", error);
      });
  }, []);
  return (
    <div>
      <div className="article-list">
        {newslist.map((news) => (
          <div key={news.id} className="news-item">
            <h2>{news.tieude}</h2>
            <p>{news.noidungtomtat}</p>
            <img
              src={news.anhdaidien}
              alt={news.tieude}
              className="news-image"
            />
            <Link to={`/newsdetail/${news.id}`}>Xem chi tiết</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommenNewsList;
