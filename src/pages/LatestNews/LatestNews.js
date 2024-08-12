import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchLatestNews } from "../../services/newsService";
import RecommenNewsList from "@components/CategoryPage/RecommenNewsList/RecommenNewsList";
import "./index.scss";

function LatestNews() {
  const [newsList, setNews] = useState([]);

  useEffect(() => {
    const getLatestNews = async () => {
      try {
        const data = await fetchLatestNews();
        setNews(data);
      } catch (error) {
        console.error("Có lỗi xảy ra khi gọi API:", error);
      }
    };
    getLatestNews();
  }, []);

  return (
    <div className="container content">
      <Row>
        <Col lg={9} className="latest-news">
          <h1>Tin tức mới nhất</h1>
          <div>
            {newsList.map((news, index) => (
              <Row
                key={news.id}
                className={`news-item ${index === 0 ? "first-news-item" : ""}`}
              >
                <Col lg={4} className="images">
                  <Link to={`/newsdetail/${news.id}`}>
                    <img src={news.anhdaidien} alt={news.tieude}></img>
                  </Link>
                </Col>
                <Col lg={8} className="title">
                  <div className="main-title">
                    <Link href={`/newsdetail/${news.id}`}> {news.tieude}</Link>
                  </div>
                  <p className="summary-content">{news.noidungtomtat}</p>
                </Col>
              </Row>
            ))}
          </div>
        </Col>
        <Col lg={3}>
          <RecommenNewsList />
        </Col>
      </Row>
    </div>
  );
}

export default LatestNews;
