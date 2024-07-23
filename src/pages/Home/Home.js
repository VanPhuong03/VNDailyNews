import React, { useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../config/aip";
import ArticleList from "../../components/ArticleList/ArticleList";

function Home() {
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
                };
              })
            );
            return { ...category, news: updatedNews };
          })
        );

        setCategories(updatedCategories); // Lưu trữ dữ liệu cập nhật vào state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="content container">
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
        danh sách bài viết liên quan
        <ArticleList />
      </div>
    </div>
  );
}

export default Home;
