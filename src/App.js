import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@pages/Home/Home";
import Category from "@pages/Category/Category";
import Search from "@pages/Search/Search";
import NewsDetailPage from "@pages/NewsDetail/NewsDetailPage";
import TagPage from "@pages/Tag/TagPage";
import LatestNews from "./pages/LatestNews/LatestNews";
import RecommendedNews from "./pages/RecommenedNews/RecommenedNews";
import NavBar from "@components/Layout/Header/NavBar";
import HeaderTop from "@components/Layout/Header/HeaderTop";
import Footer from "@components/Layout/Footer/Footer";
import { SearchProvider } from "./components/SearchContext";
import { MenuProvider } from "./components/MenuContext";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
function App() {
  return (
    <div className="page-container">
      <MenuProvider>
        <SearchProvider>
          <Router>
            <HeaderTop />
            <NavBar />
            <div className="content-wrap">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categorys/:id" element={<Category />} />
                <Route path="/tags/:id" element={<TagPage />} />
                <Route path="/newsdetail/:id" element={<NewsDetailPage />} />
                <Route path="/search" element={<Search />} />
                <Route path="/latestnews" element={<LatestNews />} />
                <Route path="/recommendednews" element={<RecommendedNews />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
            <Footer />
          </Router>
        </SearchProvider>
      </MenuProvider>
    </div>
  );
}

export default App;
