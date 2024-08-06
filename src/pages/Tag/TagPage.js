// // TagPages

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { fetchTagData} from "../../services/newsService";

// function TagPage() {
//   const { id } = useParams();
//   const [tag, setTag] = useState(null);
//   const [newsList, setNewsList] = useState([]);
//   const [category, setCategory] = useState(null);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [loadingTags, setLoadingTags] = useState(false);
//   const [hasMoreTags, setHasMoreTags] = useState(true); // kiểm soát khi nào cần tải dữ liệu

//   useEffect(() => {
//     const getTagData = async () => {
//       try {
//         const data = await fetchTagData(id);
//         setTag(data.tag);
//         setCategory(data.category);
//         setNewsList(data.newsList);
//         setHasMoreTags(data.newsList.length > 0);
//       } catch (error) {
//         console.error("Error fetching tag data:", error);
//       }
//     };

//     getTagData();
//     window.scrollTo(0, 0);
//     setPage(1); // đặt lại trang về 1 khi id thay đôi
//     setHasMoreTags(true); // đặt lại khi id thay đổi
//   }, [id]);

//   useEffect(() => {
//     const fetchMoreTags = async () => {
//       if (!loadingTags || !hasMoreTags) return;
//       setLoading(true);
//       try {
//         const data = await fetchTagData(id, page);
//         setNewsList((prevList) => [
//           ...prevList,
//           ...data.newsList,
//         ]);
//         setHasMoreTags(data.newsList.length > 0); // Check if there are more tags to load
//         setLoading(false);
//         setLoadingTags(false); // Reset loadingTags after fetching
//       } catch (error) {
//         console.error("Có lỗi xảy ra khi gọi API:", error);
//         setLoading(false);
//         setLoadingTags(false); // Reset loadingTags even on error
//       }
//     };

//     if (page > 1) {
//       fetchMoreTags();
//     }
//   }, [id, page, loadingTags, hasMoreTags]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         window.innerHeight + document.documentElement.scrollTop >=
//         document.documentElement.offsetHeight - 2 &&
//         hasMoreTags
//       ) {
//         setLoadingTags(true);
//         setPage((prevPage) => prevPage + 1);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [hasMoreTags]);

//   if (!tag || !category) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container content">
//       <h2>{category.ten}</h2>
//       <h3>{tag.ten}</h3>
//       <ul>
//         {newsList.map((news) => (
//           <li key={news.id}>
//             <img src={news.anhdaidien} alt={news.tieude} />
//             <h4>{news.tieude}</h4>
//             <p>{news.noidungtomtat}</p>
//           </li>
//         ))}
//       </ul>
//       {loading && <p>Loading...</p>}
//     </div>
//   );
// }

// export default TagPage;

// TagPages

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchTagData } from "../../services/newsService";
import RecommenNewsList from "@components/CategoryPage/RecommenNewsList/RecommenNewsList";
import LatestNewsList from "@components/LatestNewsList/LatestNewsList";
import "./index.scss";
function TagPage() {
  const { id } = useParams();
  const [tag, setTag] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [category, setCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingTags, setLoadingTags] = useState(false);
  const [hasMoreTags, setHasMoreTags] = useState(true); // kiểm soát khi nào cần tải dữ liệu

  useEffect(() => {
    const getTagData = async () => {
      try {
        const data = await fetchTagData(id);
        setTag(data.tag);
        setCategory(data.category);
        setNewsList(data.newsList);
        setHasMoreTags(data.newsList.length > 0);
      } catch (error) {
        console.error("Error fetching tag data:", error);
      }
    };

    getTagData();
    window.scrollTo(0, 0);
    setPage(1); // đặt lại trang về 1 khi id thay đôi
    setHasMoreTags(true); // đặt lại khi id thay đổi
  }, [id]);

  useEffect(() => {
    const fetchMoreTags = async () => {
      if (!loadingTags || !hasMoreTags) return;
      setLoading(true);
      try {
        const data = await fetchTagData(id, page);
        setNewsList((prevList) => [...prevList, ...data.newsList]);
        setHasMoreTags(data.newsList.length > 0); // Check if there are more tags to load
        setLoading(false);
        setLoadingTags(false); // Reset loadingTags after fetching
      } catch (error) {
        console.error("Có lỗi xảy ra khi gọi API:", error);
        setLoading(false);
        setLoadingTags(false); // Reset loadingTags even on error
      }
    };

    if (page > 1) {
      fetchMoreTags();
    }
  }, [id, page, loadingTags, hasMoreTags]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 2 &&
        hasMoreTags
      ) {
        setLoadingTags(true);
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMoreTags]);

  if (!tag || !category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container content">
      <Row>
        <Col lg={9} md={12} className="tags-page">
          {/* <h2>{category.ten}</h2> */}
          <h3>{tag.ten}</h3>
          <div>
            {newsList.map((news, index) => (
              <Row
                key={news.id}
                className={`news-item ${index === 0 ? "first-news-item" : ""}`}
              >
                <Col lg={4} className="images">
                  <a href={`/newsdetail/${news.id}`}>
                    <img src={news.anhdaidien} alt={news.tieude}></img>
                  </a>
                </Col>
                <Col lg={8} className="title">
                  <div className="main-title">
                    <a href={`/newsdetail/${news.id}`}> {news.tieude}</a>
                  </div>
                  <p className="summary-content">{news.noidungtomtat}</p>
                </Col>
              </Row>
            ))}
          </div>
        </Col>
        <Col lg={3} md={12}>
          <LatestNewsList />
          <RecommenNewsList />
        </Col>
      </Row>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default TagPage;
