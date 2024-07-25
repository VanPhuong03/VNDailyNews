import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Category from "./pages/Category/Category";
import Search from "./pages/Search/Search";
import NewsDetailPage from "./pages/NewsDetail/NewsDetailPage";
import TagPage from "./pages/Tag/TagPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorys/:id" element={<Category />} />
          <Route path="/tags/:id" element={<TagPage />} />
          <Route path="/newsdetail/:id" element={<NewsDetailPage />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
