import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchDashboardNews } from "../../services/newsService";
import RecommenNewsList from "@components/RecommenNewsList/RecommenNewsList";
import LatestNewsList from "@components/LatestNewsList/LatestNewsList";
import "./Home.scss";
function Home() {
  const [homedata, setNewsData] = useState([]);
  const [page, setPage] = useState(1);
  const [topViewedNews, setTopViewedNews] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getNewsData = async (page) => {
      setLoading(true);
      try {
        const data = await fetchDashboardNews(page);
        if (data.length === 0) {
          setLoading(false);
          return; // Ngừng tải thêm khi không có dữ liệu mới
        }
        setNewsData((prevData) => [...prevData, ...data]);
        setLoading(false);
      } catch (error) {
        console.error("Có lỗi xảy ra khi gọi API:", error);
        setLoading(false);
      }
    };
    getNewsData(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 2
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container className="content home-page">
      <Row>
        <Col lg={9} md={12} className="content-left">
          {topViewedNews && (
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
                  <p className="summary-content">
                    {topViewedNews.noidungtomtat}
                  </p>
                </div>
              </Col>
            </Row>
          )}
          <Row className="news-by-category">
            {homedata.map(
              (category) =>
                category.news.length > 0 && (
                  <div key={category.id} className="home">
                    <div className="category-and-tag d-flex align-items-center">
                      <div className="title-category">
                        <a
                          href={`/categorys/${category.id}`}
                          className="category m-0"
                        >
                          {category.ten}
                        </a>
                      </div>
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
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
            )}
          </Row>
          {loading && <p>Loading...</p>}
        </Col>
        <Col lg={3} md={12} className="content-right">
          <Row>
            <Col lg={12} md={6} className="mb-3">
              <LatestNewsList />
            </Col>
            <Col lg={12} md={6} className="recommen">
              <RecommenNewsList setTopViewedNews={setTopViewedNews} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
