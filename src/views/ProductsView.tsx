import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Search, 
  RotateCcw, 
  Grid2X2, 
  List,
  Table as TableIcon,
  SlidersHorizontal, 
  X, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Product, FilterState } from '../types';
import { PRODUCTS, CATEGORIES, FORMAT_CURRENCY } from '../data/mockData';
import { ProductListItem } from '../components/ProductListItem';
import { ProductCompactCard } from '../components/ProductCompactCard';
import { ProductTableView } from '../components/ProductTableView';

type ViewMode = 'grid-compact' | 'list' | 'table';

interface ProductsViewProps {
  onAddToCart: (product: Product, selectedColor?: string) => void;
  onQuickView: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  onAddToCart,
  onQuickView,
  searchQuery,
  setSearchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [vehicleType, setVehicleType] = useState<string>('all');
  const [materialFilter, setMaterialFilter] = useState<string>('all');
  const [colorFilter, setColorFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('featured');
  const [showMobileFilterDrawer, setShowMobileFilterDrawer] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid-compact');

  // Price range definitions
  const priceRanges = [
    { id: 'all', label: 'Tất cả khoảng giá' },
    { id: 'under-2m', label: 'Dưới 2.000.000 ₫' },
    { id: '2m-5m', label: '2.000.000 ₫ - 5.000.000 ₫' },
    { id: '5m-15m', label: '5.000.000 ₫ - 15.000.000 ₫' },
    { id: 'above-15m', label: 'Trên 15.000.000 ₫' },
  ];

  // Materials list
  const materialsList = [
    { id: 'all', label: 'Tất cả chất liệu' },
    { id: 'Da Nappa', label: 'Da Nappa Ý Cao Cấp' },
    { id: 'Da Microfiber', label: 'Da Microfiber Chống Trầy' },
    { id: 'Carbon', label: 'Sợi Carbon Fiber Thật' },
    { id: 'Alcantara', label: 'Da Lộn Alcantara' },
  ];

  // Colors list
  const colorsList = [
    { id: 'all', label: 'Tất cả màu', hex: '#ffffff' },
    { id: 'Nâu', label: 'Nâu Da Bò / Nâu Hermes', hex: '#8B4513' },
    { id: 'Đen', label: 'Đen Thể Thao / Chỉ Đỏ', hex: '#18181B' },
    { id: 'Kem', label: 'Kem Sữa Maybach', hex: '#FDFBF7' },
    { id: 'Xanh', label: 'Xanh Navy / Đa Sắc', hex: '#1E3A8A' },
  ];

  // Vehicle types
  const vehicleTypesList = [
    { id: 'all', label: 'Tất cả dòng xe' },
    { id: 'sedan', label: 'Sedan 4-5 Chỗ' },
    { id: 'suv', label: 'SUV / CUV 5-7 Chỗ' },
    { id: 'mpv', label: 'MPV / Bán Tải 7 Chỗ' },
    { id: 'luxury', label: 'Xe Sang / VIP Limousine' },
  ];

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setPriceRange('all');
    setVehicleType('all');
    setMaterialFilter('all');
    setColorFilter('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Search keyword filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCat = product.categoryName.toLowerCase().includes(q);
        const matchesMat = product.materials.some((m) => m.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesMat) {
          return false;
        }
      }

      // Price range filter
      if (priceRange === 'under-2m' && product.price >= 2000000) return false;
      if (priceRange === '2m-5m' && (product.price < 2000000 || product.price > 5000000)) return false;
      if (priceRange === '5m-15m' && (product.price < 5000000 || product.price > 15000000)) return false;
      if (priceRange === 'above-15m' && product.price <= 15000000) return false;

      // Vehicle type filter
      if (vehicleType !== 'all' && !product.vehicleTypes.includes(vehicleType as any)) {
        return false;
      }

      // Material filter
      if (materialFilter !== 'all' && !product.materials.some((m) => m.toLowerCase().includes(materialFilter.toLowerCase()))) {
        return false;
      }

      // Color filter
      if (colorFilter !== 'all') {
        const hasColor = product.colors.some((c) => c.name.toLowerCase().includes(colorFilter.toLowerCase()));
        if (!hasColor) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') {
        const discA = a.originalPrice ? a.originalPrice - a.price : 0;
        const discB = b.originalPrice ? b.originalPrice - b.price : 0;
        return discB - discA;
      }
      return 0; // default featured
    });
  }, [selectedCategory, searchQuery, priceRange, vehicleType, materialFilter, colorFilter, sortBy]);

  const activeFiltersCount = [
    selectedCategory !== 'all',
    priceRange !== 'all',
    vehicleType !== 'all',
    materialFilter !== 'all',
    colorFilter !== 'all',
    searchQuery.trim() !== '',
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-16">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Danh Mục Đa Dạng
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Sản Phẩm &amp; Dịch Vụ Nội Thất Ô Tô
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Hiển thị <strong className="text-emerald-400">{filteredProducts.length}</strong> sản phẩm nâng cấp nội thất chính hãng cao cấp
          </p>
        </div>

        {/* Mobile Filter Trigger Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            id="mobile-open-filter-btn"
            onClick={() => setShowMobileFilterDrawer(true)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold"
          >
            <Filter className="w-4 h-4 text-emerald-400" />
            <span>Bộ Lọc Sản Phẩm ({activeFiltersCount})</span>
          </button>
        </div>
      </div>

      {/* 2-COLUMN LAYOUT AS REQUIRED: LEFT = FILTER SIDEBAR, RIGHT = PRODUCT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ================= LEFT COLUMN: FILTER SIDEBAR ================= */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-28 bg-slate-900/70 backdrop-blur-md p-5 rounded-3xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <Filter className="w-4 h-4 text-emerald-400" />
              <span>Bộ Lọc Nâng Cao</span>
            </div>
            {activeFiltersCount > 0 && (
              <button
                id="sidebar-reset-filter-btn"
                onClick={handleResetFilters}
                className="text-[11px] font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Đặt lại</span>
              </button>
            )}
          </div>

          {/* 1. Search Box */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Tìm theo từ khóa
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Tên sản phẩm, dòng xe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* 2. Filter theo Danh mục (Category) */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Danh Mục Sản Phẩm
            </label>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    selectedCategory === cat.id ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {cat.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Filter theo Khoảng giá (Price Range) */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Khoảng Giá (VND)
            </label>
            <div className="space-y-1">
              {priceRanges.map((pr) => (
                <label
                  key={pr.id}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-800/50 cursor-pointer text-xs text-slate-300"
                >
                  <input
                    type="radio"
                    name="price-range-group"
                    checked={priceRange === pr.id}
                    onChange={() => setPriceRange(pr.id)}
                    className="accent-emerald-500"
                  />
                  <span>{pr.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Filter theo Phân khúc Dòng xe (Vehicle Type) */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Phân Khúc Xe
            </label>
            <div className="space-y-1">
              {vehicleTypesList.map((vt) => (
                <button
                  key={vt.id}
                  type="button"
                  onClick={() => setVehicleType(vt.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    vehicleType === vt.id
                      ? 'bg-purple-950/50 text-purple-300 border border-purple-500/40 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {vt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Filter theo Màu sắc & Chất liệu */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Tone Màu Nội Thất
            </label>
            <div className="flex flex-wrap gap-2">
              {colorsList.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColorFilter(c.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] transition-all ${
                    colorFilter === c.id
                      ? 'border-emerald-400 bg-emerald-950/60 text-emerald-300 font-bold'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-slate-700"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.label.split('/')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ================= RIGHT COLUMN: PRODUCT GRID ================= */}
        <main className="lg:col-span-9 space-y-6">
          {/* Top Sort & Grid View Switcher Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <span>Sắp xếp theo:</span>
              <select
                id="product-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="featured">Nổi bật nhất</option>
                <option value="price-asc">Giá thấp đến cao</option>
                <option value="price-desc">Giá cao đến thấp</option>
                <option value="rating">Đánh giá cao nhất (5.0★)</option>
                <option value="discount">Khuyến mãi nhiều nhất</option>
              </select>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
              <span className="text-slate-400 hidden sm:inline font-medium">Chế độ xem:</span>
              <div className="flex items-center border border-slate-700 rounded-xl overflow-hidden bg-slate-950 p-0.5">
                <button
                  type="button"
                  id="view-mode-compact-btn"
                  onClick={() => setViewMode('grid-compact')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'grid-compact'
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                  title="Chế độ Lưới Nhỏ Gọn"
                >
                  <Grid2X2 className="w-3.5 h-3.5" />
                  <span>Nhỏ Gọn</span>
                </button>

                <button
                  type="button"
                  id="view-mode-list-btn"
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'list'
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                  title="Chế độ Danh Sách Chi Tiết"
                >
                  <List className="w-3.5 h-3.5" />
                  <span>Danh Sách</span>
                </button>

                <button
                  type="button"
                  id="view-mode-table-btn"
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'table'
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                  title="Chế độ Bảng Biểu Báo Giá"
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Bảng Biểu</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active filter badges */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Đang lọc theo:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                  Danh mục: {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                  <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSelectedCategory('all')} />
                </span>
              )}
              {priceRange !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-950/60 border border-orange-500/30 text-orange-300">
                  {priceRanges.find(p => p.id === priceRange)?.label}
                  <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setPriceRange('all')} />
                </span>
              )}
              {vehicleType !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-300">
                  Xe: {vehicleTypesList.find(v => v.id === vehicleType)?.label}
                  <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setVehicleType('all')} />
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-950/60 border border-sky-500/30 text-sky-300">
                  Từ khóa: "{searchQuery}"
                  <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSearchQuery('')} />
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-slate-400 hover:text-rose-400 underline ml-2 cursor-pointer"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          )}

          {/* Product Grid (3 or 4 Columns Responsive) as explicitly requested */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 text-slate-500 mx-auto flex items-center justify-center">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Không tìm thấy sản phẩm phù hợp</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Không có sản phẩm nào khớp với bộ lọc hoặc từ khóa hiện tại. Hãy thử thay đổi khoảng giá hoặc danh mục.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors cursor-pointer"
              >
                Xóa Bộ Lọc &amp; Xem Lại Tất Cả
              </button>
            </div>
          ) : viewMode === 'table' ? (
            <ProductTableView
              products={filteredProducts}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ) : viewMode === 'list' ? (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <ProductListItem
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3.5 sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCompactCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Slide-over Drawer */}
      {showMobileFilterDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm lg:hidden animate-in fade-in">
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-slate-900 border-l border-slate-800 p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2 font-bold text-white text-base">
                    <Filter className="w-5 h-5 text-emerald-400" />
                    <span>Bộ Lọc Sản Phẩm</span>
                  </div>
                  <button
                    onClick={() => setShowMobileFilterDrawer(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Categories */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Danh Mục
                  </label>
                  <div className="space-y-1">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium ${
                          selectedCategory === cat.id
                            ? 'bg-emerald-500 text-slate-950 font-bold'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Price */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Khoảng Giá
                  </label>
                  <div className="space-y-1">
                    {priceRanges.map((pr) => (
                      <label key={pr.id} className="flex items-center gap-2 text-xs text-slate-300 py-1">
                        <input
                          type="radio"
                          name="mobile-price"
                          checked={priceRange === pr.id}
                          onChange={() => setPriceRange(pr.id)}
                          className="accent-emerald-500"
                        />
                        <span>{pr.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 flex gap-2">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="w-1/3 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
                >
                  Đặt Lại
                </button>
                <button
                  type="button"
                  onClick={() => setShowMobileFilterDrawer(false)}
                  className="w-2/3 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
                >
                  Xem {filteredProducts.length} Sản Phẩm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
