// src/ArticleList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import API_ENDPOINTS from "../../config/api";
import "./LatestNewsList.scss";

function LatestNewsList() {
  const [newslist, setNews] = useState([]);

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
    <div className="latest_news-list">
      <h3>Tin tức mới nhất</h3>
      {newslist.map((news) => (
        <div key={news.id} className="news-item">
          <Row className="p-1">
            <Col lg={4} className="pl-0 w-100 h-10">
              <Link to={`/newsdetail/${news.id}`}>
                <img
                  src={news.anhdaidien}
                  alt={news.tieude}
                  className="news-image"
                />
              </Link>
            </Col>
            <Col lg={8} className="p-0">
              <Link to={`/newsdetail/${news.id}`}>
                <h6>{news.tieude}</h6>
              </Link>
              {/* <p>{news.noidungtomtat}</p> */}
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
}

export default LatestNewsList;
