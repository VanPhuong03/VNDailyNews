// src/components/SimilarNews.js
import React from "react";

const SimilarNews = ({ newsSimilarList }) => {
  return (
    <div className="similar-articles container ">
      <h2>Bài viết tương tự</h2>
      {newsSimilarList &&
        newsSimilarList.map((similar) => (
          <div key={similar.id} className="similar-article">
            <img src={similar.anhdaidien} alt={similar.tieude} />
            <h3>{similar.tieude}</h3>
            <p>{similar.noidungtomtat}</p>
            <a href={`/newsdetail/${similar.id}`}>Đọc thêm</a>
          </div>
        ))}
    </div>
  );
};

export default SimilarNews;
