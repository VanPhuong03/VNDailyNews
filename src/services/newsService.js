import axios from "axios";
import API_ENDPOINTS from "../config/api";

export const fetchDashboardNews = async (page, limit=10) => {
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
export const fetchCategory = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.CATEGORYS}`);
    return response.data.data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi gọi API:", error);
    throw error;
  }
};
