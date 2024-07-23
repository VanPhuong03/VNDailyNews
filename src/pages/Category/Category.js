import React, { useState, useEffect } from "react";
import axios from "axios"; // thư viện thực hiện các yêu cầu từ HTTP
import API_ENDPOINTS from "../../config/aip";
import { useParams } from "react-router-dom";

// import API_ENDPOINTS from "../../config/aip";

function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        // Lấy dữ liệu của danh mục
        const response = await axios.get(
          `${API_ENDPOINTS.DABOARD_NEWS}?page=1&limit=10&category_id=${id}`
        );
        const categoryData = response.data.data.find(
          (cat) => cat.id === parseInt(id)
        );

        // Lấy chi tiết từng bài viết để thêm ảnh đại diện
        if (categoryData) {
          const updatedNews = await Promise.all(
            categoryData.news.map(async (news) => {
              const detailResponse = await axios.get(
                 `${API_ENDPOINTS.NEWS}/${news.id}`
              );
              return {
                ...news,
                anhdaidien: detailResponse.data.data.inforNews.anhdaidien,
              };
            })
          );

          setCategory({ ...categoryData, news: updatedNews });
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [id]);

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="category-page content container">
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
  );
}

export default CategoryPage;
