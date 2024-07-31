import React from "react";
import "./Article.scss";
import CurrentTime from "../../CurrentTime";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import "froala-editor/css/froala_editor.pkgd.min.css";
import PhotoSwipe from "../PhotoSwipe";
// import Zoom from 'react-medium-image-zoom';
const ArticleDetail = ({ inforNews, tags }) => {
  // Dùng switch để xử lý các loại nội dung khác nhau
  const renderContent = (content, index) => {
    switch (content.type) {
      case "text default":
        return <p key={index}>{content.value}</p>;
      case "text italic":
        return (
          <p key={index} style={{ fontStyle: "italic" }}>
            {content.value}
          </p>
        );
      case "text bold":
        return (
          <p key={index} style={{ fontWeight: "bold" }}>
            {content.value}
          </p>
        );
      case "title default":
        return <h2 key={index}>{content.value}</h2>;
      case "title italic":
        return (
          <h2 key={index} style={{ fontStyle: "italic" }}>
            {content.value}
          </h2>
        );
      case "title bold":
        return (
          <h2 key={index} style={{ fontWeight: "bold" }}>
            {content.value}
          </h2>
        );
      case "image":
        return (
          <PhotoSwipe
            key={index}
            images={[
              { src: content.src, width: 800, height: 600, alt: content.name },
            ]}
          />
        );
      case "richtext":
        return <FroalaEditorView key={index} model={content.value} />;
      default:
        return null;
    }
  };

  console.log(inforNews);

  // Chuyển đổi dữ liệu JSON và hiển thị nội dung
  const contentDetails = JSON.parse(inforNews.noidungchitiet);

  return (
    <div className="article-detail container">
      <div className="d-flex justify-content-between nav">
        <ul className="d-flex">
          <li>
            <a href="/" className="home">
              Trang chủ
            </a>
          </li>
          <li>
            <a href="." className="tags">
              {tags &&
                tags.map((tag) => (
                  <span key={tag.id} className="tag">
                    {tag.ten}
                  </span>
                ))}
            </a>
          </li>
        </ul>
        <div className="time">
          <CurrentTime />
        </div>
      </div>

      <p className="title">{inforNews.tieude}</p>
      <p className="summary-content">
        <strong>{inforNews.noidungtomtat}</strong>
      </p>
      {/* <img src={inforNews.anhdaidien} alt={inforNews.tieude} /> */}
      <div className="content-details">
        {contentDetails.map((content, index) => renderContent(content, index))}
      </div>
    </div>
  );
};

export default ArticleDetail;
