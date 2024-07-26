import axios from "axios";
import API_ENDPOINTS from "../config/api";

export const fetchDashboardNews = async() => {
    try {
        const response = await axios.get(`${API_ENDPOINTS.DABOARD_NEWS}?page=1&limit=10`);
        return response.data.data;
    }
    catch (error){
        console.error(" Có lỗi xảy ra khi gọi API:", error);
        throw error;
    }
} 