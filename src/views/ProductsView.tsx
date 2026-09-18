import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ChevronDown,
  ChevronUp,
  Check,
  Flame,
  Star,
  ShieldCheck,
  PackageCheck,
  Car,
  Layers,
  Palette,
  Tv,
  Armchair,
  Volume2,
  Disc,
  Sliders,
  DollarSign,
  Clock,
  ArrowUpDown,
  Zap,
  ShieldAlert,
  Video,
  Wifi,
  Mic,
  Sun,
  Droplets
} from 'lucide-react';
import { Product } from '../types';
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
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [customMinPrice, setCustomMinPrice] = useState<string>('');
  const [customMaxPrice, setCustomMaxPrice] = useState<string>('');
  const [appliedCustomPrice, setAppliedCustomPrice] = useState<{ min?: number; max?: number } | null>(null);
  
  const [vehicleType, setVehicleType] = useState<string>('all');
  const [usefulFilter, setUsefulFilter] = useState<string>('all');
  const [colorFilter, setColorFilter] = useState<string>('all');
  
  // Quick status toggles
  const [onlySale, setOnlySale] = useState<boolean>(false);
  const [onlyBestSeller, setOnlyBestSeller] = useState<boolean>(false);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0); // 0 = all, 4.8 = 4.8+, 5.0 = 5.0
  const [minWarranty, setMinWarranty] = useState<number>(0); // 0 = all, 24 = 24m+

  // Sort & View Modes
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount' | 'installation'>('featured');
  const [viewMode, setViewMode] = useState<ViewMode>('grid-compact');
  const [showMobileFilterDrawer, setShowMobileFilterDrawer] = useState(false);

  // Accordion collapse state for sidebar sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    categories: true,
    price: true,
    vehicle: true,
    status: true,
    useful: true,
    color: false,
    rating: false,
  });

  const toggleSection = (sectionKey: string) => {
    setOpenSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  // Price range definitions
  const priceRanges = [
    { id: 'all', label: 'Tất cả khoảng giá', min: 0, max: Infinity },
    { id: 'under-2m', label: 'Dưới 2.000.000 ₫', min: 0, max: 2000000 },
    { id: '2m-5m', label: '2.000.000 ₫ - 5.000.000 ₫', min: 2000000, max: 5000000 },
    { id: '5m-15m', label: '5.000.000 ₫ - 15.000.000 ₫', min: 5000000, max: 15000000 },
    { id: 'above-15m', label: 'Trên 15.000.000 ₫', min: 15000000, max: Infinity },
  ];

  // Vehicle types
  const vehicleTypesList = [
    { id: 'all', label: 'Tất cả dòng xe' },
    { id: 'sedan', label: 'Sedan 4-5 Chỗ' },
    { id: 'suv', label: 'SUV / CUV 5-7 Chỗ' },
    { id: 'mpv', label: 'MPV / Bán Tải 7 Chỗ' },
    { id: 'luxury', label: 'Xe Sang / VIP Limousine' },
  ];

  // Curated list of practical & useful features (Tính năng hữu ích & giải quyết nhu cầu thực tế)
  const usefulFeaturesList = [
    { 
      id: 'all', 
      label: 'Tất Cả Tiện Ích', 
      tag: 'Xem toàn bộ sản phẩm',
      icon: <Sparkles className="w-3.5 h-3.5 text-emerald-400" />,
      matcher: () => true 
    },
    { 
      id: 'plug-play', 
      label: 'Cắm Giắc Zin 100%', 
      tag: 'Không cắt trích dây, an toàn đăng kiểm',
      icon: <Zap className="w-3.5 h-3.5 text-amber-400" />,
      matcher: (p: Product) => {
        const text = (p.name + ' ' + p.description + ' ' + p.features.join(' ') + ' ' + p.materials.join(' ')).toLowerCase();
        return text.includes('giắc') || text.includes('jack') || text.includes('zin') || text.includes('không cắt') || text.includes('plug') || text.includes('khuôn cắm');
      }
    },
    { 
      id: 'traffic-alert', 
      label: 'Cảnh Báo Tốc Độ & Biển Báo', 
      tag: 'Phạt nguội & camera giao thông',
      icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />,
      matcher: (p: Product) => {
        const text = (p.name + ' ' + p.description + ' ' + p.features.join(' ')).toLowerCase();
        return text.includes('tốc độ') || text.includes('phạt nguội') || text.includes('biển báo') || text.includes('adas') || text.includes('lệch làn') || text.includes('áp suất lốp') || text.includes('tpms') || text.includes('cảnh báo');
      }
    },
    { 
      id: 'night-4k', 
      label: 'Ghi Hình Đêm / 4K Siêu Nét', 
      tag: 'Sony Starvis & Tăng sáng góc rộng',
      icon: <Video className="w-3.5 h-3.5 text-sky-400" />,
      matcher: (p: Product) => {
        const text = (p.name + ' ' + p.description + ' ' + p.features.join(' ') + ' ' + p.materials.join(' ')).toLowerCase();
        return text.includes('4k') || text.includes('2k') || text.includes('ban đêm') || text.includes('đêm') || text.includes('starvis') || text.includes('sony') || text.includes('siêu nét') || text.includes('chống chói') || text.includes('tăng sáng') || text.includes('bi led') || text.includes('laser');
      }
    },
    { 
      id: 'remote-4g', 
      label: 'Kết Nối 4G & Xem Qua App', 
      tag: 'Định vị GPS & Giám sát xe từ xa 24/7',
      icon: <Wifi className="w-3.5 h-3.5 text-indigo-400" />,
      matcher: (p: Product) => {
        const text = (p.name + ' ' + p.description + ' ' + p.features.join(' ')).toLowerCase();
        return text.includes('4g') || text.includes('sim') || text.includes('gps') || text.includes('từ xa') || text.includes('app') || text.includes('điện thoại') || text.includes('bluetooth') || text.includes('giám sát') || text.includes('livestream');
      }
    },
    { 
      id: 'voice-ai', 
      label: 'Điều Khiển Giọng Nói Tiếng Việt', 
      tag: 'Trợ lý Kiki & Dẫn đường Vietmap',
      icon: <Mic className="w-3.5 h-3.5 text-emerald-400" />,
      matcher: (p: Product) => {
        const text = (p.name + ' ' + p.description + ' ' + p.features.join(' ')).toLowerCase();
        return text.includes('giọng nói') || text.includes('ra lệnh') || text.includes('kiki') || text.includes('trợ lý') || text.includes('vietmap') || text.includes('bản đồ') || text.includes('dẫn đường') || text.includes('android');
      }
    },
    { 
      id: 'heat-soundproof', 
      label: 'Chống Nóng & Cách Âm Cabin', 
      tag: 'Cản 99% UV/hồng ngoại, giảm ồn gầm',
      icon: <Sun className="w-3.5 h-3.5 text-orange-400" />,
      matcher: (p: Product) => {
        const text = (p.name + ' ' + p.description + ' ' + p.features.join(' ') + ' ' + p.materials.join(' ')).toLowerCase();
        return text.includes('cách nhiệt') || text.includes('cách âm') || text.includes('chống nóng') || text.includes('hồng ngoại') || text.includes('tia uv') || text.includes('tiêu âm') || text.includes('3m') || text.includes('crystalline');
      }
    },
    { 
      id: 'waterproof-clean', 
      label: 'Chống Thấm & Dễ Vệ Sinh', 
      tag: 'Không mùi, kháng khuẩn, chống trầy',
      icon: <Droplets className="w-3.5 h-3.5 text-cyan-400" />,
      matcher: (p: Product) => {
        const text = (p.name + ' ' + p.description + ' ' + p.features.join(' ') + ' ' + p.materials.join(' ')).toLowerCase();
        return text.includes('chống nước') || text.includes('chống thấm') || text.includes('dễ vệ sinh') || text.includes('chống tràn') || text.includes('không mùi') || text.includes('chống trầy') || text.includes('lau chùi') || text.includes('tpe') || text.includes('nappa') || text.includes('microfiber');
      }
    },
    { 
      id: 'fast-install', 
      label: 'Lắp Nhanh Dưới 2 Giờ', 
      tag: 'Thi công lấy xe ngay trong ngày',
      icon: <Clock className="w-3.5 h-3.5 text-teal-400" />,
      matcher: (p: Product) => p.installationTimeHours <= 2
    },
  ];

  // Colors list with representative dots
  const colorsList = [
    { id: 'all', label: 'Tất cả màu', hex: '#ffffff' },
    { id: 'Đen', label: 'Đen Thể Thao / Mờ', hex: '#18181B' },
    { id: 'Nâu', label: 'Nâu Da Bò / Hermes', hex: '#8B4513' },
    { id: 'Kem', label: 'Kem Maybach / Sữa', hex: '#F5EBE0' },
    { id: 'Xanh', label: 'Xanh Navy / Đa Sắc', hex: '#1E3A8A' },
  ];

  // Apply custom price filter
  const handleApplyCustomPrice = () => {
    const min = customMinPrice.trim() ? parseFloat(customMinPrice.replace(/\D/g, '')) : undefined;
    const max = customMaxPrice.trim() ? parseFloat(customMaxPrice.replace(/\D/g, '')) : undefined;
    if (min !== undefined || max !== undefined) {
      setAppliedCustomPrice({ min, max });
      setPriceRange('custom');
    }
  };

  // Reset custom price
  const handleClearCustomPrice = () => {
    setCustomMinPrice('');
    setCustomMaxPrice('');
    setAppliedCustomPrice(null);
    setPriceRange('all');
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setPriceRange('all');
    setCustomMinPrice('');
    setCustomMaxPrice('');
    setAppliedCustomPrice(null);
    setVehicleType('all');
    setUsefulFilter('all');
    setColorFilter('all');
    setOnlySale(false);
    setOnlyBestSeller(false);
    setOnlyInStock(false);
    setMinRating(0);
    setMinWarranty(0);
    setSearchQuery('');
    setSortBy('featured');
  };

  // Helper to get category icon component
  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'dashcams-tpms':
        return <ShieldCheck className="w-4 h-4" />;
      case 'screens-cams':
        return <Tv className="w-4 h-4" />;
      case 'ambient-lights':
        return <Sparkles className="w-4 h-4" />;
      case 'seat-covers':
        return <Armchair className="w-4 h-4" />;
      case 'floor-mats':
        return <Layers className="w-4 h-4" />;
      case 'car-audio':
        return <Volume2 className="w-4 h-4" />;
      case 'steering-accessories':
        return <Sliders className="w-4 h-4" />;
      case 'wheels-exterior':
        return <Disc className="w-4 h-4" />;
      default:
        return <Grid2X2 className="w-4 h-4" />;
    }
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
        const matchesFeature = product.features.some((f) => f.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesMat && !matchesFeature) {
          return false;
        }
      }

      // Price filter (Preset or Custom)
      if (priceRange === 'custom' && appliedCustomPrice) {
        if (appliedCustomPrice.min !== undefined && product.price < appliedCustomPrice.min) return false;
        if (appliedCustomPrice.max !== undefined && product.price > appliedCustomPrice.max) return false;
      } else if (priceRange !== 'all') {
        const pr = priceRanges.find(p => p.id === priceRange);
        if (pr) {
          if (product.price < pr.min || product.price >= pr.max) return false;
        }
      }

      // Vehicle type filter
      if (vehicleType !== 'all' && !product.vehicleTypes.includes(vehicleType as any)) {
        return false;
      }

      // Status toggles
      if (onlySale && !product.isSale) return false;
      if (onlyBestSeller && !product.isBestSeller) return false;
      if (onlyInStock && !product.inStock) return false;

      // Rating filter
      if (minRating > 0 && product.rating < minRating) return false;

      // Warranty filter
      if (minWarranty > 0 && product.warrantyMonths < minWarranty) return false;

      // Useful feature / Practical utility filter
      if (usefulFilter !== 'all') {
        const selectedFeature = usefulFeaturesList.find(u => u.id === usefulFilter);
        if (selectedFeature && selectedFeature.matcher && !selectedFeature.matcher(product)) {
          return false;
        }
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
        const discA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) : 0;
        const discB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) : 0;
        return discB - discA;
      }
      if (sortBy === 'installation') {
        return a.installationTimeHours - b.installationTimeHours;
      }
      return 0; // default featured
    });
  }, [
    selectedCategory, 
    searchQuery, 
    priceRange, 
    appliedCustomPrice, 
    vehicleType, 
    onlySale, 
    onlyBestSeller, 
    onlyInStock, 
    minRating, 
    minWarranty, 
    usefulFilter, 
    colorFilter, 
    sortBy
  ]);

  // Calculate dynamic counts for filters (based on current category & search, or global)
  const filterCounts = useMemo(() => {
    return {
      total: PRODUCTS.length,
      sale: PRODUCTS.filter(p => p.isSale).length,
      bestSeller: PRODUCTS.filter(p => p.isBestSeller).length,
      inStock: PRODUCTS.filter(p => p.inStock).length,
      sedan: PRODUCTS.filter(p => p.vehicleTypes.includes('sedan')).length,
      suv: PRODUCTS.filter(p => p.vehicleTypes.includes('suv')).length,
      mpv: PRODUCTS.filter(p => p.vehicleTypes.includes('mpv')).length,
      luxury: PRODUCTS.filter(p => p.vehicleTypes.includes('luxury')).length,
      under2m: PRODUCTS.filter(p => p.price < 2000000).length,
      from2mTo5m: PRODUCTS.filter(p => p.price >= 2000000 && p.price < 5000000).length,
      from5mTo15m: PRODUCTS.filter(p => p.price >= 5000000 && p.price < 15000000).length,
      above15m: PRODUCTS.filter(p => p.price >= 15000000).length,
      highRating: PRODUCTS.filter(p => p.rating >= 4.8).length,
      warranty24: PRODUCTS.filter(p => p.warrantyMonths >= 24).length,
    };
  }, []);

  // Active filters count for badge indicator
  const activeFiltersCount = [
    selectedCategory !== 'all',
    priceRange !== 'all',
    vehicleType !== 'all',
    usefulFilter !== 'all',
    colorFilter !== 'all',
    onlySale,
    onlyBestSeller,
    onlyInStock,
    minRating > 0,
    minWarranty > 0,
    searchQuery.trim() !== '',
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-16">
      
      {/* 1. Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5"
      >
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Nâng Tầm Khoang Lái Ô Tô
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Sản Phẩm &amp; Dịch Vụ Độ Xe Chính Hãng
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Hiển thị <strong className="text-emerald-400 font-bold">{filteredProducts.length}</strong> / {PRODUCTS.length} sản phẩm và gói nâng cấp tương thích hoàn hảo
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            id="mobile-open-filter-btn"
            onClick={() => setShowMobileFilterDrawer(true)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold hover:bg-slate-800 transition-colors shadow-lg"
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
            <span>Bộ Lọc Sản Phẩm</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 text-[11px] font-extrabold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </motion.div>

      {/* 2. Top Quick Filter Chips (Lọc Nhanh 1 Chạm) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs"
      >
        <button
          onClick={() => {
            setSelectedCategory('all');
            setOnlySale(false);
            setOnlyBestSeller(false);
            setVehicleType('all');
            setUsefulFilter('all');
          }}
          className={`px-3.5 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer font-semibold ${
            selectedCategory === 'all' && !onlySale && !onlyBestSeller && vehicleType === 'all' && usefulFilter === 'all'
              ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          Tất Cả ({filterCounts.total})
        </button>

        <button
          onClick={() => setOnlySale(prev => !prev)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer font-semibold ${
            onlySale
              ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/20'
              : 'bg-slate-900 text-rose-300 border-slate-800 hover:border-rose-500/40'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-rose-400" />
          <span>Đang Giảm Giá ({filterCounts.sale})</span>
        </button>

        <button
          onClick={() => setOnlyBestSeller(prev => !prev)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer font-semibold ${
            onlyBestSeller
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
              : 'bg-slate-900 text-amber-300 border-slate-800 hover:border-amber-500/40'
          }`}
        >
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Bán Chạy Nhất ({filterCounts.bestSeller})</span>
        </button>

        <button
          onClick={() => setOnlyInStock(prev => !prev)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer font-semibold ${
            onlyInStock
              ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/20'
              : 'bg-slate-900 text-sky-300 border-slate-800 hover:border-sky-500/40'
          }`}
        >
          <PackageCheck className="w-3.5 h-3.5 text-sky-400" />
          <span>Sẵn Hàng Lắp Ngay ({filterCounts.inStock})</span>
        </button>

        <button
          onClick={() => setVehicleType(vehicleType === 'sedan' ? 'all' : 'sedan')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer font-semibold ${
            vehicleType === 'sedan'
              ? 'bg-purple-500 text-white border-purple-400 shadow-md shadow-purple-500/20'
              : 'bg-slate-900 text-purple-300 border-slate-800 hover:border-purple-500/40'
          }`}
        >
          <Car className="w-3.5 h-3.5 text-purple-400" />
          <span>Sedan ({filterCounts.sedan})</span>
        </button>

        <button
          onClick={() => setVehicleType(vehicleType === 'suv' ? 'all' : 'suv')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer font-semibold ${
            vehicleType === 'suv'
              ? 'bg-purple-500 text-white border-purple-400 shadow-md shadow-purple-500/20'
              : 'bg-slate-900 text-purple-300 border-slate-800 hover:border-purple-500/40'
          }`}
        >
          <Car className="w-3.5 h-3.5 text-purple-400" />
          <span>SUV / CUV ({filterCounts.suv})</span>
        </button>

        <button
          onClick={() => setSelectedCategory(selectedCategory === 'dashcams-tpms' ? 'all' : 'dashcams-tpms')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer font-semibold ${
            selectedCategory === 'dashcams-tpms'
              ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Camera &amp; Cảm Biến</span>
        </button>

        <button
          onClick={() => setSelectedCategory(selectedCategory === 'ambient-lights' ? 'all' : 'ambient-lights')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer font-semibold ${
            selectedCategory === 'ambient-lights'
              ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>Đèn LED &amp; Bi Gầm</span>
        </button>

        <button
          onClick={() => setPriceRange(priceRange === 'under-2m' ? 'all' : 'under-2m')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer font-semibold ${
            priceRange === 'under-2m'
              ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
          <span>Dưới 2 Triệu ({filterCounts.under2m})</span>
        </button>

        <button
          onClick={() => setUsefulFilter(usefulFilter === 'plug-play' ? 'all' : 'plug-play')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer font-semibold ${
            usefulFilter === 'plug-play'
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
              : 'bg-slate-900 text-amber-300 border-slate-800 hover:border-amber-500/40'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Cắm Giắc Zin ({PRODUCTS.filter(usefulFeaturesList[1].matcher).length})</span>
        </button>

        <button
          onClick={() => setUsefulFilter(usefulFilter === 'traffic-alert' ? 'all' : 'traffic-alert')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer font-semibold ${
            usefulFilter === 'traffic-alert'
              ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/20'
              : 'bg-slate-900 text-rose-300 border-slate-800 hover:border-rose-500/40'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <span>Cảnh Báo Tốc Độ ({PRODUCTS.filter(usefulFeaturesList[2].matcher).length})</span>
        </button>
      </motion.div>

      {/* 3. Main 2-Column Layout: Left = Filter Sidebar, Right = Product Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ================= LEFT COLUMN: FILTER SIDEBAR ================= */}
        <motion.aside 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.12 }}
          className="hidden lg:block lg:col-span-3 space-y-5 sticky top-28 bg-slate-900/80 backdrop-blur-md p-5 rounded-3xl border border-slate-800 shadow-xl max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-none"
        >
          {/* Sidebar Top: Title + Reset Button */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <Filter className="w-4 h-4 text-emerald-400" />
              <span>Bộ Lọc Nâng Cao</span>
            </div>
            {activeFiltersCount > 0 && (
              <button
                id="sidebar-reset-filter-btn"
                onClick={handleResetFilters}
                className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors cursor-pointer bg-orange-500/10 px-2 py-1 rounded-lg border border-orange-500/20"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Đặt lại ({activeFiltersCount})</span>
              </button>
            )}
          </div>

          {/* 1. Keyword Search */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Tìm theo từ khóa
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Tên sản phẩm, dòng xe, hãng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 text-slate-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 2. Accordion: Danh Mục Sản Phẩm (Categories) */}
          <div className="border-t border-slate-800/80 pt-3">
            <button
              onClick={() => toggleSection('categories')}
              className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 py-1 hover:text-white"
            >
              <span>Danh Mục Sản Phẩm</span>
              {openSections.categories ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>
            
            {openSections.categories && (
              <div className="space-y-1 mt-2.5">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  const count = cat.id === 'all' 
                    ? PRODUCTS.length 
                    : PRODUCTS.filter(p => p.category === cat.id).length;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`relative w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                        isActive
                          ? 'text-slate-950 font-bold bg-emerald-500 shadow-md shadow-emerald-500/20'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className={isActive ? 'text-slate-950' : 'text-emerald-400'}>
                          {getCategoryIcon(cat.id)}
                        </span>
                        <span className="truncate">{cat.name}</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 ml-1.5 ${
                        isActive ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Accordion: Khoảng Giá (Price Range) & Custom Price Input */}
          <div className="border-t border-slate-800/80 pt-3">
            <button
              onClick={() => toggleSection('price')}
              className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 py-1 hover:text-white"
            >
              <span>Khoảng Giá (VND)</span>
              {openSections.price ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {openSections.price && (
              <div className="space-y-3 mt-2.5">
                {/* Preset Radio Buttons with Counts */}
                <div className="space-y-1">
                  {priceRanges.map((pr) => {
                    const count = pr.id === 'all'
                      ? PRODUCTS.length
                      : PRODUCTS.filter(p => p.price >= pr.min && p.price < pr.max).length;

                    return (
                      <label
                        key={pr.id}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer text-xs transition-colors ${
                          priceRange === pr.id
                            ? 'bg-slate-800 text-emerald-400 font-semibold'
                            : 'text-slate-300 hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="price-range-sidebar"
                            checked={priceRange === pr.id}
                            onChange={() => {
                              setPriceRange(pr.id);
                              setAppliedCustomPrice(null);
                            }}
                            className="accent-emerald-500"
                          />
                          <span>{pr.label}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded">
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {/* Custom Min / Max Price Input */}
                <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 flex items-center justify-between">
                    <span>Tự nhập khoảng giá</span>
                    {priceRange === 'custom' && (
                      <button 
                        onClick={handleClearCustomPrice}
                        className="text-[10px] text-orange-400 hover:underline"
                      >
                        Xóa
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Từ (₫)"
                      value={customMinPrice}
                      onChange={(e) => setCustomMinPrice(e.target.value)}
                      className="w-full px-2 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                    <input
                      type="number"
                      placeholder="Đến (₫)"
                      value={customMaxPrice}
                      onChange={(e) => setCustomMaxPrice(e.target.value)}
                      className="w-full px-2 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyCustomPrice}
                    disabled={!customMinPrice && !customMaxPrice}
                    className="w-full py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Áp Dụng Khoảng Giá
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 4. Accordion: Phân Khúc Xe (Vehicle Types) */}
          <div className="border-t border-slate-800/80 pt-3">
            <button
              onClick={() => toggleSection('vehicle')}
              className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 py-1 hover:text-white"
            >
              <span>Phân Khúc Xe</span>
              {openSections.vehicle ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {openSections.vehicle && (
              <div className="space-y-1 mt-2.5">
                {vehicleTypesList.map((vt) => {
                  const isActive = vehicleType === vt.id;
                  const count = vt.id === 'all'
                    ? PRODUCTS.length
                    : PRODUCTS.filter(p => p.vehicleTypes.includes(vt.id as any)).length;

                  return (
                    <button
                      key={vt.id}
                      type="button"
                      onClick={() => setVehicleType(vt.id)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-purple-950/70 text-purple-300 border border-purple-500/40 font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                      }`}
                    >
                      <span className="truncate">{vt.label}</span>
                      <span className="text-[10px] text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 5. Accordion: Trạng Thái & Ưu Đãi (Status & Stock) */}
          <div className="border-t border-slate-800/80 pt-3">
            <button
              onClick={() => toggleSection('status')}
              className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 py-1 hover:text-white"
            >
              <span>Ưu Đãi &amp; Tình Trạng</span>
              {openSections.status ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {openSections.status && (
              <div className="space-y-2 mt-2.5 text-xs text-slate-300">
                <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={onlySale}
                      onChange={(e) => setOnlySale(e.target.checked)}
                      className="accent-rose-500 rounded"
                    />
                    <span className="text-rose-300 font-medium">🔥 Đang Giảm Giá</span>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">
                    {filterCounts.sale}
                  </span>
                </label>

                <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={onlyBestSeller}
                      onChange={(e) => setOnlyBestSeller(e.target.checked)}
                      className="accent-amber-500 rounded"
                    />
                    <span className="text-amber-300 font-medium">⭐ Bán Chạy Nhất</span>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">
                    {filterCounts.bestSeller}
                  </span>
                </label>

                <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={onlyInStock}
                      onChange={(e) => setOnlyInStock(e.target.checked)}
                      className="accent-sky-500 rounded"
                    />
                    <span className="text-sky-300 font-medium">📦 Sẵn Hàng Lắp Ngay</span>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">
                    {filterCounts.inStock}
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* 6. Accordion: Tính Năng Hữu Ích & Nhu Cầu Thực Tế */}
          <div className="border-t border-slate-800/80 pt-3">
            <button
              onClick={() => toggleSection('useful')}
              className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 py-1 hover:text-white group cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-slate-200 group-hover:text-emerald-300 transition-colors">Tính Năng Hữu Ích</span>
              </div>
              {openSections.useful ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {openSections.useful && (
              <div className="space-y-1.5 mt-2.5">
                {usefulFeaturesList.map((uf) => {
                  const isActive = usefulFilter === uf.id;
                  const count = uf.id === 'all'
                    ? PRODUCTS.length
                    : PRODUCTS.filter(uf.matcher).length;

                  return (
                    <button
                      key={uf.id}
                      type="button"
                      onClick={() => setUsefulFilter(isActive && uf.id !== 'all' ? 'all' : uf.id)}
                      className={`w-full flex items-start justify-between p-2 rounded-xl text-xs transition-all text-left cursor-pointer border ${
                        isActive
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 shadow-sm font-semibold'
                          : 'bg-slate-900/60 text-slate-300 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-start gap-2 min-w-0 pr-1">
                        <span className="mt-0.5 shrink-0">{uf.icon}</span>
                        <div className="min-w-0">
                          <div className={`truncate ${isActive ? 'text-emerald-300 font-bold' : 'text-slate-200'}`}>
                            {uf.label}
                          </div>
                          {uf.tag && (
                            <div className="text-[10px] text-slate-400 truncate mt-0.5">
                              {uf.tag}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className={`text-[10px] shrink-0 px-1.5 py-0.5 rounded font-mono font-medium ${
                        isActive 
                          ? 'bg-emerald-500 text-slate-950 font-bold' 
                          : 'text-slate-400 bg-slate-950'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 7. Accordion: Tone Màu Nội Thất (Colors) */}
          <div className="border-t border-slate-800/80 pt-3">
            <button
              onClick={() => toggleSection('color')}
              className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 py-1 hover:text-white"
            >
              <span>Tone Màu Nội Thất</span>
              {openSections.color ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {openSections.color && (
              <div className="space-y-1 mt-2.5">
                {colorsList.map((c) => {
                  const isActive = colorFilter === c.id;
                  const count = c.id === 'all'
                    ? PRODUCTS.length
                    : PRODUCTS.filter(p => p.colors.some(col => col.name.toLowerCase().includes(c.id.toLowerCase()))).length;

                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setColorFilter(c.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                        isActive
                          ? 'border-emerald-400 bg-emerald-950/60 text-emerald-300 font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full border border-slate-700 shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="truncate">{c.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 8. Accordion: Đánh Giá & Bảo Hành */}
          <div className="border-t border-slate-800/80 pt-3">
            <button
              onClick={() => toggleSection('rating')}
              className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 py-1 hover:text-white"
            >
              <span>Đánh Giá &amp; Bảo Hành</span>
              {openSections.rating ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {openSections.rating && (
              <div className="space-y-2 mt-2.5 text-xs text-slate-300">
                <button
                  type="button"
                  onClick={() => setMinRating(minRating === 4.8 ? 0 : 4.8)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    minRating === 4.8
                      ? 'bg-amber-950/70 text-amber-300 border border-amber-500/40 font-bold'
                      : 'text-slate-400 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>Từ 4.8★ trở lên</span>
                  </div>
                  <span className="text-[10px] bg-slate-950 px-1.5 py-0.5 rounded">{filterCounts.highRating}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMinWarranty(minWarranty === 24 ? 0 : 24)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    minWarranty === 24
                      ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 font-bold'
                      : 'text-slate-400 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Bảo hành 24 tháng+</span>
                  </div>
                  <span className="text-[10px] bg-slate-950 px-1.5 py-0.5 rounded">{filterCounts.warranty24}</span>
                </button>
              </div>
            )}
          </div>
        </motion.aside>

        {/* ================= RIGHT COLUMN: PRODUCT CONTENT ================= */}
        <motion.main 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.16 }}
          className="lg:col-span-9 space-y-5"
        >
          {/* Top Sort & Grid View Switcher Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs shadow-md">
            <div className="flex items-center gap-2 text-slate-400">
              <ArrowUpDown className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold text-slate-300">Sắp xếp:</span>
              <select
                id="product-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-medium focus:outline-none focus:border-emerald-500 cursor-pointer shadow-inner"
              >
                <option value="featured">✨ Nổi bật &amp; Đề xuất</option>
                <option value="price-asc">💰 Giá: Thấp đến Cao</option>
                <option value="price-desc">💎 Giá: Cao đến Thấp</option>
                <option value="rating">⭐ Đánh giá cao nhất (5.0★)</option>
                <option value="discount">🔥 Giảm giá nhiều nhất</option>
                <option value="installation">⚡ Lắp đặt nhanh nhất</option>
              </select>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
              <span className="text-slate-400 hidden sm:inline font-medium">Chế độ xem:</span>
              <div className="flex items-center border border-slate-700 rounded-xl overflow-hidden bg-slate-950 p-0.5">
                {[
                  { id: 'grid-compact', label: 'Nhỏ Gọn', icon: <Grid2X2 className="w-3.5 h-3.5" /> },
                  { id: 'list', label: 'Danh Sách', icon: <List className="w-3.5 h-3.5" /> },
                  { id: 'table', label: 'Bảng Biểu', icon: <TableIcon className="w-3.5 h-3.5" /> },
                ].map((mode) => {
                  const isActive = viewMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      id={`view-mode-${mode.id}-btn`}
                      onClick={() => setViewMode(mode.id as any)}
                      className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        isActive ? 'text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeViewModeIndicator"
                          className="absolute inset-0 bg-emerald-500 rounded-lg shadow-sm"
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5">
                        {mode.icon}
                        <span>{mode.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Filter Badges Bar */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-xs p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-slate-400 font-semibold flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
                Đang lọc ({activeFiltersCount}):
              </span>

              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-medium">
                  {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                  <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSelectedCategory('all')} />
                </span>
              )}

              {priceRange !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-950/80 border border-orange-500/40 text-orange-300 font-medium">
                  {priceRange === 'custom' && appliedCustomPrice 
                    ? `Giá: ${appliedCustomPrice.min ? FORMAT_CURRENCY(appliedCustomPrice.min) : '0 ₫'} - ${appliedCustomPrice.max ? FORMAT_CURRENCY(appliedCustomPrice.max) : 'Vô cực'}`
                    : priceRanges.find(p => p.id === priceRange)?.label}
                  <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={handleClearCustomPrice} />
                </span>
              )}

              {vehicleType !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-500/40 text-purple-300 font-medium">
                  {vehicleTypesList.find(v => v.id === vehicleType)?.label}
                  <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setVehicleType('all')} />
                </span>
              )}

              {onlySale && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-950/80 border border-rose-500/40 text-rose-300 font-medium">
                  🔥 Đang Giảm Giá
                  <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setOnlySale(false)} />
                </span>
              )}

              {onlyBestSeller && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-500/40 text-amber-300 font-medium">
                  ⭐ Bán Chạy Nhất
                  <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setOnlyBestSeller(false)} />
                </span>
              )}

              {onlyInStock && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-950/80 border border-sky-500/40 text-sky-300 font-medium">
                  📦 Sẵn Hàng
                  <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setOnlyInStock(false)} />
                </span>
              )}

              {usefulFilter !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 font-semibold shadow-sm">
                  Tiện ích: {usefulFeaturesList.find(u => u.id === usefulFilter)?.label}
                  <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setUsefulFilter('all')} />
                </span>
              )}

              {colorFilter !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-medium">
                  Màu: {colorsList.find(c => c.id === colorFilter)?.label.split('/')[0]}
                  <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setColorFilter('all')} />
                </span>
              )}

              {minRating > 0 && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-yellow-950/80 border border-yellow-500/40 text-yellow-300 font-medium">
                  Đánh giá ≥ {minRating}★
                  <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setMinRating(0)} />
                </span>
              )}

              {minWarranty > 0 && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-medium">
                  Bảo hành ≥ {minWarranty} tháng
                  <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setMinWarranty(0)} />
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-950/80 border border-sky-500/40 text-sky-300 font-medium">
                  Từ khóa: "{searchQuery}"
                  <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSearchQuery('')} />
                </span>
              )}

              <button
                onClick={handleResetFilters}
                className="text-slate-400 hover:text-rose-400 font-medium underline ml-auto cursor-pointer"
              >
                Xóa tất cả
              </button>
            </div>
          )}

          {/* Product Output Section */}
          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="text-center py-16 px-4 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 text-slate-500 mx-auto flex items-center justify-center">
                  <Search className="w-8 h-8 text-emerald-500/50" />
                </div>
                <h3 className="text-lg font-bold text-white">Không tìm thấy sản phẩm phù hợp</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Rất tiếc, không có sản phẩm nào khớp với toàn bộ tiêu chí lọc hiện tại của bạn. Bạn hãy thử nới lỏng khoảng giá hoặc chọn danh mục khác.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors cursor-pointer shadow-lg shadow-emerald-500/20"
                  >
                    Xóa Toàn Bộ Lọc &amp; Xem Lại Tất Cả
                  </button>
                  {priceRange !== 'all' && (
                    <button
                      onClick={handleClearCustomPrice}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-medium text-xs hover:bg-slate-700 transition-colors"
                    >
                      Bỏ Lọc Khoảng Giá
                    </button>
                  )}
                </div>
              </motion.div>
            ) : viewMode === 'table' ? (
              <motion.div
                key={`table-${selectedCategory}-${sortBy}-${filteredProducts.length}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductTableView
                  products={filteredProducts}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                />
              </motion.div>
            ) : viewMode === 'list' ? (
              <motion.div 
                key={`list-${selectedCategory}-${sortBy}-${filteredProducts.length}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                {filteredProducts.map((product) => (
                  <ProductListItem
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onQuickView={onQuickView}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key={`grid-${selectedCategory}-${sortBy}-${filteredProducts.length}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3.5 sm:gap-4"
              >
                {filteredProducts.map((product) => (
                  <ProductCompactCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onQuickView={onQuickView}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
      </div>

      {/* 4. Full-Featured Mobile Filter Slide-over Drawer */}
      <AnimatePresence>
        {showMobileFilterDrawer && (
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
              onClick={() => setShowMobileFilterDrawer(false)}
            />
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-8 pointer-events-none">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 27, stiffness: 280 }}
                className="w-screen max-w-md bg-slate-900 border-l border-slate-800 flex flex-col justify-between overflow-hidden pointer-events-auto shadow-2xl"
              >
                {/* Drawer Header */}
                <div className="p-5 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/60">
                  <div className="flex items-center gap-2 font-bold text-white text-base">
                    <SlidersHorizontal className="w-5 h-5 text-emerald-400" />
                    <span>Bộ Lọc Sản Phẩm</span>
                    {activeFiltersCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-xs font-extrabold">
                        {activeFiltersCount}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setShowMobileFilterDrawer(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Scrollable Content */}
                <div className="p-5 space-y-6 overflow-y-auto flex-1 text-xs">
                  {/* Search in Drawer */}
                  <div className="space-y-1.5">
                    <label className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
                      Từ khóa tìm kiếm
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Tìm tên sản phẩm, dòng xe..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-7 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                      <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-2 top-2 text-slate-500 hover:text-white"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="space-y-2">
                    <label className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
                      Danh Mục
                    </label>
                    <div className="space-y-1">
                      {CATEGORIES.map((cat) => {
                        const count = cat.id === 'all' 
                          ? PRODUCTS.length 
                          : PRODUCTS.filter(p => p.category === cat.id).length;

                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-colors ${
                              selectedCategory === cat.id
                                ? 'bg-emerald-500 text-slate-950 font-bold'
                                : 'text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            <span className="truncate">{cat.name}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                              selectedCategory === cat.id ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price Ranges */}
                  <div className="space-y-2 pt-3 border-t border-slate-800">
                    <label className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
                      Khoảng Giá
                    </label>
                    <div className="space-y-1">
                      {priceRanges.map((pr) => (
                        <label key={pr.id} className="flex items-center justify-between text-slate-300 py-1.5 px-2 rounded-lg hover:bg-slate-800/50 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="mobile-price"
                              checked={priceRange === pr.id}
                              onChange={() => {
                                setPriceRange(pr.id);
                                setAppliedCustomPrice(null);
                              }}
                              className="accent-emerald-500"
                            />
                            <span>{pr.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* Custom Price in Drawer */}
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2 mt-2">
                      <div className="text-[11px] font-bold text-slate-400">Tự nhập khoảng giá (₫)</div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          placeholder="Từ"
                          value={customMinPrice}
                          onChange={(e) => setCustomMinPrice(e.target.value)}
                          className="w-full px-2 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500"
                        />
                        <input
                          type="number"
                          placeholder="Đến"
                          value={customMaxPrice}
                          onChange={(e) => setCustomMaxPrice(e.target.value)}
                          className="w-full px-2 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleApplyCustomPrice}
                        disabled={!customMinPrice && !customMaxPrice}
                        className="w-full py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs"
                      >
                        Áp Dụng
                      </button>
                    </div>
                  </div>

                  {/* Vehicle Types */}
                  <div className="space-y-2 pt-3 border-t border-slate-800">
                    <label className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
                      Phân Khúc Xe
                    </label>
                    <div className="space-y-1">
                      {vehicleTypesList.map((vt) => (
                        <button
                          key={vt.id}
                          type="button"
                          onClick={() => setVehicleType(vt.id)}
                          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                            vehicleType === vt.id
                              ? 'bg-purple-950 text-purple-300 border border-purple-500/40 font-bold'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <span>{vt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="space-y-2 pt-3 border-t border-slate-800">
                    <label className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
                      Ưu Đãi &amp; Tình Trạng
                    </label>
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-slate-300 py-1">
                        <input
                          type="checkbox"
                          checked={onlySale}
                          onChange={(e) => setOnlySale(e.target.checked)}
                          className="accent-rose-500 rounded"
                        />
                        <span className="text-rose-300 font-medium">🔥 Đang Giảm Giá ({filterCounts.sale})</span>
                      </label>
                      <label className="flex items-center gap-2 text-slate-300 py-1">
                        <input
                          type="checkbox"
                          checked={onlyBestSeller}
                          onChange={(e) => setOnlyBestSeller(e.target.checked)}
                          className="accent-amber-500 rounded"
                        />
                        <span className="text-amber-300 font-medium">⭐ Bán Chạy Nhất ({filterCounts.bestSeller})</span>
                      </label>
                      <label className="flex items-center gap-2 text-slate-300 py-1">
                        <input
                          type="checkbox"
                          checked={onlyInStock}
                          onChange={(e) => setOnlyInStock(e.target.checked)}
                          className="accent-sky-500 rounded"
                        />
                        <span className="text-sky-300 font-medium">📦 Sẵn Hàng ({filterCounts.inStock})</span>
                      </label>
                    </div>
                  </div>

                  {/* Useful Features (Tính năng hữu ích) */}
                  <div className="space-y-2 pt-3 border-t border-slate-800">
                    <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-emerald-400 text-[11px]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Tính Năng Hữu Ích</span>
                    </div>
                    <div className="space-y-1.5">
                      {usefulFeaturesList.map((uf) => {
                        const isActive = usefulFilter === uf.id;
                        const count = uf.id === 'all'
                          ? PRODUCTS.length
                          : PRODUCTS.filter(uf.matcher).length;
                        return (
                          <button
                            key={uf.id}
                            type="button"
                            onClick={() => setUsefulFilter(isActive && uf.id !== 'all' ? 'all' : uf.id)}
                            className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-colors border ${
                              isActive
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50 font-bold'
                                : 'bg-slate-900/60 text-slate-400 border-slate-800/80 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {uf.icon}
                              <span className="truncate">{uf.label}</span>
                            </div>
                            <span className="text-[10px] bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded font-mono ml-2">
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Drawer Footer */}
                <div className="p-4 border-t border-slate-800 flex gap-2 shrink-0 bg-slate-950">
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="w-1/3 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700 transition-colors"
                  >
                    Đặt Lại
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMobileFilterDrawer(false)}
                    className="w-2/3 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
                  >
                    Xem ({filteredProducts.length}) Sản Phẩm
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
