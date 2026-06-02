import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import bxs_tv from '@/assets/bxs_tv.svg'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* Navbar utama */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'flex items-center justify-between',
          'transition-all duration-300',
          'px-4 h-16 md:px-[140px] md:h-[90px]',
          isScrolled && 'bg-[rgba(10,13,18,0.6)] backdrop-blur-[20px]'
        )}
      >
   {/* Frame 9 — Logo + Nav */}
<div className="flex items-center gap-[80px]">
  <Link to="/" className="flex items-center gap-[7.11px]">
    <img 
      src={bxs_tv} 
      alt="Movie Logo" 
      className="w-7 h-7 md:w-10 md:h-10 object-contain" 
    />
    <span className="font-semibold text-[19.9px] md:text-[28.4px] tracking-[-0.04em] text-[#FDFDFD]">
      Movie
    </span>
  </Link>
  <nav className="hidden md:flex items-center gap-12">
    <Link to="/" className="text-white text-base py-2">Home</Link>
    <Link to="/favorites" className="text-white text-base py-2">Favorites</Link>
  </nav>
</div>

        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center gap-2 px-4 h-14 w-[243px] bg-[rgba(10,13,18,0.6)] border border-[#252B37] backdrop-blur-[20px] rounded-2xl"
        >
          <Search className="w-6 h-6 text-[#717680] shrink-0" />
          <input
            type="text"
            placeholder="Search Movie"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-[#717680] placeholder:text-[#717680] text-base outline-none w-full"
          />
        </form>

        {/* Mobile: Search + Hamburger */}
        <div className="flex md:hidden items-center gap-6">
          <button onClick={() => navigate('/search')}>
            <Search className="w-6 h-6 text-[#FDFDFD]" />
          </button>
          <button onClick={() => setMenuOpen(true)}>
            <Menu className="w-6 h-6 text-[#FDFDFD]" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black md:hidden">
          {/* Header dalam menu */}
          <div className="flex items-center justify-between px-4 h-16">
            <div className="flex items-center gap-1">
        <img 
      src={bxs_tv} 
      alt="Movie Logo" 
      className="w-7 h-7 object-contain" 
    />
              <span className="font-semibold text-[19.9px] tracking-[-0.04em] text-[#FDFDFD]">
                Movie
              </span>
            </div>
            <button onClick={() => setMenuOpen(false)}>
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="absolute left-4 top-[88px] flex flex-col gap-4">
            <Link
              to="/"
              className="text-white text-base px-2 py-2"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className="text-white text-base px-2 py-2"
              onClick={() => setMenuOpen(false)}
            >
              Favorites
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}