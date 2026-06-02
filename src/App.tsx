import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import MovieDetailPage from '@/pages/MovieDetailPage';
import FavoritesPage from '@/pages/FavoritesPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<div>Search Page — coming soon</div>} />
        <Route path="*" element={<div>404 - Halaman tidak ditemukan</div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;