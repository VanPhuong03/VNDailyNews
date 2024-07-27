import React, { useEffect, useState } from "react";
// import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import API_ENDPOINTS from "../../config/api";
import { fetchDashboardNews } from "../../services/newsService";
import RecommenNewsList from "../../components/RecommenNewsList/RecommenNewsList";
import LatestNewsList from "../../components/LatestNewsList/LatestNewsList";
import "./Home.scss";

function Home() {
  const [homedata, setNewsData] = useState([]);
  const [topViewedNews, setTopViewedNews] = useState([null]);

  useEffect(() => {
    const getNewsData = async () => {
      try {
        const data = await fetchDashboardNews();
        setNewsData(data);
        let topNews = null;
        data.forEach((category) => {
          category.news.forEach((newsItem) => {
            if (!topNews || newsItem.soluotxem > topNews.soluotxem) {
              topNews = newsItem;
            }
          });
        });
        setTopViewedNews(topNews);
      } catch (error) {
        console.error("Có lỗi xảy ra khi gọi API:", error);
      }
    };
    getNewsData();
  }, []);
  console.log(homedata);

  return (
    // <div className=" content home-page">
    <Container className=" content home-page">
      <Row>
        <Col lg={9} md={12} className="content-left">
          <Row className="top_news-view">
            <Col lg={6} md={12} className="">
              <a href={`/newsdetail/${topViewedNews.id}`}>
                <img
                  src={topViewedNews.anhdaidien}
                  alt={topViewedNews.tieude}
                ></img>
              </a>
            </Col>
            <Col lg={6} md={12} className="">
              <div className="title">
                <a
                  href={`/newsdetail/${topViewedNews.id}`}
                  className="main-title"
                >
                  {topViewedNews.tieude}
                </a>
                <p className="summary-content">{topViewedNews.noidungtomtat}</p>
              </div>
            </Col>
          </Row>
          <Row className="news-by-category">
            {homedata.map((category) => (
              <div key={category.id} className="home">
                <div className="category-and-tag d-flex align-items-center ">
                  <div className="title-category">
                    <a
                      href={`/categorys/${category.id}`}
                      className="category m-0"
                    >
                      {category.ten}
                    </a>
                  </div>
                  {/* <div className="tags">
                  {category.tags.slice(0,2).map((tag) => (
                    <span key={tag.id} className="tag">
                      {tag.ten}
                    </span>
                  ))}
                </div> */}
                </div>
                <div className="news">
                  {category.news.slice(0, 4).map((newsItem, index) => (
                    <div key={newsItem.id}>
                      <div className="img">
                        <a href={`/newsdetail/${newsItem.id}`}>
                          <img
                            src={newsItem.anhdaidien}
                            alt={newsItem.tieude}
                          ></img>
                        </a>
                      </div>
                      <div className="title">
                        <a
                          href={`/newsdetail/${newsItem.id}`}
                          className="main-title"
                        >
                          {newsItem.tieude}
                        </a>

                        {index === 0 && (
                          <p className="summary-content m-0">
                            {newsItem.noidungtomtat}
                          </p>
                        )}
                        {/* Chỉ hiển thị nội dung chi tiết cho tin tức đầu tiên */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Row>
        </Col>
        <Col lg={3} md={12} className="content-right">
          <Row>
            <Col lg={12} md={6} className="mb-3">
              <LatestNewsList />
            </Col>
            <Col lg={12} md={6}>
              <RecommenNewsList />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    // </div>
  );
}

export default Home;
