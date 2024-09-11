// SearchPage.js
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useLocation } from "react-router-dom";
import LatestNewsList from "@components/LatestNewsList/LatestNewsList";
import RecommenNewsList from "@components/CategoryPage/RecommenNewsList/RecommenNewsList";
import CurrentTime from "@components/CurrentTime";
import { fetchSearchData } from "@services/newsService";
import useDocumentTitle from "@hooks/useDocumentTitle";
import Spinner from "react-bootstrap/Spinner";
import "./index.scss";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const query = useQuery();
  const searchValue = query.get("query");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setResults([]);
    setPage(1);
    setHasMore(true);
  },[searchValue]);


  useEffect(() => {
    const getSearchData = async () =>{
      setLoading(true)
      try {
        const data = await fetchSearchData(page, searchValue);
        if(data && Array.isArray(data.newsList)) {
          if(data.newsList.length === 0) {
            setHasMore(false);
          } else {
            setResults((prevData) => [...prevData, ...data.newsList]);
          }
        } else {
          setResults([]);
          console.error("Định dạng không đúng:", data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if( hasMore) {
      getSearchData();
    }
  },[searchValue, hasMore, page]);

  useEffect(() => {
    const handleScroll = () => {
      if(
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 2 &&
        hasMore &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  },[hasMore, loading])

  useDocumentTitle("Tìm kiếm - Hệ thống tin tức 24h");

  if (loading && page === 1)
    return (
      <div className="container content">
        <div className="loading-spinner">
          <Spinner animation="border" />
        </div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container content search_page">
      <Row>
        <Col lg={9} className="main-search">
          <div className="d-flex justify-content-between nav">
            <ul className="d-flex">
              <li>
                <Link to="/" className="home">
                  Trang chủ
                </Link>
              </li>
              <li className="tags">
                <span className="tag">Search</span>
              </li>
            </ul>
            <div className="time">
              <CurrentTime />
            </div>
          </div>
          <h3>Kết quả tìm kiếm cho "{searchValue}"</h3>
          <ul>
            {results.map((news) => (
              <Row key={news.id} className="news-item">
                <div className="images">
                  <Link to={`/newsdetail/${news.id}`}>
                    <img src={news.anhdaidien} alt={news.tieude}></img>
                  </Link>
                </div>
                <div>
                  <div className="main-title">
                    <Link to={`/newsdetail/${news.id}`}> {news.tieude}</Link>
                  </div>
                  <p className="summary-content">{news.noidungtomtat}</p>
                </div>
              </Row>
            ))}
          </ul>
        </Col>
        <Col lg={3} className="content-right">
          <LatestNewsList />
          <RecommenNewsList />
        </Col>
      </Row>
      {loading && page > 1 && (
        <div className="loading-spinner">
          <Spinner animation="border" />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
