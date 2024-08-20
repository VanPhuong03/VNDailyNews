import React from 'react';
import { Link } from 'react-router-dom';
// import './NotFoundPage.scss'; // Tùy chọn: thêm CSS để tùy chỉnh giao diện

const NotFoundPage = () => {
  return (
    <div className="not-found container content">
      <h1>404 - Không tìm thấy trang</h1>
      <p>Trang bạn yêu cầu không tồn tại.</p>
      <Link to="/">Trở về trang chủ</Link>
    </div>
  );
};

export default NotFoundPage;
