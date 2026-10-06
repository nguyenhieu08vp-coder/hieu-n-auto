import React, { useState, useMemo, useEffect } from 'react';
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
  Shield,
  Video,
  Eye,
  EyeOff,
  Wifi,
  Mic,
  Sun,
  Droplets,
  Wrench,
  Cpu,
  Plus
} from 'lucide-react';
import { Product, ItemClassification } from '../types';
import { PRODUCTS, CATEGORIES, CLASSIFICATIONS, FORMAT_CURRENCY } from '../data/mockData';
import { STORE_CATEGORY_GROUPS, type StoreCategoryItem } from '../data/storeCategories';
import { ProductListItem } from '../components/ProductListItem';
import { ProductCompactCard } from '../components/ProductCompactCard';
import { ProductTableView } from '../components/ProductTableView';

type ViewMode = 'grid-compact' | 'list' | 'table';

export { STORE_CATEGORY_GROUPS, type StoreCategoryItem };

interface ProductsViewProps {
  onAddToCart: (product: Product, selectedColor?: string) => void;
  onQuickView: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory?: string;
  setSelectedCategory?: (category: string) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  onAddToCart,
  onQuickView,
  searchQuery,
  setSearchQuery,
  selectedCategory: controlledCategory,
  setSelectedCategory: setControlledCategory,
}) => {
  // Filter states
  const [selectedClassification, setSelectedClassification] = useState<ItemClassification>('all');
  const [internalCategory, setInternalCategory] = useState<string>(controlledCategory || 'all');

  useEffect(() => {
    if (controlledCategory !== undefined) {
      setInternalCategory(controlledCategory);
    }
  }, [controlledCategory]);

  const selectedCategory = controlledCategory !== undefined ? controlledCategory : internalCategory;
  const setSelectedCategory = (cat: string) => {
    setInternalCategory(cat);
    setControlledCategory?.(cat);
  };
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

  // Dynamic custom created products (stored locally)
  const [customProducts, setCustomProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('hieun_custom_products');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const allProducts = useMemo(() => [...PRODUCTS, ...customProducts], [customProducts]);

  useEffect(() => {
    try {
      localStorage.setItem('hieun_custom_products', JSON.stringify(customProducts));
    } catch (e) {
      console.error(e);
    }
  }, [customProducts]);

  // Modal to create product
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('cameras-360');
  const [newProdCategoryName, setNewProdCategoryName] = useState('Camera Hành Trình');
  const [newProdType, setNewProdType] = useState<'product' | 'service'>('product');
  const [newProdPrice, setNewProdPrice] = useState('2850000');
  const [newProdOrigPrice, setNewProdOrigPrice] = useState('3400000');
  const [newProdImage, setNewProdImage] = useState('/images/camera_70mai_m500.jpg');
  const [newProdDesc, setNewProdDesc] = useState('Sản phẩm nâng cấp chính hãng cao cấp, cắm giắc Zin 100%, bảo hành uy tín tại Hieu N Auto.');
  const [newProdIsBestSeller, setNewProdIsBestSeller] = useState(false);
  const [newProdIsSale, setNewProdIsSale] = useState(true);
  const [newProdSuccessToast, setNewProdSuccessToast] = useState(false);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const parsedPrice = parseInt(newProdPrice.replace(/\D/g, ''), 10) || 2850000;
    const parsedOrigPrice = parseInt(newProdOrigPrice.replace(/\D/g, ''), 10) || Math.round(parsedPrice * 1.2);

    const newProduct: Product = {
      id: `prod-custom-${Date.now()}`,
      itemType: newProdType,
      name: newProdName.trim(),
      category: newProdCategory,
      categoryName: newProdCategoryName || 'Phụ Kiện Nâng Cấp Ô Tô',
      price: parsedPrice,
      originalPrice: parsedOrigPrice,
      isSale: newProdIsSale,
      isBestSeller: newProdIsBestSeller,
      isNew: true,
      rating: 5.0,
      reviewCount: 88,
      primaryImage: newProdImage || '/images/camera_70mai_m500.jpg',
      secondaryImage: newProdImage || '/images/camera_70mai_m500.jpg',
      description: newProdDesc.trim() || 'Sản phẩm nâng cấp chất lượng cao cắm giắc Zin 100%.',
      features: [
        'Thi công cắm giắc Zin 100% không cắt trích dây điện',
        'Vận hành ổn định, tương thích chuẩn từng dòng xe',
        'Bảo hành chính hãng uy tín tại Hieu N Auto'
      ],
      vehicleTypes: ['sedan', 'suv', 'mpv', 'luxury'],
      materials: ['Vật Liệu Cao Cấp Chuẩn Hãng'],
      colors: [{ name: 'Chuẩn Zin Theo Xe', hex: '#334155' }],
      warrantyMonths: 24,
      inStock: true,
      installationTimeHours: 1
    };

    setCustomProducts(prev => [newProduct, ...prev]);
    setIsAddModalOpen(false);
    setNewProdSuccessToast(true);
    setTimeout(() => setNewProdSuccessToast(false), 3500);

    // Reset
    setNewProdName('');
  };

  // State to hide / collapse product items in each category section
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSectionCollapse = (sectionKey: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const collapseAllSections = () => {
    const allCollapsed: Record<string, boolean> = {
      dashcam: true,
      camera360: true,
      lighting: true,
      led: true,
      audio: true,
      display: true,
      mirror: true,
      'interior-seat': true,
      'safety-utility': true,
      other: true,
    };
    setCollapsedSections(allCollapsed);
  };

  const expandAllSections = () => {
    setCollapsedSections({});
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
    setSelectedClassification('all');
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
      case 'cameras-360':
      case 'dashcams-tpms':
        return <ShieldCheck className="w-4 h-4" />;
      case 'screens-displays':
      case 'screens-cams':
        return <Tv className="w-4 h-4" />;
      case 'safety-sensors':
        return <ShieldAlert className="w-4 h-4" />;
      case 'ambient-lights':
        return <Sparkles className="w-4 h-4" />;
      case 'floor-mats':
        return <Layers className="w-4 h-4" />;
      case 'car-audio':
        return <Volume2 className="w-4 h-4" />;
      case 'seat-interior':
      case 'seat-covers':
        return <Armchair className="w-4 h-4" />;
      case 'electric-automation':
      case 'steering-accessories':
        return <Sliders className="w-4 h-4" />;
      case 'heat-soundproofing':
        return <Shield className="w-4 h-4" />;
      case 'wheels-exterior':
        return <Disc className="w-4 h-4" />;
      default:
        return <Grid2X2 className="w-4 h-4" />;
    }
  };

  const getStoreGroupIcon = (groupId: string) => {
    switch (groupId) {
      case 'dashcam':
        return <Video className="w-4 h-4 text-sky-400" />;
      case 'camera360':
        return <Eye className="w-4 h-4 text-emerald-400" />;
      case 'lighting':
        return <Sun className="w-4 h-4 text-yellow-400" />;
      case 'led':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'audio':
        return <Volume2 className="w-4 h-4 text-purple-400" />;
      case 'display':
        return <Tv className="w-4 h-4 text-cyan-400" />;
      case 'mirror':
        return <Sliders className="w-4 h-4 text-amber-400" />;
      case 'android-box':
        return <Cpu className="w-4 h-4 text-emerald-400" />;
      case 'interior-seat':
        return <Armchair className="w-4 h-4 text-indigo-400" />;
      case 'safety-utility':
        return <ShieldCheck className="w-4 h-4 text-teal-400" />;
      default:
        return <Grid2X2 className="w-4 h-4 text-emerald-400" />;
    }
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Classification filter (Sản phẩm chính hãng vs Dịch vụ độ xe chính hãng)
      if (selectedClassification !== 'all' && product.itemType !== selectedClassification) {
        return false;
      }

      // Category / Store Group filter
      if (selectedCategory !== 'all') {
        const targetGroup = STORE_CATEGORY_GROUPS.find((g) => g.id === selectedCategory);
        if (targetGroup && targetGroup.productIds.length > 0) {
          if (!targetGroup.productIds.includes(product.id)) {
            return false;
          }
        } else if (product.category !== selectedCategory) {
          return false;
        }
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
    selectedClassification,
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
    sortBy,
    allProducts
  ]);

  // Calculate dynamic counts for filters (based on current category & search, or global)
  const filterCounts = useMemo(() => {
    return {
      total: allProducts.length,
      productCount: allProducts.filter(p => p.itemType === 'product').length,
      serviceCount: allProducts.filter(p => p.itemType === 'service').length,
      sale: allProducts.filter(p => p.isSale).length,
      bestSeller: allProducts.filter(p => p.isBestSeller).length,
      inStock: allProducts.filter(p => p.inStock).length,
      sedan: allProducts.filter(p => p.vehicleTypes.includes('sedan')).length,
      suv: allProducts.filter(p => p.vehicleTypes.includes('suv')).length,
      mpv: allProducts.filter(p => p.vehicleTypes.includes('mpv')).length,
      luxury: allProducts.filter(p => p.vehicleTypes.includes('luxury')).length,
      under2m: allProducts.filter(p => p.price < 2000000).length,
      from2mTo5m: allProducts.filter(p => p.price >= 2000000 && p.price < 5000000).length,
      from5mTo15m: allProducts.filter(p => p.price >= 5000000 && p.price < 15000000).length,
      above15m: allProducts.filter(p => p.price >= 15000000).length,
      highRating: allProducts.filter(p => p.rating >= 4.8).length,
      warranty24: allProducts.filter(p => p.warrantyMonths >= 24).length,
    };
  }, [allProducts]);

  // Nhóm Camera Hành Trình & Ghi Hình Chuyên Nghiệp (loại trừ camera 360)
  const camera360ProductIds = useMemo(() => new Set(['prod-2', 'prod-38', 'prod-39']), []);
  const dashcamProducts = useMemo(() => {
    return filteredProducts.filter((p) => p.category === 'cameras-360' && !camera360ProductIds.has(p.id));
  }, [filteredProducts, camera360ProductIds]);

  // Mục Camera 360 Độ Toàn Cảnh (prod-2: Hệ thống Camera 360 độ TECHCAM System cắm giắc Zin 100%)
  // camera360ProductIds declared above
  const camera360Products = useMemo(() => {
    return filteredProducts.filter((p) => camera360ProductIds.has(p.id));
  }, [filteredProducts, camera360ProductIds]);

  // Nhóm Ánh Sáng Tăng Sáng (Bi LED Aozoom, Bi gầm TS V3 / G2 Plus, Bi Gầm WASP, Bi gầm Aozoom Eagle): prod-16, prod-23, prod-35, prod-34
  const lightingProductIds = useMemo(() => new Set(['prod-16', 'prod-23', 'prod-35', 'prod-34']), []);
  const lightingProducts = useMemo(() => {
    return filteredProducts.filter((p) => lightingProductIds.has(p.id));
  }, [filteredProducts, lightingProductIds]);

  // Specific 3 LED products: prod-3 (LED Nội Thất), prod-8 (LED Cánh Chim), prod-24 (Mạch Xi Nhan Demi LED)
  const ledProductIds = useMemo(() => new Set(['prod-3', 'prod-8', 'prod-24', 'prod-40']), []);
  const ledProducts = useMemo(() => {
    return filteredProducts.filter((p) => ledProductIds.has(p.id));
  }, [filteredProducts, ledProductIds]);

  // Nhóm Nâng Cấp Âm Thanh Ô Tô (prod-6: Sub Rebec U10, prod-37: Sub STEG SA-8W, prod-26: Loa toàn dải Rebec BL80, prod-36: Loa bầu dục)
  const audioProductIds = useMemo(() => new Set(['prod-6', 'prod-37', 'prod-26', 'prod-36']), []);
  const audioProducts = useMemo(() => {
    return filteredProducts.filter((p) => audioProductIds.has(p.id) || p.category === 'car-audio');
  }, [filteredProducts, audioProductIds]);

  // Nhóm Màn Hình Liền Khối, Màn ODO, HUD & Android Box: prod-5 (Màn đôi 20.8"), prod-10 (HUD MCD91), prod-25 (Màn ODO GBA OLED), prod-12 (Zestech DX165), prod-30 (CASKA Smart USB)
  const displayProductIds = useMemo(() => new Set(['prod-5', 'prod-10', 'prod-25', 'prod-12', 'prod-30']), []);
  const displayProducts = useMemo(() => {
    return filteredProducts.filter((p) => displayProductIds.has(p.id));
  }, [filteredProducts, displayProductIds]);

  // Nhóm Gương Gập Điện Tự Động Theo Xe: prod-15 (VF5), prod-31 (VF3), prod-32 (VF6/VF7), prod-33 (HUVI Limo Green)
  const mirrorProductIds = useMemo(() => new Set(['prod-15', 'prod-31', 'prod-32', 'prod-33']), []);
  const mirrorProducts = useMemo(() => {
    return filteredProducts.filter((p) => mirrorProductIds.has(p.id));
  }, [filteredProducts, mirrorProductIds]);

  // 8. Nhóm Nội Thất & Ghế Xe (gồm ghế chỉnh điện, áo ghế nappa, bệ tỳ tay, thảm sàn TPE):
  // prod-7 (Bệ tỳ tay), prod-13 (Áo ghế Nappa 9D), prod-18 (Độ ghế điện Limo Green), prod-14 (Thảm sàn Carsen), prod-29 (Thảm sàn HUVI)
  const interiorSeatProductIds = useMemo(() => new Set(['prod-7', 'prod-13', 'prod-18', 'prod-14', 'prod-29']), []);
  const interiorSeatProducts = useMemo(() => {
    return filteredProducts.filter((p) => interiorSeatProductIds.has(p.id));
  }, [filteredProducts, interiorSeatProductIds]);

  // 9. Nhóm Tiện Ích & An Toàn Xe (Gộp: Cảm Biến An Toàn, Cốp Điện & Bệ Bước, Bảo Vệ & Chăm Sóc Xe):
  // prod-17, prod-20, prod-11, prod-27, prod-4, prod-9, prod-19
  const safetyUtilityProductIds = useMemo(() => new Set([
    'prod-17', 'prod-20', 'prod-11', 'prod-27', 'prod-4', 'prod-9', 'prod-19'
  ]), []);
  const safetyUtilityProducts = useMemo(() => {
    return filteredProducts.filter((p) => safetyUtilityProductIds.has(p.id));
  }, [filteredProducts, safetyUtilityProductIds]);

  const otherProducts = useMemo(() => {
    const allCategorizedIds = new Set([
      'prod-1', 'prod-21', 'prod-22', 'prod-28',
      ...camera360ProductIds,
      ...lightingProductIds,
      ...ledProductIds,
      ...audioProductIds,
      ...displayProductIds,
      ...mirrorProductIds,
      ...interiorSeatProductIds,
      ...safetyUtilityProductIds
    ]);
    return filteredProducts.filter((p) => !allCategorizedIds.has(p.id));
  }, [
    filteredProducts,
    camera360ProductIds,
    lightingProductIds,
    ledProductIds,
    audioProductIds,
    displayProductIds,
    mirrorProductIds,
    interiorSeatProductIds,
    safetyUtilityProductIds
  ]);

  // Active filters count for badge indicator
  const activeFiltersCount = [
    selectedClassification !== 'all',
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
            Hiển thị <strong className="text-emerald-400 font-bold">{filteredProducts.length}</strong> / {allProducts.length} sản phẩm và gói nâng cấp tương thích hoàn hảo
          </p>
        </div>

        <button
          type="button"
          id="btn-open-create-product-modal"
          onClick={() => {
            setNewProdCategory('cameras-360');
            setNewProdCategoryName('Camera Hành Trình');
            setIsAddModalOpen(true);
          }}
          className="self-start md:self-center flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/40 hover:shadow-emerald-900/60 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Tạo Mục Sản Phẩm Mới</span>
        </button>
      </motion.div>

      {/* Main Product Content */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="w-full space-y-5"
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
                  { id: 'grid-compact', label: 'Lưới', icon: <Grid2X2 className="w-3.5 h-3.5" /> },
                  { id: 'list', label: 'Danh Sách', icon: <List className="w-3.5 h-3.5" /> },
                  { id: 'table', label: 'Bảng', icon: <TableIcon className="w-3.5 h-3.5" /> },
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

              {/* Nút Thu gọn / Mở rộng tất cả nhóm */}
              {viewMode !== 'table' && (
                <button
                  type="button"
                  onClick={() => {
                    const isAnyCollapsed = Object.values(collapsedSections).some(Boolean);
                    if (isAnyCollapsed) {
                      expandAllSections();
                    } else {
                      collapseAllSections();
                    }
                  }}
                  title={Object.values(collapsedSections).some(Boolean) ? 'Mở rộng tất cả sản phẩm' : 'Thu gọn tất cả sản phẩm'}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-700 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white hover:border-slate-500 text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  <span>{Object.values(collapsedSections).some(Boolean) ? 'Mở rộng tất cả' : 'Thu gọn tất cả'}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-white transition-transform duration-300 ${
                      Object.values(collapsedSections).some(Boolean) ? '-rotate-90' : 'rotate-0'
                    }`}
                  />
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Badges Bar */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-xs p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-slate-400 font-semibold flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
                Đang lọc ({activeFiltersCount}):
              </span>

              {selectedClassification !== 'all' && (
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium border ${
                  selectedClassification === 'service'
                    ? 'bg-purple-950/80 border-purple-500/40 text-purple-300'
                    : 'bg-sky-950/80 border-sky-500/40 text-sky-300'
                }`}>
                  {selectedClassification === 'service' ? (
                    <>
                      <Wrench className="w-3 h-3 text-purple-400" />
                      <span>Dịch Vụ Độ Xe Chính Hãng</span>
                    </>
                  ) : (
                    <>
                      <PackageCheck className="w-3 h-3 text-sky-400" />
                      <span>Sản Phẩm Chính Hãng</span>
                    </>
                  )}
                  <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSelectedClassification('all')} />
                </span>
              )}

              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-medium">
                  {CATEGORIES.find(c => c.id === selectedCategory)?.name || STORE_CATEGORY_GROUPS.find(g => g.id === selectedCategory)?.name}
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
            ) : (
              <motion.div
                key={`products-view-${viewMode}-${selectedCategory}-${sortBy}-${filteredProducts.length}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                {/* 📹 1. NHÓM CAMERA HÀNH TRÌNH & GHI HÌNH CHUYÊN NGHIỆP */}
                {dashcamProducts.length > 0 && (
                  <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-b from-sky-950/40 via-slate-900/90 to-slate-900/90 p-4 sm:p-5 shadow-xl relative overflow-hidden space-y-4">
                    <div 
                      onClick={() => toggleSectionCollapse('dashcam')}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-sky-500/20 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-sky-500/10">
                          <Video className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                              Camera Hành Trình
                            </h2>
                            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-[11px] font-extrabold">
                              {dashcamProducts.length} Sản phẩm
                            </span>
                            {collapsedSections['dashcam'] && (
                              <span className="text-[11px] text-slate-400 font-medium">
                                (Đã thu gọn)
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Camera hành trình 4K HDR, camera 3 kênh trước - trong - sau, cảnh báo giao thông Vietmap, 70mai &amp; gương điện tử thông minh azcam G1 Series
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                        <button
                          type="button"
                          id="btn-add-product-dashcam"
                          onClick={(e) => {
                            e.stopPropagation();
                            setNewProdCategory('cameras-360');
                            setNewProdCategoryName('Camera Hành Trình');
                            setNewProdImage('/images/camera_70mai_m500.jpg');
                            setIsAddModalOpen(true);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-sky-400/50 bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
                          title="Tạo thêm 1 mục sản phẩm trong danh mục này"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Tạo mục sản phẩm</span>
                        </button>

                        <button
                          type="button"
                          id="toggle-collapse-dashcam-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSectionCollapse('dashcam');
                          }}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/40 bg-slate-900/90 hover:bg-slate-800 hover:border-sky-400 text-sky-200 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
                          title={collapsedSections['dashcam'] ? 'Mở rộng sản phẩm' : 'Thu gọn sản phẩm'}
                        >
                          <span className="text-[11px] font-medium text-slate-300">
                            {collapsedSections['dashcam'] ? 'Mở rộng' : 'Thu gọn'}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-white transition-transform duration-300 ${
                              collapsedSections['dashcam'] ? '-rotate-90' : 'rotate-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {!collapsedSections['dashcam'] && (
                      viewMode === 'list' ? (
                        <div className="space-y-3.5">
                          {dashcamProducts.map((product) => (
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
                          {dashcamProducts.map((product) => (
                            <ProductCompactCard
                              key={product.id}
                              product={product}
                              onAddToCart={onAddToCart}
                              onQuickView={onQuickView}
                            />
                          ))}
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* 🌐 2. MỤC CAMERA 360 ĐỘ TOÀN CẢNH (BÊN DƯỚI MỤC CAMERA) */}
                {camera360Products.length > 0 && (
                  <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 via-slate-900/90 to-slate-900/90 p-4 sm:p-5 shadow-xl relative overflow-hidden space-y-4">
                    <div 
                      onClick={() => toggleSectionCollapse('camera360')}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-500/20 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/10">
                          <Eye className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                              Camera 360 - Hỗ Trợ Đỗ Xe
                            </h2>
                            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[11px] font-extrabold">
                              {camera360Products.length} Sản phẩm
                            </span>
                            {collapsedSections['camera360'] && (
                              <span className="text-[11px] text-slate-400 font-medium">
                                (Đã thu gọn)
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Hệ thống Camera 360 độ TECHCAM, SETCAR AI 360 &amp; Safeview cao cấp hiển thị 2D/3D siêu nét, mô phỏng xe thực tế, cắm giắc Zin 100%
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        id="toggle-collapse-camera360-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSectionCollapse('camera360');
                        }}
                        className="self-start sm:self-center flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/40 bg-slate-900/90 hover:bg-slate-800 hover:border-indigo-400 text-indigo-200 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
                        title={collapsedSections['camera360'] ? 'Mở rộng sản phẩm' : 'Thu gọn sản phẩm'}
                      >
                        <span className="text-[11px] font-medium text-slate-300">
                          {collapsedSections['camera360'] ? 'Mở rộng' : 'Thu gọn'}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-white transition-transform duration-300 ${
                            collapsedSections['camera360'] ? '-rotate-90' : 'rotate-0'
                          }`}
                        />
                      </button>
                    </div>

                    {!collapsedSections['camera360'] && (
                      viewMode === 'list' ? (
                        <div className="space-y-3.5">
                          {camera360Products.map((product) => (
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
                          {camera360Products.map((product) => (
                            <ProductCompactCard
                              key={product.id}
                              product={product}
                              onAddToCart={onAddToCart}
                              onQuickView={onQuickView}
                            />
                          ))}
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* 🔆 3. MỤC ÁNH SÁNG (BI LED, BI GẦM TĂNG SÁNG) - BÊN DƯỚI CAMERA VÀ TÁCH RIÊNG VỚI ĐÈN LED */}
                {lightingProducts.length > 0 && (
                  <div className="rounded-2xl border border-yellow-500/30 bg-gradient-to-b from-yellow-950/40 via-slate-900/90 to-slate-900/90 p-4 sm:p-5 shadow-xl relative overflow-hidden space-y-4">
                    <div 
                      onClick={() => toggleSectionCollapse('lighting')}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-yellow-500/20 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-yellow-500/20 border border-yellow-400/40 text-yellow-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-500/10">
                          <Sun className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                              Cá Nhân Hóa Ánh Sáng
                            </h2>
                            <span className="px-2.5 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-400/30 text-yellow-300 text-[11px] font-extrabold">
                              {lightingProducts.length} Sản phẩm
                            </span>
                            {collapsedSections['lighting'] && (
                              <span className="text-[11px] text-slate-400 font-medium">
                                (Đã thu gọn)
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Bi Gầm Aozoom LED WASP 3.0 Inch, Bi LED Extra Sapphire 98W, Đèn LED A50 &amp; Đèn trợ sáng TS V3 Pro
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        id="toggle-collapse-lighting-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSectionCollapse('lighting');
                        }}
                        className="self-start sm:self-center flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/40 bg-slate-900/90 hover:bg-slate-800 hover:border-yellow-400 text-yellow-200 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
                        title={collapsedSections['lighting'] ? 'Mở rộng sản phẩm' : 'Thu gọn sản phẩm'}
                      >
                        <span className="text-[11px] font-medium text-slate-300">
                          {collapsedSections['lighting'] ? 'Mở rộng' : 'Thu gọn'}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-white transition-transform duration-300 ${
                            collapsedSections['lighting'] ? '-rotate-90' : 'rotate-0'
                          }`}
                        />
                      </button>
                    </div>

                    {!collapsedSections['lighting'] && (
                      viewMode === 'list' ? (
                        <div className="space-y-3.5">
                          {lightingProducts.map((product) => (
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
                          {lightingProducts.map((product) => (
                            <ProductCompactCard
                              key={product.id}
                              product={product}
                              onAddToCart={onAddToCart}
                              onQuickView={onQuickView}
                            />
                          ))}
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* 💡 4. NHÓM ĐÈN LED (TÁCH RIÊNG VỚI MỤC ÁNH SÁNG) */}
                {ledProducts.length > 0 && (
                  <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/40 via-slate-900/90 to-slate-900/90 p-4 sm:p-5 shadow-xl relative overflow-hidden space-y-4">
                    <div 
                      onClick={() => toggleSectionCollapse('led')}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-500/20 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/10">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                              Đèn LED (Nội &amp; Ngoại Thất)
                            </h2>
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] font-extrabold">
                              {ledProducts.length} Sản phẩm
                            </span>
                            {collapsedSections['led'] && (
                              <span className="text-[11px] text-slate-400 font-medium">
                                (Đã thu gọn)
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            LED nội thất RGB 64 màu, LED cánh chim ma trận, mạch xi nhan demi &amp; LED cản sau Audi DMX Limo Green
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        id="toggle-collapse-led-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSectionCollapse('led');
                        }}
                        className="self-start sm:self-center flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/40 bg-slate-900/90 hover:bg-slate-800 hover:border-amber-400 text-amber-200 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
                        title={collapsedSections['led'] ? 'Mở rộng sản phẩm' : 'Thu gọn sản phẩm'}
                      >
                        <span className="text-[11px] font-medium text-slate-300">
                          {collapsedSections['led'] ? 'Mở rộng' : 'Thu gọn'}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-white transition-transform duration-300 ${
                            collapsedSections['led'] ? '-rotate-90' : 'rotate-0'
                          }`}
                        />
                      </button>
                    </div>

                    {!collapsedSections['led'] && (
                      viewMode === 'list' ? (
                        <div className="space-y-3.5">
                          {ledProducts.map((product) => (
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
                          {ledProducts.map((product) => (
                            <ProductCompactCard
                              key={product.id}
                              product={product}
                              onAddToCart={onAddToCart}
                              onQuickView={onQuickView}
                            />
                          ))}
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* 🔊 5. NHÓM NÂNG CẤP ÂM THANH Ô TÔ & LOA SUB ĐIỆN (BÊN DƯỚI CÁC SẢN PHẨM ÁNH SÁNG) */}
                {audioProducts.length > 0 && (
                  <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-b from-purple-950/40 via-slate-900/90 to-slate-900/90 p-4 sm:p-5 shadow-xl relative overflow-hidden space-y-4">
                    <div 
                      onClick={() => toggleSectionCollapse('audio')}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-purple-500/20 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 text-purple-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/10">
                          <Volume2 className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                              Cá Nhân Hóa Âm Thanh
                            </h2>
                            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-[11px] font-extrabold">
                              {audioProducts.length} Sản phẩm
                            </span>
                            {collapsedSections['audio'] && (
                              <span className="text-[11px] text-slate-400 font-medium">
                                (Đã thu gọn)
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Loa Sub gầm ghế Rebec U10, Loa Sub STEG SA-8W (Italy), Cặp loa toàn dải BL80 &amp; Loa bầu dục PERTORS QP-4603
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        id="toggle-collapse-audio-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSectionCollapse('audio');
                        }}
                        className="self-start sm:self-center flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/40 bg-slate-900/90 hover:bg-slate-800 hover:border-purple-400 text-purple-200 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
                        title={collapsedSections['audio'] ? 'Mở rộng sản phẩm' : 'Thu gọn sản phẩm'}
                      >
                        <span className="text-[11px] font-medium text-slate-300">
                          {collapsedSections['audio'] ? 'Mở rộng' : 'Thu gọn'}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-white transition-transform duration-300 ${
                            collapsedSections['audio'] ? '-rotate-90' : 'rotate-0'
                          }`}
                        />
                      </button>
                    </div>

                    {!collapsedSections['audio'] && (
                      viewMode === 'list' ? (
                        <div className="space-y-3.5">
                          {audioProducts.map((product) => (
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
                          {audioProducts.map((product) => (
                            <ProductCompactCard
                              key={product.id}
                              product={product}
                              onAddToCart={onAddToCart}
                              onQuickView={onQuickView}
                            />
                          ))}
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* 🖥️ 6. NHÓM MÀN HÌNH LIỀN KHỐI, MÀN ODO & ANDROID BOX */}
                {displayProducts.length > 0 && (
                  <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-cyan-950/40 via-slate-900/90 to-slate-900/90 p-4 sm:p-5 shadow-xl relative overflow-hidden space-y-4">
                    <div 
                      onClick={() => toggleSectionCollapse('display')}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cyan-500/20 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/10">
                          <Tv className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                              Màn Hình &amp; Android Box
                            </h2>
                            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-[11px] font-extrabold">
                              {displayProducts.length} Sản phẩm
                            </span>
                            {collapsedSections['display'] && (
                              <span className="text-[11px] text-slate-400 font-medium">
                                (Đã thu gọn)
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Màn hình đôi 20.8" liền khối ODO &amp; Android, HUD kính lái MCD91, Màn ODO OLED &amp; Android Box Zestech DX165 / CASKA cắm cổng USB zin siêu mượt
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        id="toggle-collapse-display-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSectionCollapse('display');
                        }}
                        className="self-start sm:self-center flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/40 bg-slate-900/90 hover:bg-slate-800 hover:border-cyan-400 text-cyan-200 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
                        title={collapsedSections['display'] ? 'Mở rộng sản phẩm' : 'Thu gọn sản phẩm'}
                      >
                        <span className="text-[11px] font-medium text-slate-300">
                          {collapsedSections['display'] ? 'Mở rộng' : 'Thu gọn'}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-white transition-transform duration-300 ${
                            collapsedSections['display'] ? '-rotate-90' : 'rotate-0'
                          }`}
                        />
                      </button>
                    </div>

                    {!collapsedSections['display'] && (
                      viewMode === 'list' ? (
                        <div className="space-y-3.5">
                          {displayProducts.map((product) => (
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
                          {displayProducts.map((product) => (
                            <ProductCompactCard
                              key={product.id}
                              product={product}
                              onAddToCart={onAddToCart}
                              onQuickView={onQuickView}
                            />
                          ))}
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* 🪞 7. NHÓM GƯƠNG GẬP ĐIỆN TỰ ĐỘNG THEO XE */}
                {mirrorProducts.length > 0 && (
                  <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/30 via-slate-900/90 to-slate-900/90 p-4 sm:p-5 shadow-xl relative overflow-hidden space-y-4">
                    <div 
                      onClick={() => toggleSectionCollapse('mirror')}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-500/20 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/10">
                          <Sliders className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                              Gập Gương
                            </h2>
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] font-extrabold">
                              {mirrorProducts.length} Sản phẩm
                            </span>
                            {collapsedSections['mirror'] && (
                              <span className="text-[11px] text-slate-400 font-medium">
                                (Đã thu gọn)
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Mô tơ gập gương tự động theo chìa khóa Smartkey và công tắc trong cabin cho VinFast VF5, VF6 &amp; Limo Green (Bản Tiêu Chuẩn / Bản LED Xi Nhan)
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        id="toggle-collapse-mirror-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSectionCollapse('mirror');
                        }}
                        className="self-start sm:self-center flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/40 bg-slate-900/90 hover:bg-slate-800 hover:border-amber-400 text-amber-200 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
                        title={collapsedSections['mirror'] ? 'Mở rộng sản phẩm' : 'Thu gọn sản phẩm'}
                      >
                        <span className="text-[11px] font-medium text-slate-300">
                          {collapsedSections['mirror'] ? 'Mở rộng' : 'Thu gọn'}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-white transition-transform duration-300 ${
                            collapsedSections['mirror'] ? '-rotate-90' : 'rotate-0'
                          }`}
                        />
                      </button>
                    </div>

                    {!collapsedSections['mirror'] && (
                      viewMode === 'list' ? (
                        <div className="space-y-3.5">
                          {mirrorProducts.map((product) => (
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
                          {mirrorProducts.map((product) => (
                            <ProductCompactCard
                              key={product.id}
                              product={product}
                              onAddToCart={onAddToCart}
                              onQuickView={onQuickView}
                            />
                          ))}
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* 💺 8. NỘI THẤT & GHẾ XE */}
                {interiorSeatProducts.length > 0 && (
                  <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 via-slate-900/90 to-slate-900/90 p-4 sm:p-5 shadow-xl relative overflow-hidden space-y-4">
                    <div 
                      onClick={() => toggleSectionCollapse('interior-seat')}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-500/20 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/10">
                          <Armchair className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                              Nội Thất &amp; Ghế Xe
                            </h2>
                            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[11px] font-extrabold">
                              {interiorSeatProducts.length} Sản phẩm
                            </span>
                            {collapsedSections['interior-seat'] && (
                              <span className="text-[11px] text-slate-400 font-medium">
                                (Đã thu gọn)
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Độ ghế chỉnh điện UNISEAT / Limo Green, Áo ghế da Nappa 9D, Thảm sàn TPE CARSEN / HUVI &amp; Bệ tỳ tay trung tâm
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        id="toggle-collapse-interior-seat-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSectionCollapse('interior-seat');
                        }}
                        className="self-start sm:self-center flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/40 bg-slate-900/90 hover:bg-slate-800 hover:border-indigo-400 text-indigo-200 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
                        title={collapsedSections['interior-seat'] ? 'Mở rộng sản phẩm' : 'Thu gọn sản phẩm'}
                      >
                        <span className="text-[11px] font-medium text-slate-300">
                          {collapsedSections['interior-seat'] ? 'Mở rộng' : 'Thu gọn'}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-white transition-transform duration-300 ${
                            collapsedSections['interior-seat'] ? '-rotate-90' : 'rotate-0'
                          }`}
                        />
                      </button>
                    </div>

                    {!collapsedSections['interior-seat'] && (
                      viewMode === 'list' ? (
                        <div className="space-y-3.5">
                          {interiorSeatProducts.map((product) => (
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
                          {interiorSeatProducts.map((product) => (
                            <ProductCompactCard
                              key={product.id}
                              product={product}
                              onAddToCart={onAddToCart}
                              onQuickView={onQuickView}
                            />
                          ))}
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* 🛡️ 9. TIỆN ÍCH & AN TOÀN XE */}
                {safetyUtilityProducts.length > 0 && (
                  <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-b from-teal-950/40 via-slate-900/90 to-slate-900/90 p-4 sm:p-5 shadow-xl relative overflow-hidden space-y-4">
                    <div 
                      onClick={() => toggleSectionCollapse('safety-utility')}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-teal-500/20 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/40 text-teal-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/10">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                              Tiện Ích &amp; An Toàn Xe
                            </h2>
                            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-[11px] font-extrabold">
                              {safetyUtilityProducts.length} Sản phẩm
                            </span>
                            {collapsedSections['safety-utility'] && (
                              <span className="text-[11px] text-slate-400 font-medium">
                                (Đã thu gọn)
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Cảm biến áp suất lốp &amp; đỗ xe ICAR, Cốp điện tự động VF3, Bệ bước chân điện thò thụt, Phim cách nhiệt 3M Crystalline, Giáp gầm bảo vệ pin &amp; Phay lazang CNC
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        id="toggle-collapse-safety-utility-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSectionCollapse('safety-utility');
                        }}
                        className="self-start sm:self-center flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/40 bg-slate-900/90 hover:bg-slate-800 hover:border-teal-400 text-teal-200 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
                        title={collapsedSections['safety-utility'] ? 'Mở rộng sản phẩm' : 'Thu gọn sản phẩm'}
                      >
                        <span className="text-[11px] font-medium text-slate-300">
                          {collapsedSections['safety-utility'] ? 'Mở rộng' : 'Thu gọn'}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-white transition-transform duration-300 ${
                            collapsedSections['safety-utility'] ? '-rotate-90' : 'rotate-0'
                          }`}
                        />
                      </button>
                    </div>

                    {!collapsedSections['safety-utility'] && (
                      viewMode === 'list' ? (
                        <div className="space-y-3.5">
                          {safetyUtilityProducts.map((product) => (
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
                          {safetyUtilityProducts.map((product) => (
                            <ProductCompactCard
                              key={product.id}
                              product={product}
                              onAddToCart={onAddToCart}
                              onQuickView={onQuickView}
                            />
                          ))}
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* 🚗 CÁC SẢN PHẨM KHÁC (DỰ PHÒNG KHI CÓ SẢN PHẨM MỚI CHƯA PHÂN LOẠI) */}
                {otherProducts.length > 0 && (
                  <div className="rounded-2xl border border-slate-700/40 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900/90 p-4 sm:p-5 shadow-xl relative overflow-hidden space-y-4">
                    <div 
                      onClick={() => toggleSectionCollapse('other')}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/40 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 flex items-center justify-center flex-shrink-0">
                          <PackageCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm sm:text-base font-extrabold text-white">
                              Các Sản Phẩm &amp; Dịch Vụ Khác
                            </h3>
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                              {otherProducts.length} Mục
                            </span>
                            {collapsedSections['other'] && (
                              <span className="text-[11px] text-slate-400 font-medium">
                                (Đã thu gọn)
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Các phụ kiện và dịch vụ nâng cấp xe bổ sung
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        id="toggle-collapse-other-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSectionCollapse('other');
                        }}
                        className="self-start sm:self-center flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700 bg-slate-850 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
                        title={collapsedSections['other'] ? 'Mở rộng sản phẩm' : 'Thu gọn sản phẩm'}
                      >
                        <span className="text-[11px] font-medium text-slate-300">
                          {collapsedSections['other'] ? 'Mở rộng' : 'Thu gọn'}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-white transition-transform duration-300 ${
                            collapsedSections['other'] ? '-rotate-90' : 'rotate-0'
                          }`}
                        />
                      </button>
                    </div>

                    {!collapsedSections['other'] && (
                      viewMode === 'list' ? (
                        <div className="space-y-3.5">
                          {otherProducts.map((product) => (
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
                          {otherProducts.map((product) => (
                            <ProductCompactCard
                              key={product.id}
                              product={product}
                              onAddToCart={onAddToCart}
                              onQuickView={onQuickView}
                            />
                          ))}
                        </div>
                      )
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>

        {/* Modal Tạo Mục Sản Phẩm Mới */}
        <AnimatePresence>
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-xl my-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-7 space-y-5"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                      <Plus className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-white">Tạo Mục Sản Phẩm Mới</h3>
                      <p className="text-xs text-slate-400">Thêm sản phẩm / phụ kiện mới vào hệ thống Hieu N Auto</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleCreateProduct} className="space-y-4">
                  {/* Tên sản phẩm */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Tên mục sản phẩm <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Camera Hành Trình 70mai M500 2.7K HDR..."
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Danh mục & Phân loại */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Chuyên mục hiển thị
                      </label>
                      <select
                        value={newProdCategory}
                        onChange={(e) => {
                          const val = e.target.value;
                          setNewProdCategory(val);
                          const matched = STORE_CATEGORY_GROUPS.find(g => g.id === val);
                          setNewProdCategoryName(matched ? matched.name : 'Phụ Kiện Nâng Cấp');
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        <option value="cameras-360">📹 Camera Hành Trình</option>
                        <option value="cameras-360">🌐 Camera 360 Độ Toàn Cảnh</option>
                        <option value="ambient-lights">🔆 Bi LED &amp; Bi Gầm Tăng Sáng</option>
                        <option value="ambient-lights">💡 Đèn LED Đa Sắc &amp; Nội Thất</option>
                        <option value="car-audio">🔊 Âm Thanh &amp; Sub Điện Ô Tô</option>
                        <option value="screens-displays">🖥️ Màn Hình &amp; Android Box</option>
                        <option value="electric-automation">🪞 Gương Gập Điện Theo Xe</option>
                        <option value="seat-interior">💺 Ghế Da &amp; Nội Thất Xe</option>
                        <option value="safety-sensors">🛡️ Tiện Ích &amp; An Toàn Xe</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Hình thức cung cấp
                      </label>
                      <select
                        value={newProdType}
                        onChange={(e) => setNewProdType(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        <option value="product">📦 Sản phẩm chính hãng</option>
                        <option value="service">🛠️ Gói dịch vụ thi công trọn gói</option>
                      </select>
                    </div>
                  </div>

                  {/* Giá bán & Giá gốc */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Giá bán (VNĐ) <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="2.850.000"
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-amber-400 font-bold focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Giá niêm yết cũ (VNĐ)
                      </label>
                      <input
                        type="text"
                        placeholder="3.400.000"
                        value={newProdOrigPrice}
                        onChange={(e) => setNewProdOrigPrice(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-400 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Ảnh sản phẩm */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Ảnh đại diện sản phẩm
                    </label>
                    <input
                      type="text"
                      placeholder="/images/camera_70mai_m500.jpg"
                      value={newProdImage}
                      onChange={(e) => setNewProdImage(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 mb-2"
                    />

                    {/* Quick Pick Samples */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                      <span className="font-semibold text-slate-300">Chọn nhanh ảnh:</span>
                      <button
                        type="button"
                        onClick={() => setNewProdImage('/src/assets/images/regenerated_image_1791301200808.webp')}
                        className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 font-semibold cursor-pointer"
                      >
                        azcam G1 MAX
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewProdImage('/images/camera_70mai_m500.jpg')}
                        className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-sky-300 cursor-pointer"
                      >
                        70mai M500
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewProdImage('/images/camera_vietmap_s720.jpg')}
                        className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-sky-300 cursor-pointer"
                      >
                        Vietmap S720
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewProdImage('/images/aozoom_extra_sapphire.webp')}
                        className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-yellow-300 cursor-pointer"
                      >
                        Aozoom Sapphire
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewProdImage('/images/rebec_sub_vf3_kit.jpg')}
                        className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 cursor-pointer"
                      >
                        Loa Sub Rebec
                      </button>
                    </div>
                  </div>

                  {/* Tùy chọn nhãn nổi bật */}
                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={newProdIsBestSeller}
                        onChange={(e) => setNewProdIsBestSeller(e.target.checked)}
                        className="rounded border-slate-700 text-amber-500 focus:ring-amber-500 w-4 h-4 bg-slate-950"
                      />
                      <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        Gắn nhãn Bán chạy
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={newProdIsSale}
                        onChange={(e) => setNewProdIsSale(e.target.checked)}
                        className="rounded border-slate-700 text-rose-500 focus:ring-rose-500 w-4 h-4 bg-slate-950"
                      />
                      <span className="text-xs font-semibold text-rose-400">
                        Ưu đãi giảm giá (%)
                      </span>
                    </label>
                  </div>

                  {/* Mô tả */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Mô tả tóm tắt
                    </label>
                    <textarea
                      rows={2}
                      value={newProdDesc}
                      onChange={(e) => setNewProdDesc(e.target.value)}
                      placeholder="Mô tả công năng và ưu điểm nổi bật của sản phẩm..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <span>Lưu &amp; Tạo Sản Phẩm</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Toast thông báo tạo thành công */}
        <AnimatePresence>
          {newProdSuccessToast && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-emerald-950 border border-emerald-500/50 text-white shadow-2xl backdrop-blur-md"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-emerald-300">Tạo Mục Sản Phẩm Thành Công!</div>
                <div className="text-[11px] text-slate-300">Mục sản phẩm mới đã được đưa vào danh sách hiển thị.</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
};
