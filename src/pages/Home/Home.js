import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import API_ENDPOINTS from "../../config/api";
import RecommenNewsList from "../../components/RecommenNewsList/RecommenNewsList";
import LatestNewsList from "../../components/LatestNewsList/LatestNewsList";
import "./Home.scss";

function Home() {
  const [homedata, setNewsData] = useState([]);
  const [topViewedNews, setTopViewedNews] = useState([null]);
  useEffect(() => {
    axios
      .get(`${API_ENDPOINTS.DABOARD_NEWS}?page=1&limit=10`)
      .then((response) => {
        const data = response.data.data;
        console.log(data);
        setNewsData(response.data.data);
        let topNews = null;
        data.forEach((category) => {
          category.news.forEach((newsItem) => {
            if (!topNews || newsItem.soluotxem > topNews.soluotxem) {
              topNews = newsItem;
            }
          });
        });
        setTopViewedNews(topNews);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi gọi API:", error);
      });
  }, []);
  console.log(topViewedNews);
  return (
    <div className="container content">
      <Container>
        <Row>
          <Col sm={8}>
            <div className="content-left">
              <h1>Bài viết có lượt xem cao nhất</h1>
              <div className="top_news-view">
                <a href={`/newsdetail/${topViewedNews.id}`}>
                  <img
                    src={topViewedNews.anhdaidien}
                    alt={topViewedNews.tieude}
                  ></img>
                </a>
                <h1>
                  <a href={`/newsdetail/${topViewedNews.id}`}>
                    {topViewedNews.tieude}
                  </a>
                </h1>
                <p>{topViewedNews.noidungtomtat}</p>
              </div>
              {homedata.map((category) => (
                <div key={category.id} className="home">
                  <h1>{category.ten}</h1>
                  <div className="tags">
                    {category.tags.map((tag) => (
                      <span key={tag.id} className="tag">
                        {tag.ten}
                      </span>
                    ))}
                  </div>
                  <div className="news">
                    {category.news.map((newsItem) => (
                      <div key={newsItem.id}>
                        <a href={`/newsdetail/${newsItem.id}`}>
                          {" "}
                          <img
                            src={newsItem.anhdaidien}
                            alt={newsItem.tieude}
                          ></img>
                        </a>
                        <h1>
                          <a href={`/newsdetail/${newsItem.id}`}>
                            {newsItem.tieude}
                          </a>
                        </h1>
                        <p>{newsItem.noidungtomtat}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Col>
          <Col sm={4}>
            <div className="content-right">
              <LatestNewsList />
              <RecommenNewsList />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
