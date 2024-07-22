import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/daboard-news?page=1&limit=10&category_id=${id}`)
      .then((response) => {
        setCategory(response.data.data.find(cat => cat.id === parseInt(id)));
      })
      .catch((error) => {
        console.error('Error fetching category:', error);
      });
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
            <p>{news.noidungtomtat}</p>
            <p><strong>Ngày đăng:</strong> {news.ngaydang}</p>
            <a href={`/newsdetail/${news.id}`} >xem thêm</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
