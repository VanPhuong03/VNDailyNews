import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home/Home"
import Category from './pages/Category/Category';
import Tag from "./pages/Tag/Tag"
import Search from './pages/Search/Search';
import NewsDetailPage from './pages/NewsDetail/NewsDetailPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
function App() {
  return (
   <div>
    <Router>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/categories/:id' element={<Category/>}/>
        <Route path='/categories/:tagId' element={<Tag/>}/>
        <Route path='/newsdetail/:id' element={<NewsDetailPage/>}/>
        <Route path='/search' element={<Search/>}/>
      </Routes>
      <Footer/>
    </Router>

   </div>
  );
}

export default App;
