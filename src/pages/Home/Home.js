import React, { useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../config/api";
import RecommenNewsList from "../../components/RecommenNewsList/RecommenNewsList";
import LatestNewsList from "../../components/LatestNewsList/LatestNewsList";
import "./Home.scss";

function Home() {
  const [topArticle, setTopArticle] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Lấy danh sách bài viết từ API trang chủ
        const response = await axios.get(
          `${API_ENDPOINTS.DABOARD_NEWS}?page=1&limit=10`
        );
        const categoriesData = response.data.data;

        // Lấy chi tiết từng bài viết từ API `ArticleDetail` để thêm ảnh đại diện
        const updatedCategories = await Promise.all(
          categoriesData.map(async (category) => {
            const updatedNews = await Promise.all(
              category.news.map(async (news) => {
                const detailResponse = await axios.get(
                  `${API_ENDPOINTS.NEWS}/${news.id}`
                );
                return {
                  ...news,
                  anhdaidien: detailResponse.data.data.inforNews.anhdaidien,
                  views: detailResponse.data.data.inforNews.soluotxem,
                };
              })
            );
            return { ...category, news: updatedNews };
          })
        );

        // Tìm bài viết có số lượt xem cao nhất
        const allNews = updatedCategories.flatMap((category) => category.news);
        const articleWithMaxViews = allNews.reduce((max, article) => {
          return article.views > max.views ? article : max;
        }, allNews[0]); // Khởi tạo với bài viết đầu tiên

        setTopArticle(articleWithMaxViews);
        setCategories(updatedCategories); // Lưu trữ dữ liệu cập nhật vào state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchArticles();
  }, []);
  if (!topArticle) return <div>Loading...</div>;
  return (
    <div className="content container">
      <h1>Bài viết có lượt xem nhiều nhất</h1>
      <div className="top-article">
        <div className="article-details">
          <h2>{topArticle.tieude}</h2>
          {topArticle.anhdaidien && (
            <img
              src={topArticle.anhdaidien}
              alt={topArticle.tieude}
              className="article-image"
            />
          )}
          <p>{topArticle.noidungtomtat}</p>
          <a href={`/newsdetail/${topArticle.id}`}>Đọc thêm</a>
        </div>
      </div>
      <h1>Danh sách bài viết đề cử theo từng danh mục</h1>
      <div>
        {categories.map((category) => (
          <div key={category.id} className="category">
            <h2>{category.ten}</h2>
            <div className="tags">
              {category.tags.map((tag) => (
                <span key={tag.id} className="tag">
                  {tag.ten}
                </span>
              ))}
            </div>
            <div className="articles">
              {category.news.map((news) => (
                <div key={news.id} className="article">
                  <h3>{news.tieude}</h3>
                  {news.anhdaidien && (
                    <img
                      src={news.anhdaidien}
                      alt={news.tieude}
                      className="article-image"
                    />
                  )}
                  <p>{news.noidungtomtat}</p>
                  <p>
                    <strong>Ngày đăng:</strong> {news.ngaydang}
                  </p>
                  <a href={`/newsdetail/${news.id}`}>xem thêm</a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        <h1>danh sách bài viết mới nhất</h1>
        <LatestNewsList />
      </div>
      <div>
        <h1>danh sách bài viết đề xuất</h1>
        <RecommenNewsList />
      </div>
    </div>
  );
}

export default Home;
