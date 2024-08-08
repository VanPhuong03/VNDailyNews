import React, { useState, useEffect } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import API_ENDPOINTS from "@config/api";
// import API_ENDPOINTS from "../../config/api";
function RecommenNewsList() {
  const [newslist, setNews] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_ENDPOINTS.NEWS}/propose`)
      .then((response) => {
        const newsData = response.data.data;
        setNews(newsData);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi gọi API:", error);
      });
  }, []);
  return (
    <div className="latest_news-list">
      <div className="title-latest-news">
        <a href="/">Tin tức đề xuất</a>
      </div>
      {newslist.map((news) => (
        <div key={news.id} className="news-item">
          <Row className="">
            <Col xl={5} lg={6} md={8} className="w-100 h-10">
              <div className="image">
                <Link to={`/newsdetail/${news.id}`}>
                  <img
                    src={news.anhdaidien}
                    alt={news.tieude}
                    className="news-image"
                  />
                </Link>
              </div>
            </Col>
            <Col xl={7} lg={6} className="">
              <Link to={`/newsdetail/${news.id}`} className="title">
                <p>{news.tieude}</p>
              </Link>
              {/* <p>{news.noidungtomtat}</p> */}
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
}

export default RecommenNewsList;
