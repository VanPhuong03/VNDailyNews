import React from "react";

const ArticleDetail = ({ inforNews, tags }) => {
  //dùng props để lấy dữ liệu được truyền từ trang newsdetailpage
  const renderContent = (content, index) => {
    if (content.type === "text default") {
      // Hiển thị văn bản
      return <p key={index}>{content.value}</p>;
    } else if (content.type === "image") {
      // Hiển thị ảnh
      return <img key={index} src={content.src} alt={content.name} />;
    } else if (content.type === "richtext") {
      // Hiển thị richtext
      return (
        <div key={index} dangerouslySetInnerHTML={{ __html: content.value }} />
      );
    } else {
      return null;
    }
  };

  // Chuyển đổi dữ liệu JSON và hiển thị nội dung
  const contentDetails = JSON.parse(inforNews.noidungchitiet);

  return (
    <div className="article-detail container">
      <h1 className="tags">
        {tags &&
          tags.map((tag) => (
            <span key={tag.id} className="tag">
              {tag.ten}
            </span>
          ))}
      </h1>

      <h1>{inforNews.tieude}</h1>
      <p>{inforNews.noidungtomtat}</p>
      <img src={inforNews.anhdaidien} alt={inforNews.tieude} />
      <div className="content-details">
        {contentDetails.map((content, index) => renderContent(content, index))}
      </div>
    </div>
  );
};

export default ArticleDetail;
