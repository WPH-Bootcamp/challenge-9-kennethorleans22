import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import bxs_tv from '@/assets/bxs_tv.svg';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function DesktopSearchForm({
  defaultValue,
  onSearch,
  onClear,
}: {
  defaultValue: string;
  onSearch: (query: string) => void;
  onClear: () => void;
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) onSearch(value.trim());
      }}
      className="hidden md:flex items-center gap-2 px-4 h-14 w-[243px] bg-[rgba(10,13,18,0.6)] border border-[#252B37] backdrop-blur-[20px] rounded-2xl"
    >
      <Search className="w-6 h-6 text-[#717680] shrink-0" />
      <Input
        type="text"
        placeholder="Search Movie"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-transparent text-[#717680] placeholder:text-[#717680] text-base border-0 h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            setValue('');
            onClear();
          }}
          className="shrink-0 w-5 h-5 rounded-full bg-[#414651] flex items-center justify-center"
        >
          <X className="w-3 h-3 text-white" />
        </button>
      )}
    </form>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Derive langsung dari URL — tidak perlu state
  const urlQuery =
    location.pathname === '/search'
      ? (new URLSearchParams(location.search).get('q') ?? '')
      : '';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'flex items-center justify-between',
          'transition-all duration-300',
          'px-4 h-16 md:px-[140px] md:h-[90px]',
          isScrolled && 'bg-[rgba(10,13,18,0.6)] backdrop-blur-[20px]'
        )}
      >
        <div className="flex items-center gap-[80px]">
          <Link to="/" className="flex items-center gap-[7.11px]">
            <img src={bxs_tv} alt="Movie Logo" className="w-7 h-7 md:w-10 md:h-10 object-contain" />
            <span className="font-semibold text-[19.9px] md:text-[28.4px] tracking-[-0.04em] text-[#FDFDFD]">
              Movie
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-12">
            <Link to="/" className="text-white text-base py-2">Home</Link>
            <Link to="/favorites" className="text-white text-base py-2">Favorites</Link>
          </nav>
        </div>

        {/* key={urlQuery}  */}
        <DesktopSearchForm
          key={urlQuery}
          defaultValue={urlQuery}
          onSearch={(q) => navigate(`/search?q=${encodeURIComponent(q)}`)}
          onClear={() => navigate('/search')}
        />

        {/* Mobile: Search + Hamburger */}
        <div className="flex md:hidden items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/search')}
            className="text-[#FDFDFD] hover:bg-transparent hover:text-[#FDFDFD] w-6 h-6"
          >
            <Search className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(true)}
            className="text-[#FDFDFD] hover:bg-transparent hover:text-[#FDFDFD] w-6 h-6"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black md:hidden">
          <div className="flex items-center justify-between px-4 h-16">
            <div className="flex items-center gap-1">
              <img src={bxs_tv} alt="Movie Logo" className="w-7 h-7 object-contain" />
              <span className="font-semibold text-[19.9px] tracking-[-0.04em] text-[#FDFDFD]">Movie</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:bg-transparent hover:text-white w-6 h-6"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          <nav className="absolute left-4 top-[88px] flex flex-col gap-4">
            <Link to="/" className="text-white text-base px-2 py-2" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/favorites" className="text-white text-base px-2 py-2" onClick={() => setMenuOpen(false)}>Favorites</Link>
          </nav>
        </div>
      )}
    </>
  );
}