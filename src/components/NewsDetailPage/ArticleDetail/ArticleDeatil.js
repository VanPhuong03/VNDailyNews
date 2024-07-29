import React from "react";

const ArticleDetail = ({ inforNews, tags }) => {
  // Dùng switch để xử lý các loại nội dung khác nhau
  const renderContent = (content, index) => {
    switch (content.type) {
      case "text default":
        return <p key={index}>{content.value}</p>;
      case "text italic":
        return <p key={index} style={{ fontStyle: "italic" }}>{content.value}</p>;
      case "text bold":
        return <p key={index} style={{ fontWeight: "bold" }}>{content.value}</p>;
      case "title default":
        return <h2 key={index}>{content.value}</h2>;
      case "title italic":
        return <h2 key={index} style={{ fontStyle: "italic" }}>{content.value}</h2>;
      case "title bold":
        return <h2 key={index} style={{ fontWeight: "bold" }}>{content.value}</h2>;
      case "image":
        return <img key={index} src={content.src} alt={content.name} />;
      case "richtext":
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: content.value }}
          />
        );
      default:
        return null;
    }
  };

  console.log(inforNews);

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
