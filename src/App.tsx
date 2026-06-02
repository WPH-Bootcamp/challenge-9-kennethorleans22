import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HomePage from '@/pages/HomePage';

// TODO: Setup routing dengan React Router
// TODO: Implement layout structure
// TODO: Add navigation between pages



// TODO: Setup routing dengan React Router
// TODO: Implement layout structure
// TODO: Add navigation between pages

function App() {
  return (
    <BrowserRouter>
      {/* TODO: Add navigation menu */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<div>Detail Page — coming soon</div>} />
        <Route path="/favorites" element={<div>Favorites Page — coming soon</div>} />
        <Route path="/search" element={<div>Search Page — coming soon</div>} />
        <Route path="*" element={<div>404 - Halaman tidak ditemukan</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;