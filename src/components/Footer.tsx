import bxs_tv from '@/assets/bxs_tv.svg';

export default function Footer() {
  return (
    <footer className="
      h-[120px]
      flex flex-col md:flex-row
      items-start md:items-center
      px-4 py-6 md:px-[140px] md:py-2
      gap-2
      border-t border-[#252B37]
      bg-black
    ">
      {/* Logo */}
      <div className="flex items-center gap-1 md:gap-[7.11px]">
        <img
          src={bxs_tv}
          alt="Movie Logo"
          className="w-7 h-7 md:w-10 md:h-10 object-contain"
        />
        <span className="font-semibold text-[19.9px] md:text-[28.4px] tracking-[-0.04em] text-[#FDFDFD]">
          Movie
        </span>
      </div>

      {/* Copyright */}
      <p className="text-[12px] md:text-[16px] leading-[24px] md:leading-[30px] text-[#535862] md:flex-1 md:text-right">
        Copyright ©2025 Movie Explorer
      </p>
    </footer>
  );
}