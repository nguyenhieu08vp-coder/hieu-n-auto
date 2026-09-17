import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Wrench,
  ChevronRight
} from 'lucide-react';
import { PageId } from '../types';
import { COMPANY_INFO, FORMAT_CURRENCY } from '../data/mockData';

interface HeaderProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  cartCount: number;
  cartTotal: number;
  openCart: () => void;
  openConsultation: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  cartCount,
  cartTotal,
  openCart,
  openConsultation,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const navItems: { id: PageId; label: string; tag?: string }[] = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'about', label: 'Giới Thiệu' },
    { id: 'products', label: 'Sản Phẩm & Dịch Vụ', tag: 'Hot' },
    { id: 'blog', label: 'Tin Tức & Cẩm Nang' },
    { id: 'contact', label: 'Liên Hệ' },
  ];

  const handleNavClick = (page: PageId) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage('products');
      setShowSearchModal(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/90 border-b border-slate-800/80 transition-all duration-300">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-purple-950/80 border-b border-slate-800/50 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-slate-300">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Chuyên gia nâng cấp &amp; thi công nội thất ô tô chuẩn Zin 100%
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              Bảo hành chính hãng điện tử
            </span>
          </div>

          <div className="flex items-center space-x-5 text-slate-300">
            <span className="flex items-center gap-1 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              Hà Nội (Hỗ trợ lắp đặt miễn phí khu vực nội thành Hà Nội)
            </span>
            <a 
              href={`tel:${COMPANY_INFO.hotline}`} 
              className="flex items-center gap-1 font-semibold text-orange-400 hover:text-orange-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-orange-400" />
              Hotline: {COMPANY_INFO.hotline}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 via-sky-500 to-purple-600 p-[2px] shadow-lg shadow-emerald-500/20 group-hover:shadow-purple-500/30 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Wrench className="w-6 h-6 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight text-white font-['Space_Grotesk']">
                  HIEU N <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-orange-400 bg-clip-text text-transparent">AUTO</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 hidden sm:inline-block">
                  Luxury
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Nội Thất &amp; Nâng Cấp Ô Tô Chuyên Nghiệp
              </p>
            </div>
          </button>

          {/* Desktop Menu Navigation with Smooth Layout Animation Glider */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-slate-800/90 rounded-xl border border-slate-700/80 shadow-inner"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    >
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-emerald-400 via-sky-400 to-purple-500 rounded-full" />
                    </motion.div>
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.label}
                    {item.tag && (
                      <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                        {item.tag}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons: Search, Cart, Consultation */}
          <div className="flex items-center space-x-3">
            {/* Search Trigger Button */}
            <motion.button
              id="header-search-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSearchModal(true)}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
              title="Tìm kiếm sản phẩm"
            >
              <Search className="w-4 h-4" />
            </motion.button>

            {/* Shopping Cart Button */}
            <motion.button
              id="header-cart-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={openCart}
              className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white transition-all group"
              title="Giỏ hàng"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.4, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <div className="hidden xl:flex flex-col text-left text-xs">
                <span className="text-slate-400 text-[10px] leading-tight">Giỏ hàng</span>
                <span className="font-bold text-emerald-400 leading-tight">
                  {cartTotal > 0 ? FORMAT_CURRENCY(cartTotal) : '0 ₫'}
                </span>
              </div>
            </motion.button>

            {/* CTA Consultation Button */}
            <motion.button
              id="header-consult-btn"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={openConsultation}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-500 hover:from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Nhận Tư Vấn</span>
            </motion.button>

            {/* Mobile Hamburger Button */}
            <button
              id="header-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Drawer Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 backdrop-blur-2xl"
          >
            {/* Search box for mobile */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm bọc ghế, thảm sàn 360, màn hình..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </form>

            <div className="space-y-1 pt-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-left transition-colors ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-emerald-500/20 to-purple-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.label}</span>
                    {item.tag && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-orange-500 text-white">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openConsultation();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30"
              >
                <Phone className="w-4 h-4" />
                Nhận Tư Vấn &amp; Báo Giá Miễn Phí
              </button>
              <a
                href={`tel:${COMPANY_INFO.hotline}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold bg-slate-900 text-slate-200 border border-slate-800 text-sm"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                Gọi Hotline: {COMPANY_INFO.hotline}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Quick Search Modal with AnimatePresence */}
      <AnimatePresence>
        {showSearchModal && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowSearchModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl p-6 relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowSearchModal(false)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Search className="w-5 h-5 text-emerald-400" />
                Tìm kiếm sản phẩm hoặc dịch vụ
              </h3>

              <form onSubmit={handleSearchSubmit} className="relative mb-4">
                <input
                  type="text"
                  autoFocus
                  placeholder="Nhập tên sản phẩm (ví dụ: ghế da Nappa, thảm 360, màn hình Android, trần sao...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-24 py-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Tìm kiếm
                </button>
              </form>

              <div className="flex flex-wrap gap-2 text-xs text-slate-400 items-center">
                <span>Gợi ý phổ biến:</span>
                {['Ghế da Nappa', 'Thảm sàn 360', 'Màn hình 2K', 'Trần sao Rolls-Royce', 'LED viền 64 màu', 'Vô lăng carbon'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSearchQuery(item);
                      setCurrentPage('products');
                      setShowSearchModal(false);
                    }}
                    className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
