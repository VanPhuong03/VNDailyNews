import axios from "axios";
import API_ENDPOINTS from "@config/api";

// call api trang chủ
export const fetchDashboardNews = async (page, limit = 10) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.DABOARD_NEWS}?page=${page}&limit=${limit}`
    );
    return response.data.data;
  } catch (error) {
    console.error(" Có lỗi xảy ra khi gọi API:", error);
    throw error;
  }
};
// call api menu
export const fetchCategory = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.CATEGORYS}`);
    return response.data.data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi gọi API:", error);
    throw error;
  }
};
// call api trang chi tiết danh mục
export const fetchCategoryPage = async (id, page= 1, limit = 5) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.CATEGORYS}/${id}/?page=${page}&limit=${limit}`
    );
    return response.data.data;
  } catch (error) {
    console.error(" Có lỗi xảy ra khi gọi API:", error);
    throw error;
  }
};
// api lấy thêm các thẻ 
export const loadMoreTags = async (id, page) => {
  const response = await axios.get(
    `${API_ENDPOINTS.CATEGORYS}/${id}/?page=${page}`
  );
  return response.data.data;
};