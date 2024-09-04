import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { fetchRecommendedNews } from "../../services/newsService";
import LatestNewsList from "@components/LatestNewsList/LatestNewsList";
import Spinner from "react-bootstrap/Spinner";
import "./index.scss";

function RecommenedNews() {
  const [newsList, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLatestNews = async () => {
      setLoading(true);
      try {
        const data = await fetchRecommendedNews();
        setNews(data);
        setLoading(false)
      } catch (error) {
        console.error("Có lỗi xảy ra khi gọi API:", error);
      }
    };
    getLatestNews();
  }, []);

  useDocumentTitle("Tin tức đề xuất - Hệ thống tin tức 24h")

  return (
    <div className="container content">
      <Row>
        <Col lg={9} className="latest-news">
          <h1>Tin tức đề xuất</h1>
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
                    <Link to={`/newsdetail/${news.id}`}> {news.tieude}</Link>
                  </div>
                  <p className="summary-content">{news.noidungtomtat}</p>
                </Col>
              </Row>
            ))}
          </div>
        </Col>
        <Col lg={3}>
          <LatestNewsList />
        </Col>
      </Row>
      {loading && (
        <div className="loading-spinner">
          <Spinner animation="border" />
        </div>
      )}
    </div>
  );
}

export default RecommenedNews;
